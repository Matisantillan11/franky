import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { generateUUID } from '../utils';

export const monthlyBudget = sqliteTable('monthly_budget', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateUUID())
    .notNull(),
  amount: integer('amount').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }),
  deletedAt: integer('deleted_at', { mode: 'timestamp_ms' }),
});
