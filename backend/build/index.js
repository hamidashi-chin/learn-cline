"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("@fastify/cors")); // fastify-cors をインポート
const prisma = new client_1.PrismaClient();
const fastify = (0, fastify_1.default)({
    logger: true // ログを有効にする
});
const port = 3000;
// CORSの設定 (fastify-cors プラグインを使用)
fastify.register(cors_1.default, {
    origin: '*', // または許可するオリジンを指定
});
// 収入・支出データの登録
fastify.post('/transactions', async (request, reply) => {
    const { date, item, amount, type } = request.body; // 型アサーションは一時的なもの
    try {
        const newTransaction = await prisma.transaction.create({
            data: {
                date: new Date(date).toISOString().split('T')[0], // yyyy-mm-dd形式に変換して保存
                item,
                amount: parseInt(amount, 10),
                type: parseInt(type, 10),
            },
        });
        reply.status(201).send(newTransaction);
    }
    catch (error) {
        fastify.log.error('Error creating transaction:', error);
        reply.status(500).send({ error: 'Failed to create transaction' });
    }
});
// 収入・支出データの取得
fastify.get('/transactions', async (request, reply) => {
    try {
        const transactions = await prisma.transaction.findMany({
            orderBy: {
                date: 'asc',
            },
        });
        reply.send(transactions);
    }
    catch (error) {
        fastify.log.error('Error fetching transactions:', error);
        reply.status(500).send({ error: 'Failed to fetch transactions' });
    }
});
// 収入・支出データの更新
fastify.put('/transactions/:id', async (request, reply) => {
    const { id } = request.params; // 型アサーションは一時的なもの
    const { date, item, amount, type } = request.body; // 型アサーションは一時的なもの
    try {
        const updatedTransaction = await prisma.transaction.update({
            where: { id: parseInt(id, 10) },
            data: {
                date: new Date(date).toISOString().split('T')[0], // yyyy-mm-dd形式に変換して保存
                item,
                amount: parseInt(amount, 10),
                type: parseInt(type, 10),
            },
        });
        reply.send(updatedTransaction);
    }
    catch (error) {
        fastify.log.error('Error updating transaction:', error);
        reply.status(500).send({ error: 'Failed to update transaction' });
    }
});
// 収入・支出データの削除
fastify.delete('/transactions/:id', async (request, reply) => {
    const { id } = request.params; // 型アサーションは一時的なもの
    try {
        await prisma.transaction.delete({
            where: { id: parseInt(id, 10) },
        });
        reply.status(204).send();
    }
    catch (error) {
        fastify.log.error('Error deleting transaction:', error);
        reply.status(500).send({ error: 'Failed to delete transaction' });
    }
});
// 日単位、月単位、年単位の集計データ取得
fastify.get('/summary', async (request, reply) => {
    try {
        const transactions = await prisma.transaction.findMany();
        const dailySummary = {};
        const monthlySummary = {};
        const yearlySummary = {};
        transactions.forEach(transaction => {
            const date = transaction.date; // dateはyyyy-mm-dd形式の文字列
            const yearMonth = date.substring(0, 7); // yyyy-mm形式
            const year = date.substring(0, 4); // yyyy形式
            if (!dailySummary[date])
                dailySummary[date] = { income: 0, expense: 0 };
            if (!monthlySummary[yearMonth])
                monthlySummary[yearMonth] = { income: 0, expense: 0 };
            if (!yearlySummary[year])
                yearlySummary[year] = { income: 0, expense: 0 };
            if (transaction.type === 1) { // 収入
                dailySummary[date].income += transaction.amount;
                monthlySummary[yearMonth].income += transaction.amount;
                yearlySummary[year].income += transaction.amount;
            }
            else { // 支出
                dailySummary[date].expense += transaction.amount;
                yearlySummary[year].expense += transaction.amount;
            }
        });
        reply.send({
            daily: dailySummary,
            monthly: monthlySummary,
            yearly: yearlySummary,
        });
    }
    catch (error) {
        fastify.log.error('Error fetching summary:', error);
        reply.status(500).send({ error: 'Failed to fetch summary' });
    }
});
const start = async () => {
    try {
        await fastify.listen({ port });
        console.log(`Backend server running at http://localhost:${port}`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
