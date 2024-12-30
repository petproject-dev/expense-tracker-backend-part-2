import { db } from '../db/db.service';
import { CreateExpenseType } from './expenses.types';

export const findManyRepository = async () => await db.expenses.findMany();

export const createRepository = async (data: CreateExpenseType) =>
	await db.expenses.create({ data });
