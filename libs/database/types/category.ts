import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { categories } from '../schema';

export type Category = InferSelectModel<typeof categories>;
export type NewCategory = Omit<InferInsertModel<typeof categories>, 'id' | 'createdAt'>;

export type CategoryType = 'income' | 'expense' | 'both';

export type CategoryFilter = {
  type?: Array<CategoryType>;
};
