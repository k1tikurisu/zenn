---
title: "Next.js 15.4リリースなど: Cybozu Frontend Weekly (2025-07-22号)" # 目立ったニュースを選ぶ
emoji: "⚡" # お好きな絵文字を
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["CybozuFrontendWeekly", "frontend"]
published: true
publication_name: "cybozu_frontend"
---

こんにちは！サイボウズ株式会社フロントエンドエンジニアの[daiki（@k1tikurisu）](https://x.com/k1tikurisu)です。

## はじめに

サイボウズ社内では毎週火曜日にFrontend Weeklyと題し「一週間の間にあったフロントエンドニュースを共有する会」を開催しています。

今回は、2025/07/22のFrontend Weeklyで取り上げた記事や話題を紹介します。

## 取り上げた記事・話題

### Next.js 15.4

https://nextjs.org/blog/next-15-4

Next.js 15.4 がリリースされました。主な変更点は以下の通りです。

- Turbopackビルド（`next build --turbopack`）
  - プロダクション向けの結合テストを全て通過
- 安定性の向上
  - Next.jsとTurbopackの安定性とパフォーマンスの改善

また、Next.js v16についても言及されています。

### NuxtLabsがVercelに参画

https://x.com/nuxtlabs/status/1942575789645640071

NuxtLabsがVercelに参画すると発表がありました。

### React Router and React Server Components: The Path Forward

https://remix.run/blog/react-router-and-react-server-components

React RouterとReact Server Componentsの統合について、今後どのように展開していくかについての記事です。

### 企業ページにおけるRecoilからの段階的移行

https://developers.prtimes.jp/2025/07/18/company-page-recoil-migration/

PR TIMESによる、Recoil剥がしの事例を紹介する記事です。
依存度がかなり高かったことから、@state-tracer/recoilという自作ライブラリでstateの依存関係を把握するところから始めて、stateの分離やTanStack Query・Jotaiへの移行を進めていったようです。今後はまだ大規模なエディター機能のRecoil剥がしがあるとのことです。

### 消費者欺く「ダークパターン」撲滅へ　“誠実なWebサイト”認定制度

https://www.watch.impress.co.jp/docs/news/2031477.html

ダークパターン対策協会は、Webサイトがダークパターンを使わずに誠実に設計されていることを認定する「NDD（Non-Deceptive Design）認定制度」を開始しました。
審査基準は最初は「組織的対策」「クッキーバナー」「購入前最終確認画面」の3つで、今後は「個人情報の取り扱い」「商品・サービス説明」なども基準に含めていく予定とのことです。

### new Date("wtf")

https://jsdate.wtf/

JavaScriptの日付に関するクイズサイトです。

### Valibotの作者が新しいフォームライブラリを発表

https://github.com/fabian-hiller/formisch

Valibotの作者が新しいフォームライブラリを発表しました。今はSolidとQwikで利用可能です。

### Popular npm linter packages hijacked via phishing to drop malware

https://www.bleepingcomputer.com/news/security/popular-npm-linter-packages-hijacked-via-phishing-to-drop-malware/

eslint-config-prettierを含む複数のnpmパッケージが、フィッシング攻撃により乗っ取られ、マルウェアを仕込まれました。
npnjs[.]com というフィッシングメールからメンテナの認証情報を窃取し、悪意のあるコードを注入したようです。

### tsgolint

https://github.com/typescript-eslint/tsgolint

typescript-eslintによる、tsgoを使ってtype-awareなlint ruleを実装してみたPoCです。

### 　ESLint Plugin Kit

https://github.com/eslint/rewrite/tree/main/packages/plugin-kit

ESLintのプラグイン開発するためのツールキットが公開されました。

### React Compilerのドキュメント更新

https://github.com/reactjs/react.dev/pull/7868

React Compilerのドキュメントがわかりにくく目立たないというフィードバックにより、ドキュメントが更新されました。

### Proposal - Shift Node.js to Annual Major Releases and Shorten LTS Duration

https://github.com/nodejs/Release/issues/1113

Node.jsのメンテナンス期間を一律24ヶ月（最初の12ヶ月はactive + 12ヶ月のセキュリティパッチやバグ修正など）にして、偶数奇数の概念をなくす提案がされています。リリースとメンテナンスの工数削減が背景にあるようです。

## あとがき

JavaScriptの日付クイズは半分も当たらなかった気がします。激ムズです。Next.js v16楽しみですね！
