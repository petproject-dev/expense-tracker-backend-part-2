import * as Yup from 'yup';
import { InferType } from 'yup';

export const updateExpenseSchema = Yup.object().shape({
	name: Yup.string().optional(),
	amount: Yup.number().optional(),
	currency: Yup.string()
		.oneOf(['USD', 'EUR'], 'Currency must be USD or EUR')
		.optional(),
	category: Yup.string().optional(),
	date: Yup.date().optional(),
});

export type UpdateExpenseDto = Readonly<InferType<typeof updateExpenseSchema>>;
