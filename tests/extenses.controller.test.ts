import request from 'supertest';
import { app, init } from '../src/app';
import { dbMock } from '../singleton';
import { logger } from '../src/helpers/Logger';

jest.mock('../src/helpers/Logger');

const parseDate = (date: string) => {
  return new Date(date + 'T00:00:00.000Z');
};

const expensesList = [
  {
    id: 1,
    name: 'Lunch',
    amount: 100,
    currency: 'USD',
    category: 'Food',
    date: parseDate('2024-10-23'),
  },
  {
    id: 2,
    name: 'Lunch',
    amount: 20,
    currency: 'USD',
    category: 'Food',
    date: parseDate('2024-10-24'),
  },
];

describe('Expenses Controller', () => {
  beforeAll(() => {
    init();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('POST /api/expenses', () => {
    it('should create an expense and return the id', async () => {
      const { id, ...newExpense } = expensesList[0];

      const createdExpense = {
        id,
        ...newExpense,
      };
      dbMock.expenses.create.mockResolvedValue(createdExpense);

      const response = await request(app).post('/api/expenses').send(newExpense);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdExpense.id);
      expect(logger.log).toHaveBeenCalled();
    });

    it('should return 400 if validation fails', async () => {
      const invalidExpense = { amount: 'invalid' };

      const response = await request(app).post('/api/expenses').send(invalidExpense);

      expect(response.status).toBe(400);
      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe('GET /api/expenses', () => {
    it('should return a list of expenses', async () => {
      const expenses = expensesList;
      dbMock.expenses.findMany.mockResolvedValue(expenses);

      const response = await request(app).get('/api/expenses');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expenses.map((expense) => ({ ...expense, date: expense.date.toISOString() })),
      );
    });

    it('should return a list of expenses with query params', async () => {
      const expenses = expensesList;
      dbMock.expenses.findMany.mockResolvedValue(expenses);
      const query = {
        limit: 2,
        offset: 0,
        fromDate: '2024-10-08',
        toDate: '2024-10-10',
      };

      const response = await request(app).get('/api/expenses').query(query);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expenses.map((expense) => ({ ...expense, date: expense.date.toISOString() })),
      );
      expect(dbMock.expenses.findMany).toHaveBeenCalledWith({
        skip: query.offset,
        take: query.limit,
        where: {
          date: {
            gt: parseDate(query.fromDate).toISOString(),
            lt: query.toDate + 'T23:59:59.999Z',
          },
        },
      });
    });
  });

  describe('GET /api/expenses/:id', () => {
    it('should return a single expense by id', async () => {
      const expense = expensesList[0];
      dbMock.expenses.findFirst.mockResolvedValue(expense);

      const response = await request(app).get('/api/expenses/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ ...expense, date: expense.date.toISOString() });
    });

    it('should return 404 if expense not found', async () => {
      dbMock.expenses.findFirst.mockResolvedValue(null);

      const response = await request(app).get('/api/expenses/999');

      expect(response.status).toBe(404);
      expect(logger.warn).toHaveBeenCalled();
    });
  });

  describe('PATCH /api/expenses/:id', () => {
    it('should update an expense', async () => {
      const updatedExpense = { ...expensesList[0], amount: 150, description: 'Updated expense' };

      dbMock.expenses.findFirst.mockResolvedValueOnce(expensesList[0]);
      dbMock.expenses.update.mockResolvedValueOnce(updatedExpense);

      const response = await request(app)
        .patch('/api/expenses/1')
        .send({ amount: 150, description: 'Updated expense' });

      expect(response.status).toBe(204);
      expect(logger.log).toHaveBeenCalled();
    });

    it('should return 404 if expense not found', async () => {
      dbMock.expenses.findFirst.mockResolvedValueOnce(null);

      const response = await request(app).patch('/api/expenses/999').send({ amount: 150 });

      expect(response.status).toBe(404);
      expect(logger.warn).toHaveBeenCalled();
    });

    it('should return 400 if validation fails', async () => {
      const invalidExpense = { amount: 'invalid' };

      const response = await request(app).patch('/api/expenses/1').send(invalidExpense);

      expect(response.status).toBe(400);
      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe('DELETE /api/expenses/:id', () => {
    it('should delete an expense', async () => {
      dbMock.expenses.findFirst.mockResolvedValueOnce(expensesList[0]);
      dbMock.expenses.delete.mockResolvedValueOnce(expensesList[0]);

      const response = await request(app).delete('/api/expenses/1');

      expect(response.status).toBe(204);
      expect(logger.log).toHaveBeenCalled();
    });

    it('should return 404 if expense not found', async () => {
      dbMock.expenses.findFirst.mockResolvedValueOnce(null);

      const response = await request(app).delete('/api/expenses/999');

      expect(response.status).toBe(404);
      expect(logger.warn).toHaveBeenCalled();
    });
  });
});
