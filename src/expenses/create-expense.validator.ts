import Joi from 'joi';

export type CreateExpenseValidator = {
	amount: number;
	currency: 'USD' | 'EUR';
	description?: string;
	category: string;
};

export const createExpenseValidator = Joi.object<CreateExpenseValidator>({
	amount: Joi.number().required(),

	currency: Joi.string().valid('USD', 'EUR'),

	description: Joi.string().optional(),

	category: Joi.string(),
});
