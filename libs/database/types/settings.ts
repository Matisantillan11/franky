import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { settings } from '../schema';

export type Settings = InferSelectModel<typeof settings>;
export type NewSettings = Omit<InferInsertModel<typeof settings>, 'id' | 'createdAt'>;
