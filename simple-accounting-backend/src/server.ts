import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const server = Fastify({
  logger: true
});

// CORS設定
server.register(cors, {
  origin: true
});

// ヘルスチェックエンドポイント
server.get('/health', async (request, reply) => {
  return { status: 'OK', timestamp: new Date().toISOString() };
});

// 全取引を取得
server.get('/api/transactions', async (request, reply) => {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { date: 'desc' }
    });
    return transactions;
  } catch (error) {
    reply.code(500).send({ error: 'Failed to fetch transactions' });
  }
});

// 取引を作成
server.post<{
  Body: {
    date: string;
    item: string;
    amount: number;
    type: number;
  }
}>('/api/transactions', async (request, reply) => {
  try {
    const { date, item, amount, type } = request.body;
    
    const transaction = await prisma.transaction.create({
      data: {
        date: new Date(date),
        item,
        amount,
        type
      }
    });
    
    reply.code(201).send(transaction);
  } catch (error) {
    reply.code(500).send({ error: 'Failed to create transaction' });
  }
});

// 取引を更新
server.put<{
  Params: { id: string };
  Body: {
    date?: string;
    item?: string;
    amount?: number;
    type?: number;
  }
}>('/api/transactions/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    const updateData = request.body;
    
    const data: any = {};
    if (updateData.date) {
      data.date = new Date(updateData.date);
    }
    if (updateData.item !== undefined) {
      data.item = updateData.item;
    }
    if (updateData.amount !== undefined) {
      data.amount = updateData.amount;
    }
    if (updateData.type !== undefined) {
      data.type = updateData.type;
    }
    
    const transaction = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data
    });
    
    return transaction;
  } catch (error) {
    reply.code(500).send({ error: 'Failed to update transaction' });
  }
});

// 取引を削除
server.delete<{
  Params: { id: string };
}>('/api/transactions/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    
    await prisma.transaction.delete({
      where: { id: parseInt(id) }
    });
    
    reply.code(204).send();
  } catch (error) {
    reply.code(500).send({ error: 'Failed to delete transaction' });
  }
});

// 残高を取得
server.get('/api/balance', async (request, reply) => {
  try {
    const transactions = await prisma.transaction.findMany();
    
    const income = transactions
      .filter((t: any) => t.type === 1) // 1:収入
      .reduce((sum: number, t: any) => sum + t.amount, 0);
      
    const expense = transactions
      .filter((t: any) => t.type === 2) // 2:支出
      .reduce((sum: number, t: any) => sum + t.amount, 0);
    
    return {
      income,
      expense,
      balance: income - expense
    };
  } catch (error) {
    reply.code(500).send({ error: 'Failed to calculate balance' });
  }
});

const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Server is running on http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

start();
