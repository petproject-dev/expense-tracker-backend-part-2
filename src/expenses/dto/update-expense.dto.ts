import * as Yup from 'yup';
import { InferType } from 'yup';

export const updateExpenseSchema = Yup.object().shape({
	amount: Yup.number().optional(),
	currency: Yup.string()
		.oneOf(['USD', 'EUR'], 'Currency must be USD or EUR')
		.optional(),
	description: Yup.string().optional(),
	category: Yup.string().optional(),
});

export type UpdateExpenseDto = Readonly<InferType<typeof updateExpenseSchema>>;
