import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { transactions } from '../schema';
import { Category } from './category';

export type Transaction = InferSelectModel<typeof transactions>;
export type NewTransaction = Omit<
  InferInsertModel<typeof transactions>,
  'id' | 'createdAt' | 'updatedAt'
>;

export type TransactionWithCategory = Transaction & {
  category: Category | null;
};

export type TransactionType = 'income' | 'expense';

export type TransactionFilters = {
  type?: TransactionType;
  categoryId?: string;
  currency?: string;
  startDate?: Date;
  endDate?: Date;
};

export type TransactionSummary = {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
};
