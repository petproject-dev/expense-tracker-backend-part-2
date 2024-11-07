import express, { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import config from './config';
import errorHandler from './middlewares/errorHandler';
import validator from './middlewares/validator';
import createExpense from './validatorSchemas/createExpense';
import Exception from './common/Exception';
import updateExpense from './validatorSchemas/updateExpense';

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
			const limit = Number(req.query.limit) || 10;
			const offset = Number(req.query.offset) || 0;

			const result = await prisma.expenses.findMany({
				take: limit,
				skip: offset,
			});

			res.send(result);
		} catch (error) {
			next(error);
		}
	},
);

app.get(
	'/api/expenses/:id',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);

			if (Number.isNaN(id)) {
				throw new Exception(404, 'Expense not found');
			}

			const result = await prisma.expenses.findFirst({ where: { id } });

			if (!result) {
				throw new Exception(404, 'Expense not found');
			}

			res.send(result);
		} catch (error) {
			next(error);
		}
	},
);

app.patch(
	'/api/expenses/:id',
	validator(updateExpense),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);

			if (Number.isNaN(id)) {
				throw new Exception(404, 'Expense not found');
			}

			const data = req.body;

			await prisma.expenses.update({ data, where: { id } });

			res.send('ok');
		} catch (error) {
			next(error);
		}
	},
);

app.delete(
	'/api/expenses/:id',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);

			if (Number.isNaN(id)) {
				throw new Exception(404, 'Expense not found');
			}

			const record = await prisma.expenses.findFirst({ where: { id } });

			if (!record) {
				throw new Exception(404, 'Expense not found');
			}

			await prisma.expenses.delete({ where: { id } });

			res.status(204).send('ok');
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
