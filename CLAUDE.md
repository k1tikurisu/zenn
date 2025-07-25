# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

このリポジトリは、Zenn CLI を使用した技術記事・書籍執筆プロジェクトです。Zenn は日本の技術情報共有プラットフォームで、Markdown形式で記事や書籍を執筆できます。

## 一般的なコマンド

### 開発用コマンド
- `yarn dev` - Zennのプレビューサーバーを起動（記事をローカルで確認）
- `yarn new` - 新しい記事を作成
- `yarn install` - 依存関係のインストール

### パッケージマネージャー
このプロジェクトはYarn 4.5.2を使用しています。

## プロジェクト構造

### 記事（articles/）
- 各記事は独立したMarkdownファイル
- ファイル名は記事のスラッグになる
- frontmatterで記事のメタデータを管理：
  - title: 記事タイトル
  - emoji: 記事を表す絵文字
  - type: "tech"（技術記事）または "idea"（アイデア）
  - topics: タグの配列
  - published: 公開状態
  - publication_name: 公開先のPublication名（オプション）

#### Frontend Weekly記事
`frontend_weekly_YYYYMMDD.md` 形式のファイルは、サイボウズ社内で毎週火曜日に開催される「Frontend Weekly」の内容をまとめた記事です。

**記事の特徴：**
- ファイル名フォーマット: `frontend_weekly_YYYYMMDD.md`（YYYYMMDDは開催日）
- publication_name: `"cybozu_frontend"`（Cybozu Frontend Organization で公開）
- topics: 必ず `["CybozuFrontendWeekly", "frontend"]` を含む
- 記事構成:
  1. 冒頭: 執筆者紹介（サイボウズ株式会社フロントエンドエンジニア）
  2. はじめに: Frontend Weeklyの説明（毎週火曜日開催）
  3. 取り上げた記事・話題: その週のフロントエンドニュースを複数紹介
     - 各トピックは`### タイトル`で区切る
     - リンクとその内容の要約を記載

**タイトルの付け方：**
- 形式: `「最も注目すべきニュース」など(YYYY-MM-DD号)`
- その週の最も目立ったニュースをタイトルに含める

### 書籍（books/）
- 各書籍は独自のディレクトリを持つ
- `config.yaml` で書籍の設定を管理
- チャプターはMarkdownファイルとして作成
- config.yamlのchaptersにチャプターの順番を定義

## Zenn CLI特有の注意事項

- 記事の新規作成時は `yarn new` を使用すると、適切なfrontmatterが自動生成される
- プレビューサーバーはホットリロードに対応しており、ファイル保存時に自動更新される
- 画像は`/images/`ディレクトリに配置し、相対パスで参照する