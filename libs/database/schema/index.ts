import { relations } from 'drizzle-orm';
import { categories } from './categories';
import { transactions } from './transactions';

export const categoriesRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));

export { categories } from './categories';
export { monthlyBudget } from './montly-budget';
export { settings } from './settings';
export { transactions } from './transactions';
