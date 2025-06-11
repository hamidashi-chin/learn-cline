# Simple Accounting Backend

TypeScript + Node.js + Fastify + Prisma + SQLiteで構築された簡易出納帳のバックエンドAPIです。

## 技術スタック

- **TypeScript**: 型安全なJavaScript
- **Node.js**: JavaScript実行環境
- **Fastify**: 高速なWebフレームワーク
- **Prisma**: 現代的なORM
- **SQLite**: 軽量なデータベース

## セットアップ

### 1. 依存関係のインストール
```bash
npm install
```

### 2. データベースのセットアップ
```bash
npm run db:migrate
npm run db:generate
```

### 3. 開発サーバーの起動
```bash
npm run dev
```

サーバーは `http://localhost:3000` で起動します。

## API エンドポイント

### ヘルスチェック
- `GET /health` - サーバーの状態確認

### 取引管理
- `GET /api/transactions` - 全取引の取得
- `POST /api/transactions` - 新しい取引の作成
- `PUT /api/transactions/:id` - 取引の更新
- `DELETE /api/transactions/:id` - 取引の削除

### 残高
- `GET /api/balance` - 収入・支出・残高の取得

## データ構造

### Transaction
```typescript
{
  id: number;
  date: Date;
  item: string;
  amount: number;
  type: number; // 1:収入, 2:支出
  createdAt: Date;
  updatedAt: Date;
}
```

## 使用例

### 取引の作成
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-01-01",
    "item": "給与",
    "amount": 300000,
    "type": 1
  }'
```

### 残高の確認
```bash
curl http://localhost:3000/api/balance
```

## 利用可能なスクリプト

- `npm run dev` - 開発サーバーの起動
- `npm run build` - プロダクション用ビルド
- `npm run start` - プロダクションサーバーの起動
- `npm run db:migrate` - データベースマイグレーション
- `npm run db:generate` - Prismaクライアントの生成
- `npm run db:studio` - Prisma Studioの起動

## 開発

### データベースの確認
Prisma Studioを使用してデータベースの内容を確認できます：
```bash
npm run db:studio
```

### 新しいマイグレーション
スキーマを変更した場合：
```bash
npm run db:migrate
