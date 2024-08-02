---
title: "【2024年夏】ブラウザ拡張機能開発を加速するフレームワーク・ツール3選をコードベース付きで紹介！"
emoji: "🧩"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["拡張機能", "chrome拡張機能"]
published: false
publication_name: "cybozu_frontend"
---

:::message
この記事は、[CYBOZU SUMMER BLOG FES '24](https://cybozu.github.io/summer-blog-fes-2024/) Frontend Stage DAY 2 の記事です。
:::

本記事では、ブラウザ拡張機能開発を加速させる、個人的に注目な3つの拡張機能開発フレームワーク/ツール（WXT、Plasmo、Extension.js）を紹介します。
サンプル拡張機能の実装を通して、それぞれの特徴、セットアップ方法、実際の開発フローを見ていきます。お好みの拡張機能開発ツールを見つけていただければ嬉しいです。

## 各フレームワーク・ツールの紹介

### WXT

https://wxt.dev/

WXTは、Viteベースのブラウザ拡張フレームワークです。次のような特徴を持っています（トップページから抜粋）。

- [クロスブラウザ対応](https://wxt.dev/guide/key-concepts/web-extension-polyfill.html)
  - Chrome、Firefox、Edge、Safari、その他Chromiumベースのブラウザ
- [Manifest V2、V3の両方に対応](https://wxt.dev/guide/key-concepts/manifest.html)
- 開発モードでのHMRと、開発用ブラウザの自動起動
  - 内部的に[Chrome Launcher](https://github.com/GoogleChrome/chrome-launcher)等を使用
- [ファイルベースのエントリーポイント](https://wxt.dev/get-started/entrypoints.html)でマニフェストを自動生成
- [Nuxt風の自動インポート](https://wxt.dev/guide/key-concepts/auto-imports.html)
  - WXTが提供するライブラリを明示的にインポートする必要がない
- 公開プロセスの自動化
- [任意のフロントエンドフレームワークを利用可能](https://wxt.dev/guide/key-concepts/frontend-frameworks.html)
- 複数のExamples、テンプレートを提供
  - PlaywrightやVitestを使った自動テストのサンプルも
- [リモートコードのバンドル](https://wxt.dev/guide/go-further/remote-code.html)
  - URLからインポートされたリモートコードをダウンロードしてバンドル

### Plasmo

https://www.plasmo.com/

Plasmoは、Parcelベースのオールインワンなブラウザ拡張フレームワークです。次のような特徴を持っています（トップページから抜粋）。

- ブラウザ拡張機能開発のための有料の[統合プラットフォーム](https://www.plasmo.com/#pricing)の提供
- ファイルを作成し、コンポーネントをエクスポートする宣言的な開発アプローチ
- ソースファイルを元にした[マニフェスト自動生成](https://docs.plasmo.com/framework#where-is-the-manifestjson-file)
- TypeScript、React、Preact、Svelte、Vueのサポート
- 開発モードでのHMR
- ブラウザ拡張用のJavaScript APIをラップしたライブラリの提供
  - [@plasmohq/messaging](https://www.npmjs.com/package/@plasmohq/messaging)
  - [@plasmohq/storage](https://www.npmjs.com/package/@plasmohq/storage)
- [公開プロセスの自動化](https://github.com/PlasmoHQ/bpp)
- [Itero TestBedによる即時のベータテスター向けデプロイ](https://docs.plasmo.com/itero/github)
- アクティブな開発者コミュニティ（[400人以上](https://docs.plasmo.com/#plasmo-framework)）

Plasmoに関しての詳細な説明は、次の記事が参考になります。

https://zenn.dev/nado1001/articles/plasmo-browser-extension

### Extension.js

https://extension.js.org/

Extension.jsは、実用性と迅速なプロトタイピングを念頭に設計された拡張機能開発ツールです。次のような特徴を持っています（トップページから抜粋）。

- プラグアンドプレイ、ビルドコンフィグなしで開発可能
- クロスブラウザ対応 (Chrome, Edge, Firefoxなど)
- [MV2とMV3のほぼすべての機能をサポート](https://extension.js.org/n/development/the-manifest-file/manifest-capabilities/)
- TypeScript、WebAssembly、React、Vue、Preactなどをサポート
- 開発モードでのHMRと、開発用ブラウザの自動起動
- [既存のプロジェクトに組み込み可能](https://extension.js.org/#usage-with-an-existing-extension)
- [Chrome拡張機能サンプルやMozilla Add-onサンプルからコマンドで開発可能](https://extension.js.org/n/getting-started/get-started-immediately/#kickstart-any-sample-from-chrome-extension-samples)
- [リモート拡張機能を実行可能](https://extension.js.org/n/getting-started/remote-extension-execution/)
  - URLをコマンド引数として実行すると、対象のブラウザーに対して拡張機能ファイルをダウンロードして実行できる

## 作成する拡張機能

### デモ

作成する拡張機能のデモがこちらです。

![demoのgif](https://storage.googleapis.com/zenn-user-upload/e5ad32b6d8d2-20240801.gif)

カウンター横の取得するボタンを押すと、現在のカウント数をidに持つポケモンがポップアップに表示されるというものです。カウンターはWebページ上に表示されており、ポップアップは拡張機能のアクションボタンを押すと表示されます。

### 処理の流れ

1. [Content scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts)
   - Webページの左上にカウンターを表示する
   - カウントボタンを押下すると、カウントされる
   - 取得するボタンを押下すると、現在のカウント数をBackground scriptsに送信する
2. [Background scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Background_scripts)
   - Content scriptsからカウント数を受信する
   - 受け取ったカウント数を元に[PokéAPI](https://pokeapi.co/)にリクエストを送り、カウント数をidに持つポケモンを取得する
   - 取得した情報をPopupsに送信する
3. [Popups](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Popups)
   - Background scriptsから受け取ったポケモンの画像と名前を表示する

## フレームワーク・ツールごとの実装

完成品のコードはこちらです。全部全く同じ挙動をします。

https://github.com/k1tikurisu/zenn/tree/main/sources/extensions

### WXTでの実装

#### セットアップ

https://wxt.dev/get-started/installation.html

対話形式でセットアップします。テンプレートは、`vanilla`、`vue`、`react`、`solid`、`svelte`、から選ぶことができます。パッケージマネージャは`npm`、`pnpm`、`yarn`、`bun`から選べます。

```sh
npx wxt@latest init .

✔ Choose a template › react
✔ Package Manager › npm
```

#### ディレクトリ構成

https://wxt.dev/guide/directory-structure/output.html

```sh
.
├── assets
├── entrypoints
│   ├── background.ts # Background scripts
│   ├── content.ts    # Content scripts
│   └── popup/        # Popups
├── package.json
├── public
└── wxt.config.ts  # 設定ファイル（manifestなど）
```

WXTでは、`entrypoints`ディレクトリにファイルを追加することでエントリーポイントを作成します。`background`や、`*.content`、`popup/`など、一部のファイル名やパターンは特別で、マニフェストの生成に影響します。詳しくは、[Entrypoints Directory guide](https://wxt.dev/guide/directory-structure/entrypoints/background)を参照してください。リストにないファイルはマニフェストには追加されませんが、実行時にアクセスしたり、読み込むことは可能です。

`dev`コマンドで拡張機能読み込み済みの開発用ブラウザが起動し、開発を開始できます。

#### マニフェストの作成

`wxt.config.ts`の`manifest`プロパティに追加で与えたい権限などを記載します。

```ts:wxt.config.ts
import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    // ここに書く
  }
});
```

今回は特にありません。

#### Content scripts（カウンター）の実装

https://wxt.dev/guide/key-concepts/content-script-ui.html#content-script-ui

ReactでUIを構築したいので、`entrypoints/content.ts`を`entrypoints/content/index.tsx`に変更します。

```tsx:content/index.tsx
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

export default defineContentScript({
  matches: ['*://*/*'],
  cssInjectionMode: 'ui', // Content scriptsのCSSがWebページに影響を与えないようにする
  async main(ctx) { // Content scriptsがロードされたタイミングで実行される
    const ui = await createShadowRootUi(ctx, {
      name: 'wxt-react-example',
      position: 'inline',
      anchor: 'body', // Elementを直に指定することも可能　
      append: 'first',
      onMount: (container) => { // UIのマウント時に実行されるコールバック
        const wrapper = document.createElement('div');
        container.append(wrapper);

        const root = ReactDOM.createRoot(wrapper);
        root.render(<App />);
        return { root, wrapper };
      },
      onRemove: (elements) => { // UIがWebページから削除される時に実行されるコールバック
        elements?.root.unmount();
        elements?.wrapper.remove();
      },
    });

    ui.mount(); // onMountが実行される
  },
});
```

`defineContentScript`のみをエクスポートします。`defineContentScript`には、マニフェストのオプションと、`main`関数を定義します。`main`関数は、Content scriptsのロード時に実行されます。

UIの構成には、[`createShadowRootUi`](https://wxt.dev/guide/key-concepts/content-script-ui.html#shadow-root)が利用できます。内部的に[ShadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot)が使われており、記述したCSSはWebページに影響を与えません。UIの`mount`や`unmount`等のライフサイクルを自分で書くところが特徴です。

また、`defineContentScript`や、`createShadowRootUi`などは、Nuxt風の自動インポート機能により明示的にインポートする必要はありません。

:::details <App />の中身（カウンターのReactコンポーネント）

カウンターのReactコンポーネントです。`state`でカウント数を保持し、[`runtime.sendMessage`](https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage)を使って、Background scriptsにカウント数を送信しています。

```tsx:content/App.tsx
import { useState } from 'react';

import './App.css';

const App = () => {
  const [count, setCount] = useState(1);

  return (
    <div>
      <p>カウント数 {count}</p>
      <button type="button" onClick={() => setCount((count) => count + 1)}>
        カウント
      </button>
      <button
        type="button"
        onClick={() => {
          chrome.runtime.sendMessage({
            type: 'count',
            id: count,
          });
        }}
      >
        取得する
      </button>
    </div>
  );
};

export default App;

```

:::

#### Background scripts（APIリクエスト）の実装

https://wxt.dev/guide/directory-structure/entrypoints/background.html

```ts:background.ts
export default defineBackground({
  async main() {
    handlePokemonRequest()
  }
});
```

`defineBackground`のみをエクスポートします。`defineBackground`は、`defineContentScript`同様に、マニフェストのオプションと`main`関数を定義します。`main`関数は、Background scriptsのロード時に実行されます。

:::details handlePokemonRequest()の中身

[`runtime.onMessage`](https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)でContent scriptsからのメッセージを受信します。

Content scriptsが送信したメッセージ`type`と一致していたら、PokéAPIにリクエストを送信し、レスポンスを[`runtime.sendMessage`](https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage)でPopupに送ります。

```ts
function handlePokemonRequest() {
  chrome.runtime.onMessage.addListener(async (message) => {
    if (message.type === 'count') {
      const url = `https://pokeapi.co/api/v2/pokemon/${message.id}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        chrome.runtime.sendMessage({
          type: 'poke',
          image: data.sprites.front_default,
          name: data.name,
        });
      } catch (error) {
        console.error('Error fetching poke:', error);
      }
    }
  });
};
```

:::

#### Popups（ポケモンの表示）の実装

https://wxt.dev/guide/directory-structure/entrypoints/popup.html

`entrypoints/popup.html`または`entrypoints/popup/index.html`はPopupsとして解釈されます。

`index.html`ファイルは次のようになっています。

```html:entrypoints/popup/index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Default Popup Title</title>
    <meta name="manifest.type" content="browser_action" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./main.tsx"></script>
  </body>
</html>
```

`root`ノードを定義し、`main.tsx`を読み込んでいます。

`main.tsx`は次の通りです。

```tsx:entrypoints/popup/main.tsx
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
```

:::details ポケモンを描画する<App />の中身

[`runtime.onMessage`](https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)でBackground scriptsからのメッセージを受信し、中身に応じてポケモンを描画しています。

```tsx:entrypoints/popup/App.tsx
import { useEffect, useState } from 'react';
import './App.css';

const Popup = () => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const handler = (message: { type: string; image: string; name: string }) => {
      if (message.type === 'poke') {
        setImage(message.image);
        setName(message.name);
      }
    };

    chrome.runtime.onMessage.addListener(handler);

    return () => {
      chrome.runtime.onMessage.removeListener(handler);
    };
  }, []);

  return (
    <div className="container">
      <img alt={name} src={image} className="image" />
      <span className="name">{name}</span>
    </div>
  );
};

export default Popup;
```

:::

#### 感想

- フレームワークそのものの学習コストは低いなと感じました。`entrypoints`でエクスポートする関数もインターフェースが揃っていてわかりやすいです
- Content scriptsのUIのライフサイクルが隠蔽されてないのは個人的には嬉しいと思いました
- `dev`コマンドで拡張機能込みの開発用ブラウザが起動するのはかなり体験が良かったです。コンポーネント作成中のHMRも安定していました
- Nuxt風の自動インポートはどれくらいニーズがあるのでしょうか
- オプション周りをいじっている時は頻繁にエラーで落ちるので、その都度起動し直しているとこんな感じにはなります。開発初期は避けられないかもしれません

![MacのDockにChromeのアイコンが並んでいる画像](https://storage.googleapis.com/zenn-user-upload/831ce0a87890-20240801.png)

### Plasmoでの実装

#### セットアップ

https://docs.plasmo.com/framework#getting-started

`create`コマンドで雛形を作成できます。

```sh
# srcディレクトリ配下にソースコードを配置する
npm create plasmo --with-src
# Messaging APIを扱うため別途インストールする
npm i @plasmohq/messaging
```

#### ディレクトリ構成

```sh
.
├── README.md
├── assets
├── src
│   ├── background.ts  # Background scripts
│   ├── contents       # Content scripts
│   │   └── plasmo.ts
│   ├── popup.tsx      # Popups
│   └── style.css
└── package.json
```

Content scripts、Background scriptsや、Popupsなどの[Extension Pages](https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/user_interface/Extension_pages)は、すべて予約されたファイル名で作成する必要があります。詳しくは[Plasmo Framework](https://docs.plasmo.com/framework)の該当する項を参照してください。

`dev`コマンドで開発用サーバーが起動します。`build/chrome-mv3-dev`を、開発用の拡張機能として読み込むことで、開発を開始できます。

#### マニフェストの作成

`package.json`の`manifest`プロパティに追加で与えたい権限などを記載します。

```json:package.json
{
  "manifest": {
    // ここに書く
  }
}
```

今回は特にありません。

#### Content scripts（カウンター）の実装

https://docs.plasmo.com/framework/content-scripts-ui

`contents/`もしくは、`content.tsx`を配置することで、ReactでUIを構築できます。

```tsx:src/contents/index.tsx
import styleText from 'data-text:./content.css';
import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetStyle } from 'plasmo';
import { App } from './App';

// マニフェストのオプション
export const config: PlasmoCSConfig = {
  matches: ['*://*/*'],
};

// style
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement('style');
  style.textContent = styleText;
  return style;
};

export const getInlineAnchor: PlasmoGetInlineAnchor = () => document.body;

const Index = () => <App />;

export default Index;
```

`config`にはマニフェストのオプション、`getStyle`にはスタイル、`getXxAnchor`にはContent scriptsを描画する場所をそれぞれ定義し、エクスポートします。基本的にはコンポーネントをエクスポートするだけでUIを描画できるところが特徴です。

その他のオプションや、ライフサイクルは[Life Cycle of Plasmo CSUI](https://docs.plasmo.com/framework/content-scripts-ui/life-cycle)を参照してください。

Plasmoも内部的に[ShadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot)が使われており、記述したCSSはWebページに影響を与えません。

`<App />`では、取得ボタン押下時にPlasmoの[Messaging API](https://docs.plasmo.com/framework/messaging)を使用しています。

```ts:tsx:contents/App.tsx
// 取得ボタン押下時に↓を実行
await sendToBackground({
  name: 'count',
  body: {
    id: count,
  },
});
```

`sendToBackground`では、`name`と`body`を指定して、Background scriptsにメッセージを送信でき、返り値でBackground scriptsからのレスポンスを受け取ります。詳しいAPIの対応関係は[TL;DR | Messaging API](https://docs.plasmo.com/framework/messaging#tldr)を参照してください

:::details <App />の中身（カウンターのReactコンポーネント）

カウンターのReactコンポーネントです。`@plasmohq/messaging`の`sendToBackground`を使ってBackground scriptsにカウント数を送信しています。

今回はPopupsでレスポンスを受け取るため、返り値は受け取りません。

```tsx:contents/App.tsx
import { sendToBackground } from '@plasmohq/messaging';
import { useState } from 'react';

export const App = () => {
  const [count, setCount] = useState(1);

  return (
    <div>
      <p>カウント数 {count}</p>
      <button type="button" onClick={() => setCount((count) => count + 1)}>
        カウント
      </button>
      <button
        type="button"
        onClick={async () => {
          await sendToBackground({
            name: 'count',
            body: {
              id: count,
            },
          });
        }}
      >
        取得する
      </button>
    </div>
  );
};
```

:::

#### Background scripts（APIリクエスト）の実装

https://docs.plasmo.com/framework/background-service-worker

Plasmoの[Messaging API](https://docs.plasmo.com/framework/messaging)を利用すると、`runtime.onMessage`を使わずにファイルベースでメッセージを受信することができます。
今回は、`count`という`name`でカウント数を受け取るため、`background/messages/count.ts`という場所にファイルを作ります。

```ts:background/messages/count.ts
import type { PlasmoMessaging } from '@plasmohq/messaging';

const handler: PlasmoMessaging.MessageHandler<{ id: string }> = async (req, res) => {
  // 受信後の処理を書く
};

export default handler;
```

`req.body`にリクエストの中身が入っています。送信元にレスポンスを返す場合は、`res.send()`を使うことができます。

:::details Background scriptsの全体

今回は、送信元ではなくPopupsにポケモンの情報を送りたいので、[`runtime.sendMessage`](https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage)を使用しています。

```ts:background/messages/count.ts
import type { PlasmoMessaging } from '@plasmohq/messaging';

const handler: PlasmoMessaging.MessageHandler<{ id: string }> = async (req, _res) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${req.body.id}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    chrome.runtime.sendMessage({
      type: 'poke',
      image: data.sprites.front_default,
      name: data.name,
    });
  } catch (error) {
    console.error('Error fetching poke:', error);
  }
};

export default handler;
```　
:::

#### Popups（ポケモンの表示）の実装

https://docs.plasmo.com/framework/ext-pages#adding-a-popup-page

`popup.tsx`または`popup/index.tsx`で描画したいコンポーネントをエクスポートするとPopupsとして解釈されます。

```tsx:popup/index.tsx
import './popup.css';
import { useEffect, useState } from 'react';

// Reactコンポーネントをdefault exportする
function IndexPopup() {
  // ポケモンの描画処理
}

export default IndexPopup;
```

:::details popup/index.tsxの全体

WXTの`App`コンポーネントと全く同じです。PopupsでもPlasmoのMessaging APIが使用可能ですが、Background scriptsで`runtime.sendMessage`を使用しているため、`runtime.onMessage`で受信しています。

```tsx:popup/index.tsx
import { useEffect, useState } from 'react';
import './index.css';

interface PokeMessage {
  type: string;
  image: string;
  name: string;
}

const Popup = () => {
  const [pokeData, setPokeData] = useState<{ image: string; name: string }>({
    image: '',
    name: '',
  });

  useEffect(() => {
    const handleMessage = (message: PokeMessage) => {
      if (message.type === 'poke') {
        setPokeData({ image: message.image, name: message.name });
      }
    };

    if (!chrome.runtime.onMessage.hasListener(handleMessage)) {
      chrome.runtime.onMessage.addListener(handleMessage);
    }

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return (
    <div className="container">
      <img alt={pokeData.name} src={pokeData.image} className="image" />
      <span className="name">{pokeData.name}</span>
    </div>
  );
};

export default Popup;
```

:::

#### 感想

- 基本的にコンポーネントをエクスポートするだけなので、記述量は少なく、考えることも少ないなと感じました
  - パッと作って試したい時に便利だと思いました
- Plasmo特有のお作法を覚える必要があるため、少し学習コストは高いのかなと感じます
  - メッセージング周りで少しハマりました
- HMRはたまにされないときがありますが、右下にリロードボタンが浮かび上がるため、特に気になりませんでした。また、一度も開発サーバーは落ちませんでした

### Extension.jsでの実装

#### セットアップ

https://extension.js.org/n/getting-started/get-started-immediately/

デフォルトでTailwind CSSで構成されます。

```sh
# react-typescriptテンプレートを使用
npx extension create . --template=react-typescript
```

#### ディレクトリ構成

```sh
.
├── background.ts  # Background scripts
├── content        # Content scripts
│   ├── ContentApp.tsx
│   ├── base.css
│   ├── content.css
│   └── content.tsx
├── extension-env.d.ts
├── manifest.json
├── package.json
└── public
```

フレームワークではないため、予約されたファイル名等はありません。

`dev`コマンドで開発用ブラウザが立ち上がり、開発を開始できます。

#### マニフェストの作成

`manifest.json`に書きます。

```json:manifest.json
{
  "manifest_version": 3,
  "version": "1.0",
  "name": "extension-js",
  "description": "",
  "background": {
    "service_worker": "./background.ts"
  },
  "action": {
    "default_title": "Default Popup Title",
    "default_popup": "popup/index.html"
  },
  "content_scripts": [
    {
      "matches": ["*://*/*"],
      "js": ["./content/main.tsx"]
    }
  ],
  "host_permissions": ["*://*/*", "http://localhost/*"],
  "icons": {
    "16": "public/icon/icon_16.png",
    "48": "public/icon/icon_48.png"
  }
}
```

Popups、Background scripts、Content scriptsそれぞれへのビルド前のパスを記載します。

#### 全体の実装

特にフレームワーク特有のルール等はありません。

:::details 実装したファイルたち

#### Content scripts（カウンター）の実装

```tsx:content/main.tsx
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

setTimeout(initial, 1000);

function initial() {
  const rootDiv = document.createElement('div');
  rootDiv.id = 'extension-root';
  document.body.appendChild(rootDiv);

  const root = ReactDOM.createRoot(rootDiv);
  root.render(<App />);
}

```

```tsx:content/App.tsx
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(1);

  return (
    <div className="container">
      <p className="text">カウント数 {count}</p>
      <button className="button" type="button" onClick={() => setCount((count) => count + 1)}>
        カウント
      </button>
      <button
        className="button"
        type="button"
        onClick={() => {
          chrome.runtime.sendMessage({
            type: 'count',
            id: count,
          });
        }}
      >
        取得する
      </button>
    </div>
  );
}
```

#### Background scripts（APIリクエスト）の実装

```ts:background.ts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'count') {
    fetchPoke(message.id);
  }
});

async function fetchPoke(id: number) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    chrome.runtime.sendMessage({
      type: 'poke',
      image: data.sprites.front_default,
      name: data.name,
    });
  } catch (error) {
    console.error('Error fetching poke:', error);
  }
}
```

#### Popup（ポケモンの表示）の実装

```html:popup/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Extension</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this extension.</noscript>
    <div id="root"></div>
  </body>
  <script src="./main.tsx"></script>
</html>
```

```tsx:popup/main.tsx
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
```

```tsx:popup/App.tsx
import { useEffect, useState } from 'react';
import './App.css';

interface PokeMessage {
  type: string;
  image: string;
  name: string;
}

const Popup = () => {
  const [pokeData, setPokeData] = useState<{ image: string; name: string }>({
    image: '',
    name: '',
  });

  useEffect(() => {
    const handleMessage = (message: PokeMessage) => {
      if (message.type === 'poke') {
        setPokeData({ image: message.image, name: message.name });
      }
    };

    if (!chrome.runtime.onMessage.hasListener(handleMessage)) {
      chrome.runtime.onMessage.addListener(handleMessage);
    }

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return (
    <div className="container">
      <img alt={pokeData.name} src={pokeData.image} className="image" />
      <span className="name">{pokeData.name}</span>
    </div>
  );
};

export default Popup;
```

:::

#### 感想

- 特有のルールを覚えなくて良いため一番早く実装できました
  - 単に3個目に作ったので、コピペで済んだからかもしれません
- やっぱり`dev`コマンドで開発用ブラウザが起動するのはとても体験が良いです
- クロスブラウザ対応やビルドの設定はやってくれるけどマニフェストなどの根幹部分は自分で書く間合いはちょうど良く感じました

## おまけ（その他ツールを簡単に紹介）

### CRXJS Vite Plugin

https://crxjs.dev/vite-plugin

下記の記事が参考になります。

https://dev.classmethod.jp/articles/eetann-chrome-extension-by-crxjs/

### Vite Plugin Web Extension

WXTの開発者である[@aklinker1](https://github.com/aklinker1)氏が作成した、WXTの前身となるツールです。

https://vite-plugin-web-extension.aklinker1.io/

## まとめ

今回は、拡張機能を開発するためのフレームワーク・ツールの紹介と、実際にWXT、Plasmo、Extension.jsで拡張機能を実装しました。

開発者体験は全部良かったです。コンポーネントの実装自体が大きく変わるわけではないので、移行はそんなに大変ではないかなと思いました。（PlasmoのAPIをヘビーに使っている場合は微妙かも）

フレームワークを使用する際は慎重に検討する必要があると思いますが、POC作成等では気にせずガンガン使って加速させると良さそうです。

最後に、マニフェストを自動生成するフレームワークを使用する際は、ビルド後のマニフェストに目を通しておくと安心です。想定外の権限が付与されていることがあります。例として、Plasmoは[`@plasmohq/storage`](https://www.npmjs.com/package/@plasmohq/storage)を依存関係に追加すると、使用していなくてもstorageの権限が付与されます。
