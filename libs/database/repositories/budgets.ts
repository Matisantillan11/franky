import { and, desc, eq } from 'drizzle-orm';
import { db } from '../client';
import { budgets } from '../schema';
import type { Budget, BudgetFilters, NewBudget } from '../types';

function buildWhereClause(filters: BudgetFilters) {
  const conditions = [];

  if (filters.type) {
    conditions.push(eq(budgets.type, filters.type));
  }

  return conditions.length > 0 ? and(...conditions) : undefined;
}

export const budgetsRepository = {
  async findAll(filters: BudgetFilters = {}): Promise<Budget[]> {
    const where = buildWhereClause(filters);

    return db.query.budgets.findMany({
      where,

      orderBy: [desc(budgets.createdAt)],
    });
  },

  async findById(id: string): Promise<Budget | undefined> {
    return db.query.budgets.findFirst({
      where: eq(budgets.id, id),
      with: { transactions: true },
    });
  },

  async create(input: NewBudget): Promise<Budget> {
    const now = new Date();
    const result = await db
      .insert(budgets)
      .values({ ...input, createdAt: now, updatedAt: now })
      .returning();
    return result[0];
  },

  async update(id: string, input: Partial<NewBudget>): Promise<Budget | undefined> {
    const result = await db
      .update(budgets)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(budgets.id, id))
      .returning();
    return result[0];
  },

  async remove(id: string): Promise<void> {
    await db.delete(budgets).where(eq(budgets.id, id));
  },
};
