import { createRepository, findManyRepository } from './expenses.repository';
import { CreateExpenseValidator } from './create-expense.validator';

export const findExpensesService = async () => {
	return await findManyRepository();
};

export const createExpenseService = async (data: CreateExpenseValidator) => {
	return await createRepository(data);
};
