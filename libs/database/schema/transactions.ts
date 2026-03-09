import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { generateUUID } from '../utils';
import { budgets } from './budget';
import { categories } from './categories';

export const transactions = sqliteTable('transactions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateUUID())
    .notNull(),
  // Stored in minor currency units (cents) to avoid floating-point issues
  amount: integer('amount').notNull(),
  type: text('type', { enum: ['income', 'expense'] }).notNull(),
  categoryId: text('category_id').references(() => categories.id, { onDelete: 'set null' }),
  budgetId: text('budget_id').references(() => budgets.id, { onDelete: 'set null' }),
  description: text('description'),
  note: text('note'),
  dueDate: integer('due_date', { mode: 'timestamp_ms' }).notNull(),
  currency: text('currency').default('USD').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
  deletedAt: integer('deleted_at', { mode: 'timestamp_ms' }),
});
