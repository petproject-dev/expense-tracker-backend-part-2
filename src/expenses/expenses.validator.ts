import Joi from 'joi';
import { CreateExpenseType } from './expenses.types';

export const expensesValidator = Joi.object<CreateExpenseType>({
	amount: Joi.number().required(),
	currency: Joi.string().valid('USD', 'EUR'),
	description: Joi.string().optional(),
	category: Joi.string(),
});
