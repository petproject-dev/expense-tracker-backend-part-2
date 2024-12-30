import { createRepository, findManyRepository } from './expenses.repository';
import { CreateExpenseDto } from './dto/create-expense.dto';

export const findExpensesService = async () => {
	return await findManyRepository();
};

export const createExpenseService = async (data: CreateExpenseDto) => {
	return await createRepository(data);
};
