import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { generateUUID } from '../utils';

export const budgets = sqliteTable('budgets', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateUUID())
    .notNull(),
  type: text('type', { enum: ['private', 'shared', 'saving'] }).notNull(),
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull().default(new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }),
  deletedAt: integer('deleted_at', { mode: 'timestamp_ms' }),
});
