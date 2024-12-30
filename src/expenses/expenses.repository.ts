import { db } from '../db/db.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

export const create = async (data: CreateExpenseDto) =>
	await db.expenses.create({ data });

export const findMany = async ({
	take,
	skip,
}: {
	take: number;
	skip: number;
}) => await db.expenses.findMany({ take, skip });

export const findOne = async (id: number) =>
	await db.expenses.findFirst({ where: { id } });

export const update = async (id: number, data: UpdateExpenseDto) =>
	await db.expenses.update({ where: { id }, data });

export const deleteOne = async (id: number) =>
	await db.expenses.delete({ where: { id } });
