import { db } from '../db/db.service';
import { CreateExpenseDto } from './dto/create-expense.dto';

export const findManyRepository = async () => await db.expenses.findMany();

export const createRepository = async (data: CreateExpenseDto) =>
	await db.expenses.create({ data });
