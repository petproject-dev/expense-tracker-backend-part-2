import * as Yup from 'yup';
import { InferType } from 'yup';

export const createExpenseSchema = Yup.object().shape({
  name: Yup.string().required(),
  amount: Yup.number().required(),
  currency: Yup.string().oneOf(['USD', 'EUR'], 'Currency must be USD or EUR').required(),
  category: Yup.string().required(),
  date: Yup.date().required(),
});

export type CreateExpenseDto = Readonly<InferType<typeof createExpenseSchema>>;
