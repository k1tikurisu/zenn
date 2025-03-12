---
title: "「CLINEに全部賭けろ」など(2025-03-11号)" # 目立ったニュースを選ぶ
emoji: "🤖" # お好きな絵文字を
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["CybozuFrontendWeekly", "frontend"]
published: false
publication_name: "cybozu_frontend"
---

こんにちは！サイボウズ株式会社フロントエンドエンジニアの[daiki（@k1tikurisu）](https://x.com/k1tikurisu)です。

## はじめに

サイボウズ社内では毎週火曜日にFrontend Weeklyと題し「一週間の間にあったフロントエンドニュースを共有する会」を開催しています。

今回は、2025/03/11のFrontend Weeklyで取り上げた記事や話題を紹介します。

## 取り上げた記事・話題

### Prisma 6.4.0

https://github.com/prisma/prisma/releases/tag/6.4.0

Prisma 6.4.0がリリースされました。主な更新内容は次の通りです。

- TypeScriptベースの設定ファイル`prisma.config.ts`をEarly Accessとして導入
- JSONに対して大文字と小文字を区別しない検索ができるように
- CockroachDBのマイグレーション速度の大幅改善

### Deno 2.2: OpenTelemetry, Lint Plugins, node:sqlite

https://deno.com/blog/v2.2

Deno 2.2がリリースされました。主な変更内容は次の通りです。

- OpenTelemetryを組み込みでサポート
- Lintのプラグインシステムの導入とReact/JSX向けの新しいルールの追加
- `node:sqlite`モジュールのサポート
- `deno check`の改善
- `deno lsp`の高速化と機能強化
- `deno task`でワイルドカードが使用できるように
- WebTransportとQUIC APIの実験的サポート
- Node.js/npmの互換性向上

そのほか、パフォーマンスの向上や、TypeScript 5.7とV8 13.4へのアップグレードも含まれています。

## Claude Code概要

https://docs.anthropic.com/ja/docs/agents-and-tools/claude-code/overview

Anthropicから、ターミナルに常駐してコードベースを理解し、自然言語コマンドでコーディングを支援するエージェント型ツール「Claude Code」が発表されました。

Claude Codeの主な機能は次の通りです。

- コードベース全体でのファイル編集とバグ修正
- コードのアーキテクチャとロジックに関する質問への回答
- テスト、リンティング、その他のコマンドの実行と修正
- gitの履歴検索、マージコンフリクトの解決、コミットとPRの作成

また、同時期にリリースされたClaude 3.7 Sonnetは、「ポケモン」のジムリーダーを3人倒せるそうです。

https://gigazine.net/news/20250225-anthropic-claude-3-7-sonnet/

## Speeding up the JavaScript ecosystem - Rust and JavaScript Plugins

https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-11/

これまでRustベースのツールでJavaScriptのプラグインをサポートすることは、ASTのシリアライズ/デシリアライズのコストが高いため避けられてきました。この記事では、Deno Linterなどにすでに導入されている、デシリアライズのコストを削減する新しいアプローチを紹介しています。

## CLINEに全部賭けろ

https://zenn.dev/mizchi/articles/all-in-on-cline

Clineなどのコーディングエージェントが、プログラミングの未来を大きく変えるという予測と、その理由を解説した記事です。従来のCopilotなどとは異なり、CLINEはプログラマがナビゲーターとなり、AIがドライバーとなってコードを書く新しい開発スタイルを実現します。

## Next.js 15.2

https://nextjs.org/blog/next-15-2

Next.js 15.2がリリースされました。主な変更点は次の通りです。

- エラーUIの刷新とスタックトレースの改善
- Turbopackのコンパイル時間短縮とメモリ使用量削減
- React View Transitions APIのExperimentalサポート
- Node.jsミドルウェアのExperimentalサポート

## Vitest Browser Modeを活用してブラウザをモックするコードを削除した話 | PR TIMES 開発者ブログ

https://developers.prtimes.jp/2025/02/21/vitest-browser-mode/

フロントエンドのユニットテストにおいて、Vitestとjsdomを組み合わせていた部分をVitest Browser Modeに置き換えた事例を紹介する記事です。

## 自動テストの世界に、この5年間で起きたこと

https://speakerdeck.com/autifyhq/things-happened-in-5-years-in-the-testing-automation-world

Autifyの末村拓也氏によるDeveloper Summit 2025での発表資料です。この5年間での自動テストを取り巻く環境の変化について解説されています。

自動テストは単なる手動テストの代替ではなく、高速な開発サイクルを支える基盤として位置づけられるようになってきており、そのニーズに応える新たなソリューションの必要性が述べられています。

## WebDriver BiDi Becomes the Default for Cypress with Firefox

https://fxdx.dev/webdriver-bidi-becomes-the-default-for-cypress-in-firefox/

Cypressが、WebDriver BiDiプロトコルを使用したFirefoxの自動化をサポートするようになったことを発表する記事です。

これまでCypressはFirefoxを自動化するためにChrome DevTools Protocol(CDP)を使用していましたが、[Firefox 129以降のCDP非推奨化](https://fxdx.dev/deprecating-cdp-support-in-firefox-embracing-the-future-with-webdriver-bidi/?ref=cypress-io.ghost.io)に伴い、Firefox 135以降ではデフォルトでWebDriver BiDiを使用するようになりました。

## The TypeScript AI framework - Mastra

https://mastra.ai/

TypeScriptベースのAIエージェント開発フレームワーク「Mastra」が公開されました。

YouTubeでの紹介コンテンツも用意されています。

https://www.youtube.com/watch?v=8o_Ejbcw5s8

## Documentation tool of choice for Open UI Design System

https://github.com/openui/design-system/issues/8

Open UIのデザインシステムのドキュメント化ツールについてのIssueです。現時点では、Storybookが有力な選択肢として挙げられています。

## Intent to Prototype: CSS sibling-index() and sibling-count()

https://groups.google.com/a/chromium.org/g/blink-dev/c/qOdmXuip85o/m/my-groups

CSSの新しい関数として`sibling-index()`と`sibling-count()`の実装が提案されました。要素の兄弟要素間での位置や総数に基づいてスタイリングができるようになります。

## あとがき

AIツールがたくさん出てますね！まだClineはさわれていないですが、コーディングはCursorでやっています。
