import { db } from '../client';
import { budgets, categories, monthlyBudget, settings, transactions } from '../schema';
import { seedDatabase } from '../seed/seed';

export const dataRepository = {
  async clearAllData(): Promise<void> {
    await db.delete(transactions);
    await db.delete(budgets);
    await db.delete(categories);
    await db.delete(monthlyBudget);
    await db.delete(settings);

    // Reseed default data
    await seedDatabase();
  },
};
