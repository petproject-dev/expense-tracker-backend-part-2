import { createRepository, findManyRepository } from './expenses.repository';
import { CreateExpenseDto } from './dto/create-expense.dto';

export const findExpensesService = async ({
	take,
	skip,
}: {
	take: number;
	skip: number;
}) => {
	return await findManyRepository({ take, skip });
};

export const createExpenseService = async (data: CreateExpenseDto) => {
	return await createRepository(data);
};
