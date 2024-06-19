function reScanSlashToken(): SyntaxKind {
  if (token === SyntaxKind.SlashToken || token === SyntaxKind.SlashEqualsToken) {
      // Quickly get to the end of regex such that we know the flags
      let p = tokenStart + 1;
      let inEscape = false;
      // Although nested character classes are allowed in Unicode Sets mode,
      // an unescaped slash is nevertheless invalid even in a character class in Unicode mode.
      // Additionally, parsing nested character classes will misinterpret regexes like `/[[]/`
      // as unterminated, consuming characters beyond the slash. (This even applies to `/[[]/v`,
      // which should be parsed as a well-terminated regex with an incomplete character class.)
      // Thus we must not handle nested character classes in the first pass.
      let inCharacterClass = false;
      while (true) {
          // If we reach the end of a file, or hit a newline, then this is an unterminated
          // regex.  Report error and return what we have so far.
          if (p >= end) {
              tokenFlags |= TokenFlags.Unterminated;
              error(Diagnostics.Unterminated_regular_expression_literal);
              break;
          }

          const ch = text.charCodeAt(p);
          if (isLineBreak(ch)) {
              tokenFlags |= TokenFlags.Unterminated;
              error(Diagnostics.Unterminated_regular_expression_literal);
              break;
          }

          if (inEscape) {
              // Parsing an escape character;
              // reset the flag and just advance to the next char.
              inEscape = false;
          }
          else if (ch === CharacterCodes.slash && !inCharacterClass) {
              // A slash within a character class is permissible,
              // but in general it signals the end of the regexp literal.
              p++;
              break;
          }
          else if (ch === CharacterCodes.openBracket) {
              inCharacterClass = true;
          }
          else if (ch === CharacterCodes.backslash) {
              inEscape = true;
          }
          else if (ch === CharacterCodes.closeBracket) {
              inCharacterClass = false;
          }
          p++;
      }
      const isUnterminated = !!(tokenFlags & TokenFlags.Unterminated);
      const endOfBody = p - (isUnterminated ? 0 : 1);
      let regExpFlags = RegularExpressionFlags.None;
      while (p < end) {
          const ch = text.charCodeAt(p);
          if (!isIdentifierPart(ch, languageVersion)) {
              break;
          }
          const flag = characterToRegularExpressionFlag(String.fromCharCode(ch));
          if (flag === undefined) {
              error(Diagnostics.Unknown_regular_expression_flag, p, 1);
          }
          else if (regExpFlags & flag) {
              error(Diagnostics.Duplicate_regular_expression_flag, p, 1);
          }
          else if (((regExpFlags | flag) & RegularExpressionFlags.UnicodeMode) === RegularExpressionFlags.UnicodeMode) {
              error(Diagnostics.The_Unicode_u_flag_and_the_Unicode_Sets_v_flag_cannot_be_set_simultaneously, p, 1);
          }
          else {
              regExpFlags |= flag;
              const availableFrom = regExpFlagToFirstAvailableLanguageVersion.get(flag)!;
              if (languageVersion < availableFrom) {
                  error(Diagnostics.This_regular_expression_flag_is_only_available_when_targeting_0_or_later, p, 1, getNameOfScriptTarget(availableFrom));
              }
          }
          p++;
      }
      pos = tokenStart + 1;
      const saveTokenPos = tokenStart;
      const saveTokenFlags = tokenFlags;
      scanRegularExpressionWorker(text, endOfBody, regExpFlags, isUnterminated);
      if (!isUnterminated) {
          pos = p;
      }
      tokenStart = saveTokenPos;
      tokenFlags = saveTokenFlags;
      tokenValue = text.substring(tokenStart, pos);
      token = SyntaxKind.RegularExpressionLiteral;
  }
  return token;

  function scanRegularExpressionWorker(text: string, end: number, regExpFlags: RegularExpressionFlags, isUnterminated: boolean) {
      /** Grammar parameter */
      const unicodeMode = !!(regExpFlags & RegularExpressionFlags.UnicodeMode);
      /** Grammar parameter */
      const unicodeSetsMode = !!(regExpFlags & RegularExpressionFlags.UnicodeSets);
      /** @see {scanClassSetExpression} */
      let mayContainStrings = false;

      /** The number of numeric (anonymous) capturing groups defined in the regex. */
      let numberOfCapturingGroups = 0;
      /** All named capturing groups defined in the regex. */
      const groupSpecifiers = new Set<string>();
      /** All references to named capturing groups in the regex. */
      const groupNameReferences: (TextRange & { name: string; })[] = [];
      /** All numeric backreferences within the regex. */
      const decimalEscapes: (TextRange & { value: number; })[] = [];
      /** A stack of scopes for named capturing groups. @see {scanGroupName} */
      const namedCapturingGroups: Set<string>[] = [];

      // Disjunction ::= Alternative ('|' Alternative)*
      function scanDisjunction(isInGroup: boolean) {
          while (true) {
              namedCapturingGroups.push(new Set());
              scanAlternative(isInGroup);
              namedCapturingGroups.pop();
              if (text.charCodeAt(pos) !== CharacterCodes.bar) {
                  return;
              }
              pos++;
          }
      }
      
      function scanClassSetExpression() {
          Debug.assertEqual(text.charCodeAt(pos - 1), CharacterCodes.openBracket);
          let isCharacterComplement = false;
          if (text.charCodeAt(pos) === CharacterCodes.caret) {
              pos++;
              isCharacterComplement = true;
          }
          let expressionMayContainStrings = false;
          let ch = text.charCodeAt(pos);
          if (isClassContentExit(ch)) {
              return;
          }
          let start = pos;
          let oprand!: string;
          switch (text.slice(pos, pos + 2)) {
              case "--":
              case "&&":
                  error(Diagnostics.Expected_a_class_set_oprand);
                  mayContainStrings = false;
                  break;
              default:
                  oprand = scanClassSetOprand();
                  break;
          }
          switch (text.charCodeAt(pos)) {
              case CharacterCodes.minus:
                  if (text.charCodeAt(pos + 1) === CharacterCodes.minus) {
                      if (isCharacterComplement && mayContainStrings) {
                          error(Diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, start, pos - start);
                      }
                      expressionMayContainStrings = mayContainStrings;
                      scanClassSetSubExpression(ClassSetExpressionType.ClassSubtraction);
                      mayContainStrings = !isCharacterComplement && expressionMayContainStrings;
                      return;
                  }
                  break;
              case CharacterCodes.ampersand:
                  if (text.charCodeAt(pos + 1) === CharacterCodes.ampersand) {
                      scanClassSetSubExpression(ClassSetExpressionType.ClassIntersection);
                      if (isCharacterComplement && mayContainStrings) {
                          error(Diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, start, pos - start);
                      }
                      expressionMayContainStrings = mayContainStrings;
                      mayContainStrings = !isCharacterComplement && expressionMayContainStrings;
                      return;
                  }
                  else {
                      error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, pos, 1, String.fromCharCode(ch));
                  }
                  break;
              default:
                  if (isCharacterComplement && mayContainStrings) {
                      error(Diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, start, pos - start);
                  }
                  expressionMayContainStrings = mayContainStrings;
                  break;
          }
          while (pos < end) {
              ch = text.charCodeAt(pos);
              switch (ch) {
                  case CharacterCodes.minus:
                      pos++;
                      ch = text.charCodeAt(pos);
                      if (isClassContentExit(ch)) {
                          mayContainStrings = !isCharacterComplement && expressionMayContainStrings;
                          return;
                      }
                      if (ch === CharacterCodes.minus) {
                          pos++;
                          error(Diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, pos - 2, 2);
                          start = pos - 2;
                          oprand = text.slice(start, pos);
                          continue;
                      }
                      else {
                          if (!oprand) {
                              error(Diagnostics.A_character_class_range_must_not_be_bounded_by_another_character_class, start, pos - 1 - start);
                          }
                          const secondStart = pos;
                          const secondOprand = scanClassSetOprand();
                          if (isCharacterComplement && mayContainStrings) {
                              error(Diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, secondStart, pos - secondStart);
                          }
                          expressionMayContainStrings ||= mayContainStrings;
                          if (!secondOprand) {
                              error(Diagnostics.A_character_class_range_must_not_be_bounded_by_another_character_class, secondStart, pos - secondStart);
                              break;
                          }
                          if (!oprand) {
                              break;
                          }
                          const minCharacterValue = codePointAt(oprand, 0);
                          const maxCharacterValue = codePointAt(secondOprand, 0);
                          if (
                              oprand.length === charSize(minCharacterValue) &&
                              secondOprand.length === charSize(maxCharacterValue) &&
                              minCharacterValue > maxCharacterValue
                          ) {
                              error(Diagnostics.Range_out_of_order_in_character_class, start, pos - start);
                          }
                      }
                      break;
                  case CharacterCodes.ampersand:
                      start = pos;
                      pos++;
                      if (text.charCodeAt(pos) === CharacterCodes.ampersand) {
                          pos++;
                          error(Diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, pos - 2, 2);
                          if (text.charCodeAt(pos) === CharacterCodes.ampersand) {
                              error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, pos, 1, String.fromCharCode(ch));
                              pos++;
                          }
                      }
                      else {
                          error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, pos - 1, 1, String.fromCharCode(ch));
                      }
                      oprand = text.slice(start, pos);
                      continue;
              }
              if (isClassContentExit(text.charCodeAt(pos))) {
                  break;
              }
              start = pos;
              switch (text.slice(pos, pos + 2)) {
                  case "--":
                  case "&&":
                      error(Diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, pos, 2);
                      pos += 2;
                      oprand = text.slice(start, pos);
                      break;
                  default:
                      oprand = scanClassSetOprand();
                      break;
              }
          }
          mayContainStrings = !isCharacterComplement && expressionMayContainStrings;
      }

      function scanClassSetSubExpression(expressionType: ClassSetExpressionType) {
          let expressionMayContainStrings = mayContainStrings;
          while (pos < end) {
              let ch = text.charCodeAt(pos);
              if (isClassContentExit(ch)) {
                  break;
              }
              // Provide user-friendly diagnostic messages
              switch (ch) {
                  case CharacterCodes.minus:
                      pos++;
                      if (text.charCodeAt(pos) === CharacterCodes.minus) {
                          pos++;
                          if (expressionType !== ClassSetExpressionType.ClassSubtraction) {
                              error(Diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, pos - 2, 2);
                          }
                      }
                      else {
                          error(Diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, pos - 1, 1);
                      }
                      break;
                  case CharacterCodes.ampersand:
                      pos++;
                      if (text.charCodeAt(pos) === CharacterCodes.ampersand) {
                          pos++;
                          if (expressionType !== ClassSetExpressionType.ClassIntersection) {
                              error(Diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, pos - 2, 2);
                          }
                          if (text.charCodeAt(pos) === CharacterCodes.ampersand) {
                              error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, pos, 1, String.fromCharCode(ch));
                              pos++;
                          }
                      }
                      else {
                          error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, pos - 1, 1, String.fromCharCode(ch));
                      }
                      break;
                  default:
                      switch (expressionType) {
                          case ClassSetExpressionType.ClassSubtraction:
                              error(Diagnostics._0_expected, pos, 0, "--");
                              break;
                          case ClassSetExpressionType.ClassIntersection:
                              error(Diagnostics._0_expected, pos, 0, "&&");
                              break;
                          default:
                              break;
                      }
                      break;
              }
              ch = text.charCodeAt(pos);
              if (isClassContentExit(ch)) {
                  error(Diagnostics.Expected_a_class_set_oprand);
                  break;
              }
              scanClassSetOprand();
              // Used only if expressionType is Intersection
              expressionMayContainStrings &&= mayContainStrings;
          }
          mayContainStrings = expressionMayContainStrings;
      }

      function scanClassSetOprand(): string {
          mayContainStrings = false;
          switch (text.charCodeAt(pos)) {
              case CharacterCodes.openBracket:
                  pos++;
                  scanClassSetExpression();
                  scanExpectedChar(CharacterCodes.closeBracket);
                  return "";
              case CharacterCodes.backslash:
                  pos++;
                  if (scanCharacterClassEscape()) {
                      return "";
                  }
                  else if (text.charCodeAt(pos) === CharacterCodes.q) {
                      pos++;
                      if (text.charCodeAt(pos) === CharacterCodes.openBrace) {
                          pos++;
                          scanClassStringDisjunctionContents();
                          scanExpectedChar(CharacterCodes.closeBrace);
                          return "";
                      }
                      else {
                          error(Diagnostics.q_must_be_followed_by_string_alternatives_enclosed_in_braces, pos - 2, 2);
                          return "q";
                      }
                  }
                  pos--;
              // falls through
              default:
                  return scanClassSetCharacter();
          }
      }

      // ClassStringDisjunctionContents ::= ClassSetCharacter* ('|' ClassSetCharacter*)*
      function scanClassStringDisjunctionContents() {
          Debug.assertEqual(text.charCodeAt(pos - 1), CharacterCodes.openBrace);
          let characterCount = 0;
          while (pos < end) {
              const ch = text.charCodeAt(pos);
              switch (ch) {
                  case CharacterCodes.closeBrace:
                      if (characterCount !== 1) {
                          mayContainStrings = true;
                      }
                      return;
                  case CharacterCodes.bar:
                      if (characterCount !== 1) {
                          mayContainStrings = true;
                      }
                      pos++;
                      start = pos;
                      characterCount = 0;
                      break;
                  default:
                      scanClassSetCharacter();
                      characterCount++;
                      break;
              }
          }
      }
      function scanClassSetCharacter(): string {
          const ch = text.charCodeAt(pos);
          if (ch === CharacterCodes.backslash) {
              pos++;
              const ch = text.charCodeAt(pos);
              switch (ch) {
                  case CharacterCodes.b:
                      pos++;
                      return "\b";
                  case CharacterCodes.ampersand:
                  case CharacterCodes.minus:
                  case CharacterCodes.exclamation:
                  case CharacterCodes.hash:
                  case CharacterCodes.percent:
                  case CharacterCodes.comma:
                  case CharacterCodes.colon:
                  case CharacterCodes.semicolon:
                  case CharacterCodes.lessThan:
                  case CharacterCodes.equals:
                  case CharacterCodes.greaterThan:
                  case CharacterCodes.at:
                  case CharacterCodes.backtick:
                  case CharacterCodes.tilde:
                      pos++;
                      return String.fromCharCode(ch);
                  default:
                      return scanCharacterEscape();
              }
          }
          else if (ch === text.charCodeAt(pos + 1)) {
              switch (ch) {
                  case CharacterCodes.ampersand:
                  case CharacterCodes.exclamation:
                  case CharacterCodes.hash:
                  case CharacterCodes.percent:
                  case CharacterCodes.asterisk:
                  case CharacterCodes.plus:
                  case CharacterCodes.comma:
                  case CharacterCodes.dot:
                  case CharacterCodes.colon:
                  case CharacterCodes.semicolon:
                  case CharacterCodes.lessThan:
                  case CharacterCodes.equals:
                  case CharacterCodes.greaterThan:
                  case CharacterCodes.question:
                  case CharacterCodes.at:
                  case CharacterCodes.backtick:
                  case CharacterCodes.tilde:
                      error(Diagnostics.A_character_class_must_not_contain_a_reserved_double_punctuator_Did_you_mean_to_escape_it_with_backslash, pos, 2);
                      pos += 2;
                      return text.substring(pos - 2, pos);
              }
          }
          switch (ch) {
              case CharacterCodes.slash:
              case CharacterCodes.openParen:
              case CharacterCodes.closeParen:
              case CharacterCodes.openBracket:
              case CharacterCodes.closeBracket:
              case CharacterCodes.openBrace:
              case CharacterCodes.closeBrace:
              case CharacterCodes.minus:
              case CharacterCodes.bar:
                  error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, pos, 1, String.fromCharCode(ch));
                  pos++;
                  return String.fromCharCode(ch);
          }
          return scanSourceCharacter();
      }
      function scanClassAtom(): string {
          if (text.charCodeAt(pos) === CharacterCodes.backslash) {
              pos++;
              const ch = text.charCodeAt(pos);
              switch (ch) {
                  case CharacterCodes.b:
                      pos++;
                      return "\b";
                  case CharacterCodes.minus:
                      pos++;
                      return String.fromCharCode(ch);
                  default:
                      if (scanCharacterClassEscape()) {
                          return "";
                      }
                      return scanCharacterEscape();
              }
          }
          else {
              return scanSourceCharacter();
          }
      }
      function scanCharacterClassEscape(): boolean {
          Debug.assertEqual(text.charCodeAt(pos - 1), CharacterCodes.backslash);
          let isCharacterComplement = false;
          const start = pos - 1;
          const ch = text.charCodeAt(pos);
          switch (ch) {
              case CharacterCodes.d:
              case CharacterCodes.D:
              case CharacterCodes.s:
              case CharacterCodes.S:
              case CharacterCodes.w:
              case CharacterCodes.W:
                  pos++;
                  return true;
              case CharacterCodes.P:
                  isCharacterComplement = true;
              // falls through
              case CharacterCodes.p:
                  pos++;
                  if (text.charCodeAt(pos) === CharacterCodes.openBrace) {
                      pos++;
                      const propertyNameOrValueStart = pos;
                      const propertyNameOrValue = scanWordCharacters();
                      if (text.charCodeAt(pos) === CharacterCodes.equals) {
                          const propertyName = nonBinaryUnicodeProperties.get(propertyNameOrValue);
                          if (pos === propertyNameOrValueStart) {
                              error(Diagnostics.Expected_a_Unicode_property_name);
                          }
                          else if (propertyName === undefined) {
                              error(Diagnostics.Unknown_Unicode_property_name, propertyNameOrValueStart, pos - propertyNameOrValueStart);
                              const suggestion = getSpellingSuggestion(propertyNameOrValue, nonBinaryUnicodeProperties.keys(), identity);
                              if (suggestion) {
                                  error(Diagnostics.Did_you_mean_0, propertyNameOrValueStart, pos - propertyNameOrValueStart, suggestion);
                              }
                          }
                          pos++;
                          const propertyValueStart = pos;
                          const propertyValue = scanWordCharacters();
                          if (pos === propertyValueStart) {
                              error(Diagnostics.Expected_a_Unicode_property_value);
                          }
                          else if (propertyName !== undefined && !valuesOfNonBinaryUnicodeProperties[propertyName].has(propertyValue)) {
                              error(Diagnostics.Unknown_Unicode_property_value, propertyValueStart, pos - propertyValueStart);
                              const suggestion = getSpellingSuggestion(propertyValue, valuesOfNonBinaryUnicodeProperties[propertyName], identity);
                              if (suggestion) {
                                  error(Diagnostics.Did_you_mean_0, propertyValueStart, pos - propertyValueStart, suggestion);
                              }
                          }
                      }
                      else {
                          if (pos === propertyNameOrValueStart) {
                              error(Diagnostics.Expected_a_Unicode_property_name_or_value);
                          }
                          else if (binaryUnicodePropertiesOfStrings.has(propertyNameOrValue)) {
                              if (!unicodeSetsMode) {
                                  error(Diagnostics.Any_Unicode_property_that_would_possibly_match_more_than_a_single_character_is_only_available_when_the_Unicode_Sets_v_flag_is_set, propertyNameOrValueStart, pos - propertyNameOrValueStart);
                              }
                              else if (isCharacterComplement) {
                                  error(Diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, propertyNameOrValueStart, pos - propertyNameOrValueStart);
                              }
                              else {
                                  mayContainStrings = true;
                              }
                          }
                          else if (!valuesOfNonBinaryUnicodeProperties.General_Category.has(propertyNameOrValue) && !binaryUnicodeProperties.has(propertyNameOrValue)) {
                              error(Diagnostics.Unknown_Unicode_property_name_or_value, propertyNameOrValueStart, pos - propertyNameOrValueStart);
                              const suggestion = getSpellingSuggestion(propertyNameOrValue, [...valuesOfNonBinaryUnicodeProperties.General_Category, ...binaryUnicodeProperties, ...binaryUnicodePropertiesOfStrings], identity);
                              if (suggestion) {
                                  error(Diagnostics.Did_you_mean_0, propertyNameOrValueStart, pos - propertyNameOrValueStart, suggestion);
                              }
                          }
                      }
                      scanExpectedChar(CharacterCodes.closeBrace);
                      if (!unicodeMode) {
                          error(Diagnostics.Unicode_property_value_expressions_are_only_available_when_the_Unicode_u_flag_or_the_Unicode_Sets_v_flag_is_set, start, pos - start);
                      }
                  }
                  else if (unicodeMode) {
                      error(Diagnostics._0_must_be_followed_by_a_Unicode_property_value_expression_enclosed_in_braces, pos - 2, 2, String.fromCharCode(ch));
                  }
                  return true;
          }
          return false;
      }

      function scanWordCharacters(): string {
          let value = "";
          while (pos < end) {
              const ch = text.charCodeAt(pos);
              if (!isWordCharacter(ch)) {
                  break;
              }
              value += String.fromCharCode(ch);
              pos++;
          }
          return value;
      }

      function scanSourceCharacter(): string {
          const size = unicodeMode ? charSize(codePointAt(text, pos)) : 1;
          pos += size;
          return text.substring(pos - size, pos);
      }

      function scanExpectedChar(ch: CharacterCodes) {
          if (text.charCodeAt(pos) === ch) {
              pos++;
          }
          else {
              error(Diagnostics._0_expected, pos, 0, String.fromCharCode(ch));
          }
      }

      scanDisjunction(/*isInGroup*/ false);

      forEach(groupNameReferences, reference => {
          if (!groupSpecifiers.has(reference.name)) {
              error(Diagnostics.There_is_no_capturing_group_named_0_in_this_regular_expression, reference.pos, reference.end - reference.pos, reference.name);
          }
      });
      forEach(decimalEscapes, escape => {
          if (escape.value > numberOfCapturingGroups) {
              if (numberOfCapturingGroups) {
                  error(Diagnostics.A_decimal_escape_must_refer_to_an_existent_capturing_group_There_are_only_0_capturing_groups_in_this_regular_expression, escape.pos, escape.end - escape.pos, numberOfCapturingGroups);
              }
              else {
                  error(Diagnostics.Decimal_escapes_are_invalid_when_there_are_no_capturing_groups_in_a_regular_expression, escape.pos, escape.end - escape.pos);
              }
          }
      });
  }
}
