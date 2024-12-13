---
title: "React v19リリースなど(2024-12-10号)" # 目立ったニュースを選ぶ
emoji: "⚛️" # お好きな絵文字を
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["CybozuFrontendWeekly", "frontend"]
published: true
publication_name: "cybozu_frontend"
---

こんにちは！サイボウズ株式会社フロントエンドエンジニアの[daiki（@k1tikurisu）](https://x.com/k1tikurisu)です。

## はじめに

サイボウズ社内では毎週火曜日にFrontend Weeklyと題し「一週間の間にあったフロントエンドニュースを共有する会」を開催しています。

今回は、2024/12/10のFrontend Weeklyで取り上げた記事や話題を紹介します。

## 取り上げた記事・話題

### がんばれ！くろーむ

https://x.com/takaswy1981/status/1862029920349966683

Google Chromeロゴのアニメプロジェクトです。

### WebDriver BiDi in WebKit

https://people.igalia.com/lmoura/wkcm-2024/webdriver-bidi-webkit.html

2024年のWebKit Contributors MeetingでIgaliaのLauro Moura氏が発表した資料です。WebDriver BiDiは、双方向通信を可能にするWebDriverプロトコルです。資料では、WebKitにおけるその実装状況や進捗が説明されています。

### 　Enter WebSockets - Mock Service Worker

https://mswjs.io/blog/enter-websockets

MSW（Mock Service Worker）が、WebSocketのモック機能を追加しました。記事では、WebSocketのサポートまでに何年もかかった理由について言及しており、WHATWGのWebSocket標準に基づくシンプルな実装にすることで実現できたと書かれています。また、MSWの開発者であるArtem Zakharchenko氏は、EggheadでWebSocketのモックについて学べる新しい[コース](https://egghead.io/courses/mocking-websocket-apis-with-mock-service-worker-9933b7f5)を提供しています。

### Solve Advent of Code 2024 with Deno and Win Prizes!

https://deno.com/blog/advent-of-code-2024

Denoは、毎年12月に開催されるプログラミングイベント「Advent of Code 2024」において、Denoを使用して課題を解く参加者に向けて、特製ステッカーなどの賞品を提供するキャンペーンを実施しています。

### React Router v7 | Remix

https://remix.run/blog/react-router-v7

React Router v7がstableになりました。v7より、Remixの機能がReact Routerに統合されるため、Remix v2のユーザに対しても、React Router v7への移行が推奨されています。

### `Intl.DurationFormat` to Stage 4

https://x.com/robpalmer2/status/1863679694861660657

`Intl.DurationFormat`がStage 4になりました。`Intl.DurationFormat`は、時間や期間を言語に応じた形式でフォーマットするための国際化APIです。

### Prisma ORM Manifesto: Clarity and Collaboration

https://www.prisma.io/blog/prisma-orm-manifesto

Prismaが、今後のビジョンや戦略を明確に示した「Prisma ORM Manifesto」を公開しました。Prismaはユーザー数の増加や機能範囲の拡大に伴い、ガバナンス維持に課題を感じています。特に、Issue管理やユーザーコミュニケーションについて、これらをどのように優先順位付けし解決していくかについて言及しています。

また、コミュニティの成長と開発者体験の向上を目指し、コア部分をRustからTypeScriptに置き換える構想についても書かれています。これに対するパフォーマンスへの懸念について、Bunの開発者であるJarred Sumner氏は、TypeScriptへの移行でオーバーヘッドが削減され、むしろ高速化する可能性を述べています。

https://x.com/jarredsumner/status/1863837970471784924

### CSSの新しい公式ロゴが誕生しました、メインカラーに採用されたレベッカパープルの知られざる感動秘話

https://coliss.com/articles/build-websites/operation/css/official-logo-for-css.html

CSSの開発元である[CSS-Next Community Group](https://github.com/CSS-Next/css-next)でCSSのロゴのアイデアを募り、CSSの新しい公式ロゴが誕生しました。CSS3だけでなく、CSS全体を表現できるより汎用化されたロゴになっています。

### Reclaim the internet: Mozilla’s rebrand for the next era of tech

https://blog.mozilla.org/en/mozilla/mozilla-brand-next-era-of-tech/

Mozillaがリブランディングすることを発表しました。このリブランディングは、Mozillaの使命である「Reclaim the Internet（インターネットを取り戻す）」という役割を再確認するものです。

### mizchiさんによる「LAPRAS 公開パフォーマンスチューニング」~調査編~

https://www.youtube.com/watch?v=j0MtGpJX81E

mizchiさんによるWebフロントエンド・パフォーマンスチューニングのデモンストレーションイベントです。実際に稼働しているサービス 「LAPRAS」を対象に、devtoolsを用いたパフォーマンス改善プロセスを実演しています。

次のスクラップで同様の内容がまとめられています。

https://zenn.dev/mizchi/scraps/c72e6a55deca18

### 自前のJSX実装を作るために必要な全ての知識

https://zenn.dev/uhyo/books/your-own-jsx-implementation

[uhyo](https://x.com/uhyo_)氏による、JSX対応ライブラリをTypeScriptで作る方法をハンズオン形式で解説するZenn Bookです。

### React v19 - React

https://react.dev/blog/2024/12/05/react-19

React v19がStableになりました。新しく導入されたアクションという概念や、Custom Elementsの完全サポートなどが含まれます。

新機能については、次の[uhyo](https://x.com/uhyo_)氏のZenn Bookが参考になります。

https://zenn.dev/uhyo/books/react-19-new

### Component testing RSCs

https://storybook.js.org/blog/component-testing-rscs/

ReactのサーバーコンポーネントをStorybookでテストする方法について解説する記事です。

### Intent to Prototype: ShadowRealm

https://groups.google.com/a/chromium.org/g/blink-dev/c/xcfT92S2Xno

ShadowRealmはコードを安全かつ独立した環境で実行するための仕組みです。

Figmaの次の記事も参考になります。Figmaは、プラグインコードの実行環境をFigma本体から分離し、セキュリティとパフォーマンスを確保する仕組みとして、Realmsという概念を導入しています。

https://www.figma.com/blog/how-we-built-the-figma-plugin-system/

### CSS Wrapped 2024

https://chrome.dev/css-wrapped-2024/

2024年に導入された主要なCSS機能をまとめたChrome DevRelチームによる特集です。

### WebKit(JavaScriptCore)に100個のPull Requestがマージされた

https://sosukesuzuki.dev/posts/jsc-contributions-2024/

[sosukesuzuki](https://x.com/__sosukesuzuki)氏の、WebKitへの貢献についての記事です。2024年2月からWebKitのJavaScriptエンジンであるJavaScriptCore (JSC)への貢献を開始し、12月までに100件のプルリクエストがマージされました。これは、AppleやIgalia、Sonyの従業員以外の個人としては異例の成果です。

### Read More Easily with Native Fonts

https://help.salesforce.com/s/articleView?id=release-notes.rn_lex_default_font.htm&release=232&type=5

Salesforceは、2021年にデフォルトフォントを各OSのネイティブUIフォントに変更しました。Salesforceが考えるOSのシステムフォントを使うメリットなどがまとめられてます。

## あとがき

React v19に早く移行したいですね！(遠い目)
あと、Prismaの再スタートは個人的に注目しています。
