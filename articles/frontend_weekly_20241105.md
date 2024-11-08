---
title: "Next.jsのdynamicIOなど: Cybozu Frontend Weekly (2024-11-05号)" # 目立ったニュースを選ぶ
emoji: "📰" # お好きな絵文字を
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["CybozuFrontendWeekly", "frontend"]
published: true
publication_name: "cybozu_frontend"
---

こんにちは！サイボウズ株式会社フロントエンドエンジニアの[daiki（@k1tikurisu）](https://x.com/k1tikurisu)です。

## はじめに

サイボウズ社内では毎週火曜日にFrontend Weeklyと題し「一週間の間にあったフロントエンドニュースを共有する会」を開催しています。

今回は、2024/11/05のFrontend Weeklyで取り上げた記事や話題を紹介します。

## 取り上げた記事・話題

### Add `connection()` as a new dynamic API by gnoff · Pull Request #69949 · vercel/next.js

https://github.com/vercel/next.js/pull/69949

`unstable_noStore()`の代わりとなる新しいAPIである、`connection()`を導入するPRです。

`connection()`は、Dynamic APIを使用しないコンポーネントでも、実行時に動的にレンダリングしたい場合に使用します。通常`Math.random()`や`new Date()`のような外部情報にアクセスする場合に役立ちます。

### Intl.DurationFormatの最大値を規定する仕様について

https://sosukesuzuki.dev/posts/intl-durationformat-limits/

`Intl.DurationFormat`における最大値の仕様とJavaScriptCoreでの実装について解説している記事です。

`Intl.DurationFormat`は、ロケール情報に応じて経過時間をフォーマットするAPIで、2023年10月にステージ3に到達し、単位ごとの最大値が規定されました。JavaScriptCoreへの実装では、浮動小数点数（double）を使うと、計算に丸め誤差が生じ、正確な値を計算できない問題がありました。このため、浮動小数点ではなくナノ秒を基準とした整数表現で実装し、大きな数値にも対応できるInt128型を使用して正確な計算を実現しています。

### How should `<selectedoption>` work? - JakeArchibald.com

https://jakearchibald.com/2024/how-should-selectedoption-work/

`<selectedoption>`要素の仕様についての記事です。

`<selectedoption>`には選択された`<option>`の内容が複製されます。これまで、選択後に非同期処理などで`<option>`が変更された場合の反映方法は未定義でしたが、フィードバックにより、必要に応じてリセットメソッドを使って反映するという仕様になりました。

### Container Queries/祖先要素に応じたCSSの切り替え ［CSS Modern Features no.2］ | gihyo.jp

https://gihyo.jp/article/2024/10/ride-modern-frontend-02

Container Queriesの概要と、その活用方法について解説する記事です。

Container Queriesは、祖先要素として存在するコンテナのスタイルに基づいてCSSを適用する機能です。`@container`で宣言し、ビューポートではなく、画面の特定の範囲を「コンテナ」として定義し、コンテナのスタイルに応じたスタイル変更が可能です。`container-name`を使うとコンテナを明示的に指定でき、ネストした構造でも安定したスタイル適用が可能となっています。

### Chrome 131 beta

https://developer.chrome.com/blog/chrome-131-beta

Chrome 131のベータ版がリリースされました。一部機能を抜粋します。

- CSS
  - Anchor Positioningの有効範囲を制限する`anchor-scope`プロパティの追加
  - `font-variant-emoji`プロパティにより、絵文字のカラーとモノクロを切り替えることができるように
  - `<details>`と`<summary>`要素の展開・折りたたみ部分のコンテナをスタイリングするための`::details-content`擬似要素を追加
- Web API
  - ブラウザから直接TCP・UDPで送受信可能にするDirect Sockets APIが、[Isolated Web Apps](https://github.com/WICG/isolated-web-apps/blob/main/README.md)から外部ネットワーク機器に通信を確立できるように
- New origin trials
  - 入力テキストを要約してくれるSummarizer APIの追加

その他にも、たくさんの機能追加・変更が入っています。

### 　Our Journey with Caching | Next.js

https://nextjs.org/blog/our-journey-with-caching

Next.jsで実験段階の新しいキャッシュモードである、`dynamicIO`について紹介する記事です。

`<Suspense>`でラップすることで動的なデータフェッチとストリーミングを行い、`use cache`ディレクティブを使用することで静的なコンテンツのキャッシュをします。両方を組み合わせることも可能で、`cacheTag`や`cacheLife`など、細かいキャッシュの制御も可能です。

### All about VoidZero - The Interview with Evan You

https://youtu.be/33ex2A04b7g?si=S0kbjnp6LWC5yM70

JSツールチェーンの統一を目指すVoidZeroの設立について、Evan You氏にインタビューするYouTube動画です。

動画内では、VoidZeroは実は昨年に設立されていたことや、長期的なマネタイズを考えるより、まずはJSツールチェーンを統一しメリットを開発者に提供することでファンを増やしていくことを考えている点などについて触れられています。

### 　How Microsoft Edge Is Replacing React With Web Components - The New Stack

https://thenewstack.io/how-microsoft-edge-is-replacing-react-with-web-components/

MicrosoftのEdgeチームが進めている、ReactベースのUIコンポーネントをWebComponentsに置き換えるプロジェクト「WebUI 2.0」の、プロジェクト発足の経緯や現在の状況についての記事です。

発足した主な理由は、既存のReact実装が特に低スペックマシンでパフォーマンスの問題を引き起こしていたためです。ローカルアプリケーションでも起動に数秒かかるなどの問題が発生していました。チームは2024年末までに約50%のReactベースUIをWebComponentsに移行することを目指しています。

### Announcing v3 | Chakra UI

https://www.chakra-ui.com/blog/00-announcing-v3

Chakra UIのv3がリリースされました。v3は、パフォーマンス、コンポーネント間の一貫性を向上させるため、完全に書き直されました。概要は次のとおりです。

- ヘッドレスUIライブラリであるArk UIとPanda CSSのAPIを組み合わせ、Park UIをデザインシステムとして使用
  - ほとんどのコンポーネントを1から再設計し、デザイントークンを使用するように
- カラーパレットごとに7つのセマンティックトークンを提供
- snippetsコマンドで、プロジェクトにChakraのコンポーネントを配置できるように
  - `shadcn/ui`と同様の体験です
- 実行時のパフォーマンスを向上
- ArkUIから新しいコンポーネントを追加
- かなりの数のモジュールを削除し、多く使われているエコシステムを採用
- v3ではEmotionを維持
  - Brakingを減らすためで、のちに段階的に処理される

### Turborepo 2.2

https://turbo.build/blog/turbo-2-2-0

Turborepoの2.2がリリースされました。主な変更点を抜粋します。

- Repository queriesをexperimentalで提供
  - Turborepoのリポジトリに対してGraphQLを実行できるturbo queryを導入
- ビルド高速化のためのキャッシュの改善
- `--affected`フラグを使用してGitHub Actionsでも変更されたパッケージを自動でフィルタできるように

## あとがき

Turbo/SWC vs Vite/Rolldown・OXCみたいな構図になってきているなーと感じますが、今後のJSツールチェーンはどうなっていくでしょうか。
