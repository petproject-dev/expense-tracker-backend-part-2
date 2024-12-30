import { createRepository, findManyRepository } from './expenses.repository';
import { CreateExpenseType } from './expenses.types';

export const findExpensesService = async () => {
	return await findManyRepository();
};

export const createExpenseService = async (data: CreateExpenseType) => {
	return await createRepository(data);
};
