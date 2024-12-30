import * as Yup from 'yup';
import { InferType } from 'yup';

export const createExpenseSchema = Yup.object().shape({
	amount: Yup.number().required(),
	currency: Yup.string()
		.oneOf(['USD', 'EUR'], 'Currency must be USD or EUR')
		.required(),
	description: Yup.string().optional(),
	category: Yup.string().required(),
});

export type CreateExpenseDto = Readonly<InferType<typeof createExpenseSchema>>;
