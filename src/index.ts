import express, { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import config from './config';
import Database from 'better-sqlite3';

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

const db = new Database('dev.db', { verbose: console.log });

db.exec(
	`CREATE TABLE IF NOT EXISTS expenses (
	id INTEGER,
	amount INTEGER,
	currency TEXT,
	description TEXT,
	category TEXT,
	created_at INTEGER,
	updated_at INTEGER,
	PRIMARY KEY(id)
)`,
);

app.post('/api/expenses', (req: Request, res: Response) => {
	const insert = db.prepare(
		'INSERT INTO expenses (amount, currency, description, category, created_at, updated_at) VALUES (@amount, @currency, @description, @category, @created_at, @updated_at)',
	);
	const insertMany = db.transaction((cats) => {
		for (const cat of cats) insert.run(cat);
	});

	insertMany([
		{
			amount: 100,
			currency: 'USD',
			description: 'Bar fee',
			category: 'category 1',
			created_at: Date.now(),
			updated_at: Date.now(),
		},
		{
			amount: 10,
			currency: 'EUR',
			description: 'Football fee',
			category: 'category 2',
			created_at: Date.now(),
			updated_at: Date.now(),
		},
	]);

	res.send('ok');
});

app.get('/api/expenses', (req: Request, res: Response) => {
	const result = db.prepare('SELECT * FROM expenses').all();

	res.send(result);
});

app.get('/api/ping', (req: Request, res: Response) => {
	res.json({ message: 'pong' });
});

app.listen(config.port, () =>
	console.log(`Server listening on port ${config.port}`),
);
