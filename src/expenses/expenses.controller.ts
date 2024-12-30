import express, { NextFunction, Request, Response } from 'express';
import * as expenseService from './expenses.service';
import validator from '../helpers/middlewares/validator';
import { createExpenseSchema } from './dto/create-expense.dto';

export const expensesController = express.Router();

expensesController.post(
	'/',
	validator(createExpenseSchema),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = req.body;
			const result = await expenseService.create(data);

			res.status(201).send(result);
		} catch (error) {
			next(error);
		}
	},
);

expensesController.get(
	'/',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const limit = Number(req.query.limit) || 10;
			const offset = Number(req.query.offset) || 0;

			const result = await expenseService.findMany({
				take: limit,
				skip: offset,
			});

			res.send(result);
		} catch (error) {
			next(error);
		}
	},
);

expensesController.patch(
	'/:id',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);

			await expenseService.update(id, req.body);

			res.send('ok');
		} catch (error) {
			next(error);
		}
	},
);

expensesController.delete(
	'/:id',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = Number(req.params.id);

			await expenseService.deleteOne(id);

			res.status(204).send('ok');
		} catch (error) {
			next(error);
		}
	},
);
