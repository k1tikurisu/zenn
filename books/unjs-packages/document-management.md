---
title: ドキュメント作成・管理
---

ドキュメント作成・管理カテゴリとして、次の5つのツールを紹介します。

- [automd](https://unjs.io/packages/automd): Automated markdown maintainer!
- [changelogen](https://unjs.io/packages/changelogen): Generate Beautiful Changelogs using Conventional Commits
- [mdbox](https://unjs.io/packages/mdbox): Just simple markdown utils!
- [undocs](https://unjs.io/packages/undocs): Minimal Documentation theme and CLI for shared usage across UnJS projects.
- [untyped](https://unjs.io/packages/untyped): Generate types and markdown from a config object.

## automd

automdは、マークダウンドキュメントのメンテナンスを自動化するツールです。UnJSパッケージの多くはREADMEをautomdで管理しています（[UnJS Relations](https://unjs.io/relations?u[]=automd&showDependencies=true&showDevDependencies=true&showChildren=false)）。

### 機能

マークダウン内で指定の注釈コメントを差し込むと、automdはそれを解析して自動で内容を更新します。

automdが解析する注釈コメントは次の構文を取ります。

```md
<!-- automd:generator [...args] -->
<!-- /automd -->
```

`generator`はautomdが提供しており、それぞれの`generator`はオプションで`args`を受け取ります。実行すると、コメント開始から`/automd`の間に自動で更新内容が挿入されます。

例えば、badgesジェネレータは、npm、GitHub、ライセンスなどのバッジを生成します。

```md
<!-- automd:badges color="yellow" name="defu" bundlephobia packagephobia -->

[![npm version](https://img.shields.io/npm/v/defu?color=yellow)](https://npmjs.com/package/defu)
[![npm downloads](https://img.shields.io/npm/dm/defu?color=yellow)](https://npm.chart.dev/defu)
[![bundle size](https://img.shields.io/bundlephobia/minzip/defu?color=yellow)](https://bundlephobia.com/package/defu)

<!-- /automd -->
```

全[9つのジェネレータ](https://automd.unjs.io/generators)が存在します。一部を抜粋します。

- [badges](https://automd.unjs.io/generators/badges)
  - npm、GitHub、ライセンスなどのバッジを生成
- [contributors](https://automd.unjs.io/generators/contributors)
  - コントリビュータ一覧を画像付きで生成
- [fetch](https://automd.unjs.io/generators/fetch)
  - 受け取ったURLのレスポンス本文をインライン化
- [jsdocs](https://automd.unjs.io/generators/jsdocs)
  - JSDocsを解析して関数のドキュメントを生成

ジェネレータの提案と実装はIssueより歓迎されています。

https://github.com/unjs/automd/issues?q=is%3Aopen+is%3Aissue+label%3Agenerator

### さっそく使う

CLI経由で使用できます。

```sh
npx automd@latest
```

また、stableではありませんが、[Programmatic API](https://automd.unjs.io/guide/api)からも利用できます。

```js
import { automd, transform } from "automd";
```

CLIの引数で指定するオプションは、設定ファイルでも指定可能です。

```js: automd.config.js
/** @type {import("automd").Config} */
export default {
  file: "DOCS.md",
};
```

## changelogen

changelogenは、[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)に基づいたチェンジログを自動生成します。

### 機能

チェンジログの生成のほか、複数の機能を持ちます。

- チェンジログの生成
  - [Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)の規格に基づいたコミットメッセージを解析し、自動でマークダウン形式のチェンジログを生成
- バージョンの更新
  - セマンティックバージョニングにしたがって`package.json`のバージョン番号を自動更新
  - Canaryリリースやプレリリースなど、日付やコミットハッシュを含むバージョン番号への更新も可能
  - バージョン更新と同時にGitタグを生成（スキップも可能）
- GitHubのリリースノートの生成
  - チェンジログの内容を自動でGitHubのリリースノートに転記
- npmへのアップロード
  - 新バージョンをnpmに自動で公開

### さっそく使う

各種機能は、CLI経由で使用できます。多くのオプション引数がサポートされているため、詳細は[ドキュメント](https://unjs.io/packages/changelogen#cli-usage)を参照してください。

```sh
npx changelogen@latest
```

changelogenの挙動は、設定ファイルを配置することでカスタマイズできます。

```json: changelog.config.json
{
  "types": {
    "feat": { "title": "🚀 Features", "semver": "minor" },
    "fix": { "title": "🐛 Bug Fixes", "semver": "patch" },
    "docs": { "title": "📖 Documentation", "semver": "patch" }
  },
  "repo": "user/repository",
  "output": "CHANGELOG.md"
}
```

## mdbox

mdboxは、プログラムでマークダウンを読み書きするツールです。automdでのマークダウン生成に利用されています。

### 機能

#### マークダウンの読み取り

[markdown-it](https://github.com/markdown-it/markdown-it)、[md4w](https://github.com/ije/md4w)、[mdast-util-from-markdown](https://github.com/syntax-tree/mdast-util-from-markdown)からパーサを選択できます。

```js
// markdown-itでの使用例
import { initMarkdownItParser } from "mdbox/parser";
const parser = await initMarkdownItParser();
const { tree } = parser.parse("# Hello, *world*!");
```

#### マークダウンの書き込み

マークダウンのレンダリングユーティリティが用意されています。一部を抜粋します。

```js
md.bold("Bold Text"); // => "**Bold Text**"
md.link("https://example.com", "Example"); // => "[Example](https://example.com)"
md.table({
 columns: ["Breed", "Origin", "Size", "Temperament"],
 rows: [
   ["Abyssinian", "Egypt", "Medium", "Active"],
   ["Aegean", "Greece", "Medium", "Active"],
  ],
});
```

### さっそく使う

パッケージをインストールし、importして使います。

```sh
npm install mdbox
```

```js
// ESM
import { md } from "mdbox";

// CommonJS
const { md } = require("mdbox");
```

## undocs

undocsは、UnJSプロジェクトで使用するサイトテーマです。現状はUnJSのみを対象としているため、カスタマイズできる部分は限られており、利用できる状態ではありません。

undocsの[サイト](https://undocs.pages.dev/)や、automdの[サイト](https://automd.pages.dev/)はundocsで作成されています。

## untyped

untypedは、スキーマ定義から自動的に型定義とマークダウンドキュメントを生成するツールです。

### 機能

スキーマを定義します。

```js
import { resolveSchema, generateTypes } from "untyped";

const schema = {
  name: { type: "string", default: "John" },
  age: { type: "number", default: 30 },
};

async function main() {
  const resolvedSchema = await resolveSchema(schema);
  const types = generateTypes(resolvedSchema);
  console.log(types);
}
```

```ts
export interface Untyped {
  /** @default "John" */
  name: string;

  /** @default 30 */
  age: number;
}
```

```md
# `name`

- **Type**: `string`
- **Default**: `"earth"`

## `gravity`

- **Type**: `number`
- **Default**: `9.8`

## `moons`

- **Type**: `array`
- **Default**: `["moon"]`
```
