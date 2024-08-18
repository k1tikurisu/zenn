---
title: "Clipboard APIで非同期処理を含む操作をする際の注意点とその対策"
emoji: "📋"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["javascript", "clipboard", "safari", "chrome", "firefox"]
published: true
publication_name: "cybozu_frontend"
---

:::message
この記事は、[CYBOZU SUMMER BLOG FES '24](https://cybozu.github.io/summer-blog-fes-2024/) (Frontend Stage) DAY 18の記事です。
:::

本記事では、Clipboard APIのブラウザ間での仕様の違いと、非同期処理を含む操作をする際の注意点とその対策をまとめました。

## Clipboard APIとは

[Clipboard API](https://developer.mozilla.org/ja/docs/Web/API/Clipboard_API)は、Webアプリケーションがシステムクリップボードにアクセスするためのインターフェースを提供します。

例えば、`Clipboard.writeText`を使用すると、クリップボードを特定の文字列で上書きすることができます。

```ts
// テキストをクリップボードにコピー
navigator.clipboard.writeText("コピーしたいテキスト").then(() => {
  console.log("コピー成功");
}).catch(err => {
  console.error("コピー失敗:", err);
});
```

Clipboard APIは、現在W3CのWorking Draftとして公開されていますが、主要ブラウザで使用可能です[^1][^2]。

## ブラウザ間での仕様の違い

Clipboard APIは、セキュリティ上の理由から利用に制限があり、その仕様がブラウザ間で異なります。詳細はMDNにも記載があります。

https://developer.mozilla.org/ja/docs/Web/API/Clipboard_API#%E3%82%BB%E3%82%AD%E3%83%A5%E3%83%AA%E3%83%86%E3%82%A3%E3%81%AE%E8%80%83%E6%85%AE

### Chromium系ブラウザ

クリップボードの読み取りには`clipboard-read`権限、書き込みには`clipboard-read`権限またはUser Activation（以降は簡易的にユーザー操作と呼ぶ）が必要です。

例えば、ユーザー操作なしに`Clipboard.writeText`が実行されるページでは、実行された時点で`clipboard-read`権限を要求するPermission Promptが出ます。

![Permission Promptが出ている画像](https://storage.googleapis.com/zenn-user-upload/1e3252d0a3d2-20240818.png)

`clipboard-read`権限が付与されると、以降はユーザー操作なしでもクリップボードにアクセス可能です。

ユーザー操作がトリガーの場合は、`clipboard-read`権限が付与されていなくても書き込みが可能です。例えば次のコードはコピーが成功します。

```js
const button = document.getElementById("copy-button");
// buttonクリック時にコピーしたいテキストをクリップボードにコピーする
button.addEventListener("click", () => {
  navigator.clipboard.writeText("コピーしたいテキスト")
});
```

### SafariとFirefox

SafariとFirefoxでは、`clipboard-read`と`clipboard-write`権限はサポートされていないため、読み書き両方にユーザー操作が必要です。ユーザー操作なしに実行される場合は単にPromiseがrejectされます。

## 非同期処理を含むクリップボード操作の注意点

例えば、ボタン押下時に[fetch API](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API)でリソースを取得し、レスポンスをクリップボードにコピーしたいとします。次のようなコードです。

```js
const button = document.getElementById("copy-button");

button.addEventListener("click", () => {
  fetch("https://example.com/api/v1/")
    .then(response => response.text())
    // fetchの結果をwriteTextに渡す
    .then(text => navigator.clipboard.writeText(text))
});
```

上記コードは、Chrome、Firefoxでは成功しますが、Safariでは失敗します。

> Unhandled Promise Rejection: NotAllowedError: The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.

Safariでは、ユーザー操作の処理方法が他ブラウザと異なるようです（詳細は[WebKitのバグ#222262](https://bugs.webkit.org/show_bug.cgi?id=222262)を参照）。fetch APIに限らず非同期処理のコンテキストでは、クリックイベントハンドラ内でもユーザ操作とみなされずパーミッションエラーになります。

### 対応策1

`ClipboardItem`と`Clipboard.write`を使用することで非同期処理を含むクリップボード操作を行うことができます。

```js
const button = document.getElementById("copy-button");

button.addEventListener("click", () => {
  const clipboardItem = new ClipboardItem({
    "text/plain": fetch("https://example.com/api/v1/")
      .then(response => response.text())
      // Blobオブジェクトをreturnする
      .then((text) => new Blob([text], { type: "text/plain" })),
  })
  navigator.clipboard.write([clipboardItem])
});
```

`ClipboardItem`オブジェクトを作成し、コピーしたい文字列を`Blob`オブジェクトとして渡します。その後、`ClipboardItem`オブジェクトを`Clipboard.write`に配列で渡します。

この方法は、Chrome、Safari、Firefoxでコピーが成功することを確認できました。

### 対応策2

設計自体を変えて、非同期処理とコピー処理を分けてしまう方法です。

```js
const fetchButton = document.getElementById("fetch-button");
const copyButton = document.getElementById("copy-button");
const textDisplay = document.getElementById("text-display");

// データフェッチ後、コピーしたい文字列とコピーボタンを描画する
fetchButton.addEventListener("click", () => {
  fetch("https://example.com/api/v2/")
    .then((response) => response.text())
    .then((text) => {
      // コピーしたい文字列をtextDisplay内に描画する
      textDisplay.textContent = text;
      copyButton.style.display = "block";
  });
});

// textDisplay内に表示される文字列をコピーする
copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(textDisplay.innerText)
    .then(alert("クリップボードにコピーしました！"));
});
```

`Clipboard.writeText`を非同期処理のコンテキスト外で実行するため、ユーザ操作としてコピーできます。

## おわりに

対応策2の方は、ユーザがクリップボードにコピーされる文字列を認識できる点でベターな方法かなと思います。
CodePenを埋め込む方がわかりやすいので迷いましたが、例にfetch APIを使いづらくなるのでやめました。

[^1]: Clipboard API and events: https://www.w3.org/TR/clipboard-apis/
[^2]: Can I Use: https://caniuse.com/?search=Clipboard
