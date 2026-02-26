import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { BudgetType, CurrencyType, GoalType } from '~/shared/types/settings.types';
import { generateUUID } from '../utils';

export const settings = sqliteTable('settings', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateUUID())
    .notNull(),
  budgetType: text('budget_type', {
    enum: Object.values(BudgetType) as [BudgetType, ...BudgetType[]],
  }).notNull(),
  currency: text('currency', {
    enum: Object.values(CurrencyType) as [CurrencyType, ...CurrencyType[]],
  }).notNull(),
  goal: text('goal', {
    enum: Object.values(GoalType) as [GoalType, ...GoalType[]],
  }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }),
});
