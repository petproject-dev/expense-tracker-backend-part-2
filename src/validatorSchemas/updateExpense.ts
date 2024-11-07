import Joi from 'joi';

const updateExpense = Joi.object({
	amount: Joi.number().required().optional(),

	currency: Joi.string().valid('USD', 'EUR').optional(),

	description: Joi.string().optional(),

	category: Joi.string().optional(),
});

export default updateExpense;
