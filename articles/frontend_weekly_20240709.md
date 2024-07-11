---
title: "Chrome 127 betaの公開など: Cybozu Frontend Weekly (2024-07-09号)" # 目立ったニュースを選ぶ
emoji: "👨‍💻" # お好きな絵文字を
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["CybozuFrontendWeekly", "frontend"]
published: false
publication_name: "cybozu_frontend"
---

こんにちは！サイボウズ株式会社フロントエンドエンジニアの[daiki（@k1tikurisu）](https://x.com/k1tikurisu)です。

# はじめに

サイボウズ社内では毎週火曜日にFrontend Weeklyと題し「一週間の間にあったフロントエンドニュースを共有する会」を開催しています。

今回は、2024/07/09のFrontend Weeklyで取り上げた記事や話題を紹介します。

# 取り上げた記事・話題

## React & Codemod Announcement

https://codemod.com/blog/react-announcement

React 19への移行を支援するツール（codemod）が公開されました。例えば、次の移行作業を自動化してくれます。

- `Context.Provider`を`Context`に置き換え
- `forwardRef`の削除
- `useContext`を`use`に置き換え

## next-cache-toolbar

https://github.com/KajSzy/next-cache-toolbar/

Next.jsの[Data Cache](https://nextjs.org/docs/app/building-your-application/caching#data-cache)の中身を視覚的に見れるツールです。

## Diving Deep into Array Index Positions

https://www.kirupa.com/javascript/deep_dive_array_index_positions.htm

配列のインデックス位置についての考察記事です。

配列に不正なインデックス値を入れるとオブジェクトのキーのように扱われるため、配列操作は正確に行うことが大切であると結論づけています。

## VercelがPPRをNodeランタイムにした件からWebフロントエンドとエッジの動向に迫る

https://zenn.dev/sumiren/articles/7886f5079cced0

Xで話題になった、Lee Robinsonの[ポスト](https://twitter.com/leeerob/status/1780705942734331983)について、その背景と本当にNode.jsランタイムの方が速くなるのか、議論ベースでまとめてくださっている記事です。

## Nuxt 2 End-of-Life (EOL)

https://nuxt.com/blog/nuxt2-eol

Nuxt2がEOLになることが発表されました。EOL後もNuxt2を使うユーザのために、HeroDevsからNever-Ending Support (NES)が提供されています。

## Chrome 127 beta

https://developer.chrome.com/blog/chrome-127-beta

Chrome 127のbeta版が公開されました。CSSのフォントサイズ調整（`font-size-adjust`）など、盛りだくさんな内容になっています。

## An origin trial for a new HTML `<permission>` element

https://developer.chrome.com/blog/permission-element-origin-trial

Permission Prompt（Chromeだと左上から出てくる、xxを許可しますか？のやつ）を、permission要素を使って制御できるようにする機能が実験されています。CSSでスタイリングも可能で、今後標準化される予定です。

## State of JavaScript 2023

https://2023.stateofjs.com/

State of JavaScript 2023が公開されました。JavaScript技術の人気度や使用状況の変化がグラフで可視化されています。

## React 19 で変わるアクセシビリティ周りの技術

https://tech.smarthr.jp/entry/2024/06/20/161810

React19で新しく加わる機能がa11yにどういう影響を与えるかを考察した記事です。

## 今後のNext.jsのキャッシュの方針について

https://x.com/leeerob/status/1803824227704877236

今後のNext.jsのキャッシュの方針をまとめたポストです。Next.js 15では、fetchリクエストはデフォルトでキャッシュされなくなりました。

## Reactのドキュメントのロゴを右クリックするとロゴがダウンロードできるようになった

https://github.com/reactjs/react.dev/pull/6986

ドキュメントに記載のロゴを右クリックすると、ロゴをダウンロードできるようになりました。いつでもReactのロゴがゲットできて嬉しいですね。

## Polyfill supply chain attack hits 100K+ sites

https://sansec.io/research/polyfill-supply-chain-attack

ブラウザ互換性の問題を解決するためのJavaScriptライブラリである、Polyfill.ioがマルウェアで汚染されたことを紹介する記事です。代わりとなる安全なフォークライブラリがCloudflareから提供されています。

https://blog.cloudflare.com/polyfill-io-now-available-on-cdnjs-reduce-your-supply-chain-risk

## Sustaining Digital Certificate Security - Entrust Certificate Distrust

https://security.googleblog.com/2024/06/sustaining-digital-certificate-security.html

Entrustの証明書を使ったサービスは11月以降Chromeで開けなくなります。`--test-crs-constraints`フラグで事前に挙動をシミュレートすることができます。

## 新しいバンドラーMaco

https://github.com/umijs/mako

Rustベースのバンドラーで、非常に高速だそうです。

## 新しいブラウザエンジンLadybird

https://ladybird.org/#about

元々はSerenityOS専用だったものが、ブラウザエンジンとして切り離されたようです。

次のJxckさんの記事でも紹介されています。

https://blog.jxck.io/entries/2024-07-05/why-are-new-browsers-required.html

## New to the web platform in June

https://web.dev/blog/web-platform-06-2024?hl=en

6月にWebブラウザに追加された、安定版またはベータ版の機能を紹介する記事です。Firefox 127とChrome 126が安定版になりました。

## JSConf JP 2024

https://jsconf.jp/2024/

JSConf JP 2024のCFP募集がはじまりました。

# あとがき

個人的には、State of JavaScript 2023の[JavaScript Pain Points](https://2023.stateofjs.com/en-US/usage/#top_js_pain_points)でJavaScript周りのきついポイントが紹介されていて面白かったです。
