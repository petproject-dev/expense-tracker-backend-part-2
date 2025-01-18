import * as expenseRepository from './expenses.repository';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import Exception from '../helpers/Exception';
import { logger } from '../helpers/Logger';

export const create = (data: CreateExpenseDto) => {
  return expenseRepository.create(data);
};

export const findOne = async (id: number) => {
  const result = await expenseRepository.findOne(id);

  if (!result) {
    logger.warn(`Expense not found. Id: ${id}`);
    throw new Exception(404, 'Expense not found');
  }

  return result;
};

export const findMany = ({
  take,
  skip,
  fromDate,
  toDate,
}: {
  take: number;
  skip: number;
  fromDate?: string;
  toDate?: string;
}) => {
  return expenseRepository.findMany({ take, skip, fromDate, toDate });
};

export const update = async (id: number, data: UpdateExpenseDto) => {
  const record = await expenseRepository.findOne(id);
  if (!record) {
    logger.warn(`Expense not found. Id: ${id}`);
    throw new Exception(404, 'Expense not found');
  }

  return expenseRepository.update(id, data);
};

export const deleteOne = async (id: number) => {
  const record = await expenseRepository.findOne(id);

  if (!record) {
    logger.warn(`Expense not found. Id: ${id}`);
    throw new Exception(404, 'Expense not found');
  }

  return expenseRepository.deleteOne(id);
};
