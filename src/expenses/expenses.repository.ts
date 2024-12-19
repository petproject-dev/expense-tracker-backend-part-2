import { db } from '../db/db.service';
import { CreateExpenseValidator } from './create-expense.validator';

export const findManyRepository = async () => await db.expenses.findMany();

export const createRepository = async (data: CreateExpenseValidator) =>
	await db.expenses.create({ data });
