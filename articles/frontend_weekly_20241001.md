---
title: "新たなWebブラウザ「Verso」など: Cybozu Frontend Weekly (2024-10-01号)" # 目立ったニュースを選ぶ
emoji: "" # お好きな絵文字を
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["CybozuFrontendWeekly", "frontend"]
published: false
publication_name: "cybozu_frontend"
---

こんにちは！サイボウズ株式会社フロントエンドエンジニアの[daiki（@k1tikurisu）](https://x.com/k1tikurisu)です。

## はじめに

サイボウズ社内では毎週火曜日にFrontend Weeklyと題し「一週間の間にあったフロントエンドニュースを共有する会」を開催しています。

今回は、2024/10/01のFrontend Weeklyで取り上げた記事や話題を紹介します。

## 取り上げた記事・話題

### WebKit Features in Safari 18.0

https://webkit.org/blog/15865/webkit-features-in-safari-18-0/

Safari 18.0がリリースされました。ポイントとなる機能は次の通りです。

- Distraction Control：ウェブブラウジング中の邪魔な要素を隠す
- Video Viewer：ビデオを全画面表示する
- iPhone Mirroring and remote inspection：
- CSS
  - View Transition API
  - Style Queries
- HTML
  - インライン予測テキスト
  - Switch入力の触覚フィードバック（切り替えると、ブルってなる）
  - 日付・時間入力フィールドのアクセシビリティ改善
- JavaScript
  - Unicode 15.1.0のRegExpサポート
  - `URL.parse()`の追加
- View Transitionの実装が揃う

追加・修正が多いため、

### 1.3 Million Subtests

https://bkardell.com/blog/1_3M-WPTMilestone.html

ブラウザエンジン「Servo」の進展についての記事です。Servoは、Rust製のブラウザエンジンで、新しいWebブラウザVersoの開発に利用されています。Servoは、Web標準技術に対するテストスイートであるWeb Platform Testsの、130万以上のサブテストに合格し、全体の73%以上をパスしました。GeckoやKHTML由来でないブラウザエンジンとして急成長しています。

### Builder Day 2024: 18 big updates to the Workers platform

https://blog.cloudflare.com/builder-day-2024-announcements/

Cloudflareの「Builder Day 2024」で発表された18の主要なアップデートについて紹介したブログ記事です。一部を抜粋します。

- Persistent Logs for every Worker
  - Workerのログを保持できるように
- Improved Node.js compatibility is now GA
  - WorkersランタイムでのNode APIの数が2倍になり、Node.jsとの互換性がGAに
- Build frontend applications on Workers with Static Asset Hosting
  - AstroやNext.jsで生成した静的アセットをWorkerに直接デプロイできるように
  - https://developers.cloudflare.com/workers/static-assets/
- Cloudflare joins OpenNext to deploy Next.js apps to Workers
  - Next.jsアプリケーションをOpenNextを使ってWorkersにデプロイできるように
- Image optimization is available to everyone for free — no subscription needed
  - Cloudflare Imagesで、1ヶ月あたり最大5,000回の画像最適化を無料で利用できるように

そのほか、QueuesやR2のEvent notificationsがGAになりました。

### The Web Vitals extension, now in DevTools

https://developer.chrome.com/blog/web-vitals-extension?hl=en

Chrome 129から、DevToolsのパフォーマンスパネルでCore Web Vitalsの計測結果を確認できるようになりました。Chromeチームが運営する「[Web Vitals](https://chromewebstore.google.com/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma)」拡張機能で提供される機能を順次パフォーマンスパネルに移行し、2025年1月までにWeb Vitals拡張機能のサポートを終了する予定です。

### Prisma 5.20.0 release

https://github.com/prisma/prisma/releases/tag/5.20.0

`strictUndefinedChecks`がPreview機能として追加されました。Prismaでは、`where`節に`undefined`が入ると条件なしで検索するため、意図せずデータが漏洩したり、データが損失してしまうことがありました。`strictUndefinedChecks`を有効化することで、`undefined`をエラーとして検出してくれるようになります。次のメジャーバージョンからデフォルトで有効になる予定です。

### Oxc Transformer Alpha | The JavaScript Oxidation Compiler

https://oxc.rs/blog/2024-09-29-transformer-alpha.html

OXC Transformerのアルファ版がリリースされました。OXC transformerは、Rust製のTypeScriptのトランスパイラです。

### Announcing BCD Watch

https://meyerweb.com/eric/thoughts/2024/09/23/announcing-bcd-watch/

MDNの[Browser Compatibility Data（BCD）](https://github.com/mdn/browser-compat-data)を収集したWebサイト「[BCD Watch](https://bcd-watch.igalia.com/)」が発表されました。BCDの全ての変更と、主要ブラウザのサポート状況を確認できます。これらのレポートは、RSS、Atom、JSONフィードとしても利用できます。

### 　OpenNext

https://opennext.js.org/

OpenNextは、Next.jsをVercel以外のさまざまなプラットフォームでホスティングできるようにするオープンソースの取り組みです。現在は、AWSやCloudflareのアダプタを提供しています。Next.jsの全機能をサポートすることを目指し、コミュニティ手動で開発が進められています。

### Removing Corepack - Speaker Deck

https://speakerdeck.com/yosuke_furukawa/removing-corepack

Node.jsのPackage Maintenance Working Group（PMWG）がCorepackをNode.jsの配布から削除する計画と、その経緯をまとめたスライドです。否定の声も大きいことから、本当に削除されるかはまだわからないと結論づけています。

### End of life for Actions Node16 · GitHub Changelog

https://github.blog/changelog/2024-09-25-end-of-life-for-actions-node16/

2024年10月15日をもって、GitHub ActionsのrunnerはNode.js16のサポートを終了する予定です。

### Server ActionsをServer Functionsに命名変更

https://x.com/sebastienlorber/status/1840674102178103422

React v19より、用語変更が行われ、Server ActionsはServer Functionsに変更されました。Server Actionsという用語の代わりにServer Functionsという用語を使うようになり、Server Actionsはその中の特定の使い方を指すようになりました。

### New support eslint 9 by G-Rath · Pull Request #2996 · import-js/eslint-plugin-import

https://github.com/import-js/eslint-plugin-import/pull/2996

eslint-plugin-importがESLint v9をサポートしました（執筆時2024年10月3日では、まだリリースされていません）。ESLint v8のEOLは2024年10月5日を予定しており、利用者側はアップデートを急ぐ必要があります。

### Storybook8.3

https://storybook.js.org/blog/storybook-8-3/

Storybook 8.3がリリースされました。一部を抜粋します。

- First-class Vitest integration
  - Vitestのbrowser modeを使ってStoryのテストがexperimentalでできるように
- Next.js Vite framework
  - Next.jsをサポートするためにNext.js環境をエミュレートするViteプラグインが作成
- Experimental story globals
  - Story globalsというstoryごとに簡単にview portやbackground、localeを変更できるapiがexperimentalでリリース

### 　TPAC 2024: Overview

https://www.w3.org/2024/09/TPAC/

W3Cの年次イベントであるW3C TPACが2024年9月23日から5日間にわたって開催されました。

アジェンダは次のIssueから確認できます。

https://github.com/whatwg/meta/issues/326

## あとがき

Storybookの進化がすごいですね、ちゃんと知識をアップデートしていかないとと思いました。
