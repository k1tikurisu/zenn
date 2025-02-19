---
title: "TypeScript 5.8 RCの公開など(2025-02-18号)" # 目立ったニュースを選ぶ
emoji: "🫧" # お好きな絵文字を
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["CybozuFrontendWeekly", "frontend"]
published: false
publication_name: "cybozu_frontend"
---

こんにちは！サイボウズ株式会社フロントエンドエンジニアの[daiki（@k1tikurisu）](https://x.com/k1tikurisu)です。

## はじめに

サイボウズ社内では毎週火曜日にFrontend Weeklyと題し「一週間の間にあったフロントエンドニュースを共有する会」を開催しています。

今回は、2025/02/18のFrontend Weeklyで取り上げた記事や話題を紹介します。

## 取り上げた記事・話題

### So, you want to push a web platform feature?

https://blog.yoav.ws/posts/so_you_want_to_push_a_web_platform_feature/

Yoav Weiss（[@yoavweiss](https://x.com/yoavweiss)）氏は、ブラウザへの機能実装に関心のある開発者向けに包括的なガイドを公開しました。記事では、ChromiumやWebKitへの貢献方法について、具体的な手順や注意点が解説されています。

### 「Next.jsの考え方」のv15対応改訂

https://zenn.dev/akfm/books/nextjs-basic-principle

あっきー（[@akfm_sato](https://x.com/akfm_sato)）氏による「Next.jsの考え方」がNext.js v15に対応しました。
v15で行われた破壊的変更や機能追加の取り込みに加え、Dynamic IOについて解説する章を追加しています。

### Intent to ship: Customizable select

https://groups.google.com/a/chromium.org/g/blink-dev/c/kN5LTzuTLVs/m/6HqTsmk3EQAJ

Chromeチームは長年の開発を経て、カスタマイズ可能な`<select>`要素の実装をChrome 134でリリースする計画を発表しました。
詳しい内容は次の記事が参考になります。

https://blog.sakupi01.com/dev/articles/customizable-select-element-parser-relaxation

### kermanx/simple_ts: The simple way to resolve/infer TypeScript types. Useful to type-aware linting in Rust.

https://github.com/KermanX/simple_ts

TypeScriptの型推論をRustで実装する新しいプロジェクトです。
型チェックやLSPなどは実装せず、型推論に特化することで、oxcのType Aware Lintingのサポートや高速なDTSエミッターの実現を目指しています。

### Tailwind CSS v4.0

https://tailwindcss.com/blog/tailwindcss-v4

Tailwind CSS v4.0がリリースされました。
このリリースには新しい高性能なビルドエンジンの導入や、Cascade LayersやCustom propertiesなどCSSのモダンな機能の採用、シンプルなインストールやCSSで完結する設定などが含まれています。

### Everything You Need to Know About Node.js Type Stripping

https://satanacchio.hashnode.dev/everything-you-need-to-know-about-nodejs-type-stripping

Node.js v23.6.0から実験的機能として導入されたType Strippingについて、その背景や技術的詳細が解説されています。

### Vercel Remote Cache is now free

https://turbo.build/blog/free-vercel-remote-cache

Turborepoの機能の一つであるRemote Cachingが、Vercelと連携している全てのTurborepoプロジェクトで無料で利用できるようになりました。

### TypeScript 5.8のerasableSyntaxOnlyフラグ。enumやnamespaceが消える日が来た

https://zenn.dev/ubie_dev/articles/ts-58-erasable-syntax-only

TypeScript 5.8で導入される`erasableSyntaxOnly`フラグについて解説している記事です。

### Announcing TypeScript 5.8 RC - TypeScript

https://devblogs.microsoft.com/typescript/announcing-typescript-5-8-rc/

TypeScript 5.8のRC版が公開されました。一部機能を抜粋します。

- Granular Checks for Branches in Return Expressions
  - return文内の条件分岐に対して、より厳密な型チェックが行われるように
- The `--erasableSyntaxOnly` Option
  - TypeScript固有の構文（enum、namespaceなど）をエラーにするオプション

そのほか、プログラムの読み込みと更新の最適化によるパフォーマンスの向上などが含まれています。

### Move on to ESM-only

https://antfu.me/posts/move-on-to-esm-only

Anthony Fu（[@antfu7](https://x.com/antfu7)）氏が、ESMのみのパッケージ配布へ移行するタイミングについて考察した記事を公開しました。ESM/CJSのデュアルフォーマット配布を推奨していた3年前と比べ、ツールやエコシステムの進化により、ESMのみの配布を推奨する立場に変化したとのことです。

## あとがき

TypeScriptのキャッチアップは引き続きやっていきたいですね！
