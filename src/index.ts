import express, { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import config from './config';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.post(
	'/api/expenses',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = req.body;
			await prisma.expenses.createMany({ data });

			res.status(201).send('ok');
		} catch (error) {
			next(error);
		}
	},
);

app.get(
	'/api/expenses',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = await prisma.expenses.findMany();

			res.send(result);
		} catch (error) {
			next(error);
		}
	},
);

app.get('/api/ping', (req: Request, res: Response) => {
	res.json({ message: 'pong' });
});

app.listen(config.port, () =>
	console.log(`Server listening on port ${config.port}`),
);
