---
title: ユーティリティツール10秒まとめ
---

本章では、UnJSの便利なユーティリティツールを、1つ10秒くらいでさくっと読めるように一気にご紹介します。

## destr - 安全にJSONをパースする

destrは、`JSON.parse`の代替ツールです。型安全で、パースに失敗してもエラーを出さずフォールバックし、プロトタイプ汚染も防ぎます。

```ts
destr('{ "foo": "bar" }');  // -> { foo: 'bar' }
destr('invalid json');  // -> invalid json
```

パースに失敗した時エラーを投げる`safeDestr`も用意されています。

## defu - オブジェクトをマージする

defuは、デフォルト値を再起的に割り当てるツールです。複数のオブジェクトをマージし、未定義の値に対してデフォルト値を埋めます。

```ts
const defaults = { color: 'blue', size: 'M' };
const options = { size: 'L', price: 3000 };

defu(options, defaults); // -> { color: 'blue', size: 'L', price: 3000 }
```

また、関数で挙動をカスタマイズ可能です。

## scule - 文字列のケースを変換する

sculeは、スネークケース、キャメルケースなど、文字列のケース記法を変換するツールです。

```ts
camelCase("foo-bar_baz"); // -> 'fooBarBaz'
kebabCase('foo-bar_baz'); // -> 'foo-bar-baz'
```

その他、`upperFirst`や`titleCase`など様々なケースに対応しています。また、`splitByCase`で分割するスプリッタをユーザ定義も可能です。

## 　magic-regexp - リーダブルな正規表現

magic-regexpは、コンパイル不要でリーダブルで型安全な正規表現を書けるツールです。

```ts
createRegExp(exactly('foo').or('bar'))  // -> /foo|bar/
```

## perfect-debounce - ワンライナーでデバウンス

perfect-debounceは、デバウンス処理をワンライナーで簡単に実装できるツールです。

```ts
const expensiveCall = async (input) => {
  console.log('Called with:', input);
  return input;
};

const debouncedFn = debounce(expensiveCall, 200);

debouncedFn(1);
debouncedFn(2);
debouncedFn(3);
// 200ms後に「Called with: 3」が表示される
```

初期待機を回避する`leading`オプションや、最後の呼び出しを制御する`trailing`オプションなどをサポートしています。

## pathe - Node.jsの`path`モジュール代替

patheは、Node.jsの`path`モジュール代替です。`path`モジュールのOS間での動作の違いを吸収し、パスを`/`に正規化します。（Windowsでは`/`がサポートされている）

正規化された`path`モジュール同一の機能に加え、いくつかの追加ユーティリティも用意されています。

```ts
import { filename, normalizeAliases, resolveAlias } from 'pathe/utils'
```

### ohash - 高速なハッシュ生成

ohashは、オブジェクトの安定したハッシュを生成するツールです。[sha256](https://en.wikipedia.org/wiki/SHA-2)や[MurmurHash](https://en.wikipedia.org/wiki/MurmurHash)などのハッシュ関数に加え、JavaScriptオブジェクトの値をハッシュ用の安定した文字列に変換する`objectHash`関数もサポートしています。

```ts
sha256("Hello World");
// -> "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"
objectHash({ foo: "bar" });
// -> "object:1:string:3:foo:string:3:bar,"
```

`isEqual`や`diff`など、オブジェクトを比較するユーティリティもサポートしています。

### ｋnitwork - JSのコード生成

### magicast -

### mdbox -
