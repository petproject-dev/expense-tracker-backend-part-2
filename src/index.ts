import express, { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import config from './config';
import errorHandler from './middlewares/errorHandler';
import validator from './middlewares/validator';
import createExpense from './validatorSchemas/createExpense';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.post(
	'/api/expenses',
	validator(createExpense),
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

app.use(errorHandler);
app.use('*', (req: Request, res: Response) => {
	res.status(404).send('Page not found');
});

app.listen(config.port, () =>
	console.log(`Server listening on port ${config.port}`),
);
