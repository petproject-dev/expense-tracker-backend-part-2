import Joi from 'joi';

const createExpense = Joi.object({
	amount: Joi.number().required(),

	currency: Joi.string().valid('USD', 'EUR'),

	description: Joi.string().optional(),

	category: Joi.string(),
});

export default createExpense;
