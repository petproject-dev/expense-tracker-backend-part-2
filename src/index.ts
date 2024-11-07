import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import config from './config';

const app = express();

const prisma = new PrismaClient();

app.post('/api/expenses', async (req: Request, res: Response) => {
	const expenses = [
		{
			amount: 100,
			currency: 'USD',
			description: 'Bar fee',
			category: 'category 1',
		},
		{
			amount: 10,
			currency: 'EUR',
			description: 'Football fee',
			category: 'category 2',
		},
	];

	await prisma.expenses.createMany({ data: expenses });

	res.send('ok');
});

app.get('/api/expenses', async (req: Request, res: Response) => {
	const result = await prisma.expenses.findMany();

	res.send(result);
});

app.get('/api/ping', (req: Request, res: Response) => {
	res.json({ message: 'pong' });
});

app.listen(config.port, () =>
	console.log(`Server listening on port ${config.port}`),
);
