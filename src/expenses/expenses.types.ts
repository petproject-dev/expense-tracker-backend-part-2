import { createExpenseValidator } from './create-expense.validator';
import * as Joi from 'joi';

export type ExpensesType = Joi.Schema<typeof createExpenseValidator>;
