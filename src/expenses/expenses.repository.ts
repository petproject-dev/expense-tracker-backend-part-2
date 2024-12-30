import { db } from '../db/db.service';
import { CreateExpenseDto } from './dto/create-expense.dto';

export const findManyRepository = async ({
	take,
	skip,
}: {
	take: number;
	skip: number;
}) => await db.expenses.findMany({ take, skip });

export const createRepository = async (data: CreateExpenseDto) =>
	await db.expenses.create({ data });
