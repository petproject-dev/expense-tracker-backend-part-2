import express, { NextFunction, Request, Response } from 'express';
import * as expenseService from './expenses.service';
import validator from '../helpers/middlewares/validator';
import { createExpenseSchema } from './dto/create-expense.dto';
import { logger } from '../helpers/Logger';
import { parseDate } from '../helpers/dateUtils';
import { updateExpenseSchema } from './dto/update-expense.dto';

export const expensesController = express.Router();

expensesController.post(
  '/',
  validator(createExpenseSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await expenseService.create(data);

      logger.log(`Expense created. Id: ${result.id}`);
      res.status(201).json(result.id);
    } catch (error) {
      next(error);
    }
  },
);

expensesController.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;

    const fromDate = parseDate(req.query.fromDate, true);
    const toDate = parseDate(req.query.toDate);

    const result = await expenseService.findMany({
      take: limit,
      skip: offset,
      fromDate,
      toDate,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
});

expensesController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const result = await expenseService.findOne(id);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

expensesController.patch(
  '/:id',
  validator(updateExpenseSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      const result = await expenseService.update(id, req.body);
      logger.log(`Expense updated. Id: ${result.id}`);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
);

expensesController.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    await expenseService.deleteOne(id);
    logger.log(`Expense deleted. Id: ${id}`);

    res.status(204).json();
  } catch (error) {
    next(error);
  }
});
