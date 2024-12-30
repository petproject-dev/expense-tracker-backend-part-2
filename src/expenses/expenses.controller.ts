import express, { NextFunction, Request, Response } from 'express';
import { createExpenseService, findExpensesService } from './expenses.service';
import validator from '../helpers/middlewares/validator';
import { createExpenseSchema } from './dto/create-expense.dto';

export const expensesController = express.Router();

expensesController.post(
	'/',
	validator(createExpenseSchema),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = req.body;
			const result = await createExpenseService(data);

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

			const result = await findExpensesService({
				take: limit,
				skip: offset,
			});

			res.send(result);
		} catch (error) {
			next(error);
		}
	},
);
