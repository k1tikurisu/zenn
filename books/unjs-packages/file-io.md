---
title: ファイル読み書き
---

ファイル読み書きカテゴリとして、次の3つのツールを紹介します。

- [c12](https://unjs.io/packages/c12): Smart Configuration Loader.
- [confbox](https://unjs.io/packages/confbox): Compact and high quality YAML, TOML, JSONC and JSON5 parsers.
- [rc9](https://github.com/unjs/rc9): Read/Write config couldn't be easier!

## c12

c12は、設定ファイルを読み込むためのツールです。JSON、YAML、TOML、JavaScript、TypeScriptなど、さまざまな形式のファイルに対応し、複数の設定ソースを統合して効率的に管理できます。

### 機能

c12は次の機能を持ちます。

- 設定ファイルの探索と読み込み
  - 設定ファイルを探索し、適切なファイルを読み込みます。
- 設定の統合
  - CLIオプション、作業ディレクトリにある設定ファイル・RCファイル、ユーザーのホームディレクトリにあるRCファイル、package.jsonなど、複数の設定ソースを統合して読み込みます。
    - 各設定ソースへの個別アクセスも可能です。
- .envファイルのサポート
  - 環境変数の読み込み・変数展開にも対応しています。
- 設定の監視
  - 設定ファイルの変更・追加・削除を監視し、自動的に再ロードできます。

### さっそく使ってみる

c12を使って設定ファイルを読み込む基本的なコード例です。

```js
import { loadConfig } from 'c12';

async function main() {
  const { config } = await loadConfig({
    // nameで指定したファイル名を探索します
    // 例：myapp.config.js, myapp.config.json
    name: 'myapp',
    // デフォルト値
    defaults: {
      key: 'default value',
    },
  });

  console.log('Loaded Config:', config);
}

main();
```

`loadConfig`の代わりに、`watchConfig`を使用すると、設定の変更・追加・削除を監視し、新しい設定で自動的に再ロードします。

## confbox

confboxは、JSON、JSON5、JSONC、YAML、TOMLなどのパーサ・シリアライザです。各形式ごとに、`parse`と`stringify`関数が提供されており、簡単に利用できます。

### 実際の使用例

YAMLファイルの読み込みと書き出しの例です。

```ts
import { parseYAML, stringifyYAML } from 'confbox';

const yamlString = `
name: John
age: 30
`;

// YAML文字列をオブジェクトに変換
const obj = parseYAML(yamlString);
console.log(obj); // { name: 'John', age: 30 }

// オブジェクトをYAML文字列に変換
const output = stringifyYAML(obj);
console.log(output);
/*
name: John
age: 30
*/
```

## rc9

rc9は、RCファイルや環境設定ファイルを読み書き・更新するツールです。

### 機能

- RCファイルの読み書き
  - `.conf`や、`.myapprc`などのファイルを読み書きできます。
- フラット形式のサポート
  - ネストされたオブジェクトとドット記法を双方向に変換できます。

### 実際の使用例

```ts
import { write, read } from 'rc9';

const flat = {
  server: {
    host: 'localhost',
    port: 8080,
  }
};

// 書き込み
write(flat);

// フラット形式で読み込み
const config = read({ flat: true });
console.log(config);
// 出力: { 'server.host': 'localhost', 'server.port': 8080 }
```
