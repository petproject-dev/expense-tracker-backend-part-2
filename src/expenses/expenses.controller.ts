import { NextFunction, Request, Response } from 'express';
import { createExpenseService, findExpensesService } from './expenses.service';

export const createExpenseController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const data = req.body;
		const result = await createExpenseService(data);

		res.status(201).send(result);
	} catch (error) {
		next(error);
	}
};

export const findExpensesController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await findExpensesService();

		res.send(result);
	} catch (error) {
		next(error);
	}
};
