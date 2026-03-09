import { relations } from 'drizzle-orm';
import { budgets } from './budget';
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
  budget: one(budgets, {
    fields: [transactions.budgetId],
    references: [budgets.id],
  }),
}));

export const budgetsRelations = relations(budgets, ({ many }) => ({
  transactions: many(transactions),
}));

export { budgets } from './budget';
export { categories } from './categories';
export { monthlyBudget } from './montly-budget';
export { settings } from './settings';
export { transactions } from './transactions';
