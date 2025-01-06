import db from '../db/db.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

export const create = async (data: CreateExpenseDto) => await db.expenses.create({ data });

export const findMany = async ({
  take,
  skip,
  fromDate,
  toDate,
}: {
  take: number;
  skip: number;
  fromDate?: string;
  toDate?: string;
}) =>
  await db.expenses.findMany({
    take,
    skip,
    where: { date: { gt: fromDate, lt: toDate } },
  });

export const findOne = async (id: number) => await db.expenses.findFirst({ where: { id } });

export const update = async (id: number, data: UpdateExpenseDto) =>
  await db.expenses.update({ where: { id }, data });

export const deleteOne = async (id: number) => await db.expenses.delete({ where: { id } });
