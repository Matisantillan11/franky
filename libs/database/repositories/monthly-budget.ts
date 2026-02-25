import { eq } from 'drizzle-orm';
import { db } from '../client';
import { monthlyBudget } from '../schema';
import type { MonthlyBudget, NewMonthlyBudget } from '../types';

export const monthlyBudgetRepository = {
  async findAll(createdAt?: MonthlyBudget['createdAt']): Promise<MonthlyBudget[]> {
    const query = db.select().from(monthlyBudget);
    if (createdAt) {
      return query.where(eq(monthlyBudget.createdAt, createdAt));
    }
    return query;
  },

  async findById(id: string): Promise<MonthlyBudget | undefined> {
    const result = await db.select().from(monthlyBudget).where(eq(monthlyBudget.id, id)).limit(1);
    return result[0];
  },

  async create(input: NewMonthlyBudget): Promise<MonthlyBudget> {
    const result = await db
      .insert(monthlyBudget)
      .values({ ...input, createdAt: new Date() })
      .returning();
    return result[0];
  },

  async update(id: string, input: Partial<NewMonthlyBudget>): Promise<MonthlyBudget | undefined> {
    const result = await db
      .update(monthlyBudget)
      .set(input)
      .where(eq(monthlyBudget.id, id))
      .returning();
    return result[0];
  },

  async remove(id: string): Promise<void> {
    await db.delete(monthlyBudget).where(eq(monthlyBudget.id, id));
  },
};
