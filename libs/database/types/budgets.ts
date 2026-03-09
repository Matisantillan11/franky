import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { budgets } from '../schema';

export type Budget = InferSelectModel<typeof budgets>;
export type NewBudget = Omit<InferInsertModel<typeof budgets>, 'id' | 'createdAt' | 'updatedAt'>;

export type BudgetType = 'private' | 'shared' | 'saving';

export type BudgetFilters = {
  type?: BudgetType;
};
