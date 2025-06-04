# 簡易出納帳の仕様

udemy教材にてclienの勉強、gemini-2.0-flash-thinking-exp-1219のAPIにて実装検証

## 構成
- 技術スタック
- 画面項目仕様
- テーブル設計書

## 技術スタック
### バックエンド
- 言語：TypeScript / Node.js
- フレームワーク：fastify
- ORM：Prisma
- DB：PostgreSQL

## テーブル設計

| 物理名     | 論理名     | 型       | 桁数 | NOT NULL | デフォルト値 | primary key | auto increment | 備考            |
| ---------- | ---------- | -------- | ---: | :------: | ------------ | :---------: | :------------: | --------------- |
| id         | id         | int      |      |    1     |              |      1      |       1        |                 |
| date       | 日付       | date     |      |    1     |              |             |                |                 |
| item       | 項目       | string   |  255 |    1     |              |             |                |                 |
| amount     | 金額       | int      |      |    1     | 0            |             |                |                 |
| type       | 種別       | tinyint  |    4 |    1     |              |             |                | 1:収入, 2: 支出 |
| created_at | 作成日時   | datetime |      |    1     |              |             |                |                 |
| updated_at | 最終更新日 | datetime |      |    1     |              |             |                |                 |

