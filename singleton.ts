import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import db from './src/db/db.service';

jest.mock('./src/db/db.service', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(dbMock);
});

export const dbMock = db as unknown as DeepMockProxy<PrismaClient>;
