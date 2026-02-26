import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { generateUUID } from '../utils';

export const categories = sqliteTable('categories', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateUUID())
    .notNull(),
  name: text('name').notNull(),
  type: text('type', { enum: ['income', 'expense', 'both'] }).notNull(),
  icon: text('icon'),
  color: text('color'),
  isDefault: integer('is_default', { mode: 'boolean' }).default(false).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }),
  deletedAt: integer('deleted_at', { mode: 'timestamp_ms' }),
});
