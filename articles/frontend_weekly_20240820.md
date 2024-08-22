---
title: "新たなWebブラウザ「Verso」など: Cybozu Frontend Weekly (2024-08-20号)" # 目立ったニュースを選ぶ
emoji: "📘" # お好きな絵文字を
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["CybozuFrontendWeekly", "frontend"]
published: false
publication_name: "cybozu_frontend"
---

こんにちは！サイボウズ株式会社フロントエンドエンジニアの[daiki（@k1tikurisu）](https://x.com/k1tikurisu)です。

## はじめに

サイボウズ社内では毎週火曜日にFrontend Weeklyと題し「一週間の間にあったフロントエンドニュースを共有する会」を開催しています。

今回は、2024/08/20のFrontend Weeklyで取り上げた記事や話題を紹介します。

## 取り上げた記事・話題

### feat(next): `next.config.ts` by devjiwonchoi · Pull Request #63051 · vercel/next.js

https://github.com/vercel/next.js/pull/63051

Next.jsの設定ファイルをTypeScriptで書けるようになりました。`next.config.ts`に設定ファイルを記述することができます。

### Using pnpm on Heroku

https://blog.heroku.com/using-pnpm-on-heroku

HerokuのNode.js buildpackが、パッケージマネージャの1つであるpnpmをサポートしました。pnpmを使用することで、npmと比べてデプロイ時のパッケージインストールが10~40%程度高速になるようです。

### Page Speed Benchmarks | SpeedCurve

https://app.speedcurve.com/benchmarks/japan/media/fast/start-render/

[SpeedCurve](https://www.speedcurve.com/)というサービスが提供する、主要なWebサイトのパフォーマンスのベンチマークが確認できるダッシュボードです。

次の記事では、このダッシュボードで公開されているパフォーマンス結果を元に、多くのサイトで活用されていないパフォーマンスの最適化方法を紹介しています。

https://www.speedcurve.com/blog/15-neglected-page-speed-optimizations/

### HTML Tags Memory Test

https://codepen.io/plfstr/full/zYqQeRw

HTML Tagsを何個覚えているかをテストするサイトです。

### July 22, 2024 Release – React Spectrum Release

https://react-spectrum.adobe.com/releases/2024-07-22.html

React Spectrumの7月のリリースノートです。

コンポーネントの仮想化の実装を大幅に改善し、バンドルサイズの縮小と、パフォーマンス・安定性の向上が実現されました。スクロールに伴うDOMノードの再利用が改善されたため、テストでは大きなテーブルのフレームごとのレンダリング時間が14倍高速化されたようです。

### Understanding the ‘Why’ behind some basic UI design practices

https://bootcamp.uxdesign.cc/understanding-the-why-behind-some-basic-ui-design-practices-b5d162d6bbd4

よくあるUIデザインのプラクティスの背景にある「Why」を理解する記事です。

例えば、次のような疑問に回答しています。

- `padding`や`gap`はなぜ4または8の倍数が良いのか
- 小数点での`px`指定はなぜ良くないのか
- アイコンのサイズはなぜ24x24なのか

### Failed to import package that contained deno workspace · Issue #1131 · denoland/vscode_deno

https://github.com/denoland/vscode_deno/issues/1131

[Deno v1.45](https://deno.com/blog/v1.45)で実装されたworkspace機能がVSCode拡張で正しく動かなかった不具合が、v1.45.4で修正されました。

### Intent to End OCSP Service

https://letsencrypt.org/2024/07/23/replacing-ocsp-with-crls.html

Let's Encryptが、Online Certificate Status Protocol (OCSP)のサポートを終了し、Certificate Revocation Lists (CRLs) に移行することを発表する記事です。

Webサイトやそのサイトを訪問するユーザーは影響を受けませんが、一部の非ブラウザソフトウェアは影響を受ける可能性があります。VPNなどブラウザ以外の通信を保護するためにLet's Encrypt証明書を使用している場合、OCSP URLがない状態でも正常に動作することを確認する必要があります。

### Keyboard-Only Scrolling Areas

https://adrianroselli.com/2022/06/keyboard-only-scrolling-areas.html

キーボード操作のみでスクロール可能な領域にアクセスできることの重要性と、非対応ブラウザでのユーザ向けソリューションについて言及している記事です。

スクロールコンテナをキーボードフォーカス可能にする機能の主要ブラウザの実装状況は次のとおりです

- Firefox: サポート済みです
- Chrome: 127で追加され、128で全ユーザが利用可能になる予定です
- Safari: サポートしていません

### Line-breakable `<ruby>` and CSS ruby-align property

https://developer.chrome.com/blog/line-breakable-ruby

Chrome 128で`<ruby>`が改行できるようになりました。`ruby-align`でルビの位置を調整できます。

### Storybook 8.2

https://storybook.js.org/blog/storybook-8-2/

Storybook 8.2がリリースされました。主に次の機能が追加されました。

- Jest/Vitest/Playwright/Cypressなどのテストツールと同等のtest hooksの提供
- Portable storiesをReact、Vue3でサポート（Svelteはexperimental）
- 18のパッケージを1つのコアパッケージ（`storybook`）に統合
- ドキュメントサイトを改善し、各フレームワークごとに導入方法を記載

### Turbopack updates: Moving homes – Vercel

https://vercel.com/blog/turbopack-moving-homes

Vercelが開発しているJavaScript/TypeScriptバンドラであるTurbopackの最新情報についての記事です。主なポイントは次の通りです。

- TurbopackはNext.jsのテストケースを100%パスしており、Next.jsのExamplesでTurbopackが動作する
- 上位300のnpmパッケージ（指標には言及がありませんでした）がTurbopackでビルドできることを確認
- Vercel.comの開発に使用されている
- Turbopackのコードは今後`vercel/turbo`から`vercel/next.js`に移動する
  - 開発速度向上が目的でNext.jsのみをサポートすることを意図していない
- Turbopackのコアはフレームワークに依存しない設計を維持

### New to the web platform in July

https://web.dev/blog/web-platform-07-2024?hl=en

7月にWebブラウザに追加された、安定版またはベータ版の機能を紹介する記事です。Firefox 128、Safari 17.6、Chrome 127が安定版になりました。

### Rust製ブラウザエンジン「Servo」搭載、新たなWebブラウザ「Verso」の開発プロジェクトが立ち上がる

https://www.publickey1.jp/blog/24/rustservowebverso.html

NLnet Foundationは、Rust製ブラウザエンジン「Servo」を用いたWebブラウザ「Verso」の開発プロジェクトの立ち上げを発表しました。Electron代替を目指すフレームワーク[Tauri](https://tauri.app/)の開発チームが主導するそうです。

### Node v22.6.0 (Current)

https://nodejs.org/en/blog/release/v22.6.0

Node.jsのv22.6.0がリリースされました。

`--experimental-strip-types`フラグを使用することで、TypeScriptファイルを実行できるようになりました。ただし、次のような制約があります。

- インライン型アノテーションのみに対応
- モジュールインポートに明示的なファイル拡張子が必要
- 型のインポートには`type`キーワードを使う必要がある
- `node_modules`はデフォルトでTypeScriptが無効化される

### React / Remix への依存を最小にするフロントエンド設計 - 一休.com Developers Blog

https://user-first.ikyu.co.jp/entry/2024/08/05/142626

一休レストランでのライブラリ依存を少なくするフロントエンド設計を紹介する記事です。

### Linear Matching of JavaScript Regular Expressions | Proceedings of the ACM on Programming Languages

https://dl.acm.org/doi/10.1145/3656431

計算量爆発をしない新しい正規表現アルゴリズムを提案する論文です。すでにV8にマージされているようです。

### Google Online Security Blog: Improving the security of Chrome cookies on Windows

https://security.googleblog.com/2024/07/improving-security-of-chrome-cookies-on.html

Chrome 127で導入された、WindowsのCookieのセキュリティを向上する、App-Bound Encryptionという保護レイヤーを紹介する記事です。

## あとがき

Storybookの進化がすごいですね、ちゃんと知識をアップデートしていかないとと思いました。
