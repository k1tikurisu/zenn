---
title: "Next.jsのServer Components（layout.tsx）で現在のURLにアクセスしたい"
emoji: "🥦"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["nextjs"]
publication_name: "cybozu_frontend"
published: false
---

Server Componentsで現在のURL（Pathname）を取得し、値によって表示を変えたい場面はよくあると思う。例えば、ナビゲーションリンクは現在のPathnameに応じて該当リンクを強調させたいし、パンくずリストはPathnameに応じて対応するリンクを表示させたい。これらのコンポーネントは画面共通コンポーネントとして`layout.tsx`に配置したい場面が多い。

しかし、Next.jsの公式の機能では、Server ComponentsでPathnameを取得する機能は提供されていない。

本記事では、Next.jsのServer Components（主に`layout.tsx`）で現在のURLを取得する方法と、公式の推奨方法、なぜ公式の機能で提供されていないのかを解説する。

:::message
本記事は、下記のIssueを解説するものである。
https://github.com/vercel/next.js/issues/43704
:::

## Server ComponentsでPathnameを取得する方法

### Dynamic Segments & Query Parameters

前提として、Dynamic Segmentsや、Query Parametersは下記のようにページコンポーネントで取得することができる。
https://nextjs.org/docs/app/api-reference/file-conventions/page

```tsx:app/blog/[slug]/page.tsx
export default function Page({
  params,
}: {
  params: { slug: string }
}) {
  // /blog/1にアクセスすると、 { slug: '1' }を受け取れる
  return <div>My Post: {params.slug}</div>
}
```

```tsx:app/blog/page.tsx
export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // /blog?slug=1 にアクセスすると、 { slug: '1' }を受け取れる
  return <div>My Post: {searchParams.slug}</div>
}
```

`searchParams`はDynamic APIのため、使用するとDynamic Renderingになってしまうので注意が必要である。

### Pathname

Server ComponentsでPathnameを取得する方法の1つとして、middlewareでheaderに`request.url`をセットし、Server Componentsで`headers()`を用いて参照する方法がある。

https://github.com/vercel/next.js/issues/43704#issuecomment-1411186664

middlewareで`x-url`に`request.url`をセットする。

```ts:middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: Request) {

  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    }
  });
}
```

Server Componentsで`headers()`を呼び、`x-url`の値を取得する。

```tsx:app/page.tsx
import { headers } from 'next/headers';

export default function Page() {
  const headersList = headers();
  // read the custom x-url header
  const header_url = headersList.get('x-url') || "";
}
```

:::message alert
TODO: デメリットの説明
:::

## 公式の推奨方法と実装例

### Client Componentsで取得する

黙ってClient Componentsにしましょう、という方法。Client Componentsでは、`usePathname`Hookを使って現在のPathnameを取得することができる。

### Server Componentsで取得する

Parallel RoutesでDynamic RoutesのCatch-all Segmentsを使うと、現在のPathnameを取得することができる。

```tsx:app/@slot/[...all]/page.tsx
export default function Page({
  params: { all },
}: {
  params: {
    all: string[];
  };
}) {
  // /blog/1にアクセスすると、{ all: ['blog', '1']}が取得できる。
}
```

Parallel Routesにナビゲーションリンクやパンくずリストを配置して、`layout.tsx`で呼び出すことで、Server ComponentsでURLに応じて表示を変える仕様を実現させることができる。

#### パンくずリストの実装例

公式が提供している。

https://github.com/vercel/app-playground/tree/main/app/patterns/breadcrumbs

#### ナビゲーションリンクの実装例

公式にはなかったので自作した。

:::message alert
TODO: 自作する
:::

## なぜ公式の機能で提供されていないのか

:::message alert
TODO: 説明する
:::
