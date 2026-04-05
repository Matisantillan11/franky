import { and, between, desc, eq, sql, sum } from 'drizzle-orm';
import { db } from '../client';
import { categories, transactions } from '../schema';
import type {
  NewTransaction,
  Transaction,
  TransactionFilters,
  TransactionSummary,
  TransactionWithCategory,
} from '../types';

function buildWhereClause(filters: TransactionFilters) {
  const conditions = [];

  if (filters.type) {
    conditions.push(eq(transactions.type, filters.type));
  }
  if (filters.categoryId) {
    conditions.push(eq(transactions.categoryId, filters.categoryId));
  }
  if (filters.currency) {
    conditions.push(eq(transactions.currency, filters.currency));
  }
  if (filters.startDate && filters.endDate) {
    conditions.push(between(transactions.dueDate, filters.startDate, filters.endDate));
  } else if (filters.startDate) {
    conditions.push(sql`${transactions.dueDate} >= ${filters.startDate}`);
  } else if (filters.endDate) {
    conditions.push(sql`${transactions.dueDate} <= ${filters.endDate}`);
  }

  return conditions.length > 0 ? and(...conditions) : undefined;
}

export const transactionsRepository = {
  async findAll(filters: TransactionFilters = {}): Promise<TransactionWithCategory[]> {
    const now = new Date();

    const firstDayOfTheMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfTheMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const resolvedFilters: TransactionFilters = {
      ...filters,
      startDate: filters.startDate ?? firstDayOfTheMonth,
      endDate: filters.endDate ?? lastDayOfTheMonth,
    };

    const where = buildWhereClause(resolvedFilters);

    return db.query.transactions.findMany({
      where,
      with: { category: true },
      orderBy: [desc(transactions.dueDate)],
    });
  },

  async findById(id: string): Promise<TransactionWithCategory | undefined> {
    return db.query.transactions.findFirst({
      where: eq(transactions.id, id),
      with: { category: true },
    });
  },

  async create(input: NewTransaction): Promise<Transaction> {
    const now = new Date();
    const result = await db
      .insert(transactions)
      .values({ ...input, createdAt: now, updatedAt: now })
      .returning();
    return result[0];
  },

  async update(id: string, input: Partial<NewTransaction>): Promise<Transaction | undefined> {
    const result = await db
      .update(transactions)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(transactions.id, id))
      .returning();
    return result[0];
  },

  async remove(id: string): Promise<void> {
    await db.delete(transactions).where(eq(transactions.id, id));
  },

  async getSummary(filters: TransactionFilters = {}): Promise<TransactionSummary> {
    const where = buildWhereClause(filters);

    const rows = await db
      .select({
        type: transactions.type,
        total: sum(transactions.amount),
      })
      .from(transactions)
      .where(where)
      .groupBy(transactions.type);

    let totalIncome = 0;
    let totalExpenses = 0;

    for (const row of rows) {
      const value = Number(row.total ?? 0);
      if (row.type === 'income') totalIncome = value;
      if (row.type === 'expense') totalExpenses = value;
    }

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
    };
  },

  async getByCategory(
    filters: TransactionFilters = {}
  ): Promise<{ category: typeof categories.$inferSelect | null; total: number }[]> {
    const where = buildWhereClause(filters);

    const rows = await db
      .select({
        category: categories,
        total: sum(transactions.amount),
      })
      .from(transactions)
      .leftJoin(categories, eq(transactions.categoryId, categories.id))
      .where(where)
      .groupBy(transactions.categoryId);

    return rows.map((r) => ({ category: r.category, total: Number(r.total ?? 0) }));
  },
};
