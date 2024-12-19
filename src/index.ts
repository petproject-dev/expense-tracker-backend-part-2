import express, { Request, Response } from 'express';
import config from './config';
import errorHandler from './helpers/middlewares/errorHandler';
import validator from './helpers/middlewares/validator';
import { createExpenseValidator } from './expenses/create-expense.validator';
import {
	createExpenseController,
	findExpensesController,
} from './expenses/expenses.controller';

const app = express();
app.use(express.json());

app.post(
	'/api/expenses',
	validator(createExpenseValidator),
	createExpenseController.bind(createExpenseController),
);

app.get('/api/expenses', findExpensesController.bind(findExpensesController));

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
