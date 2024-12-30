import * as expenseRepository from './expenses.repository';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import Exception from '../helpers/Exception';

export const create = (data: CreateExpenseDto) => {
	return expenseRepository.create(data);
};

export const findMany = ({ take, skip }: { take: number; skip: number }) => {
	return expenseRepository.findMany({ take, skip });
};

export const update = async (id: number, data: UpdateExpenseDto) => {
	const record = await expenseRepository.findOne(id);

	if (!record) {
		throw new Exception(404, 'Expense not found');
	}

	return expenseRepository.update(id, data);
};

export const deleteOne = async (id: number) => {
	const record = await expenseRepository.findOne(id);

	if (!record) {
		throw new Exception(404, 'Expense not found');
	}

	return expenseRepository.deleteOne(id);
};
