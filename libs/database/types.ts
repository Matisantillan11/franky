import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type * as LucideIcons from 'lucide-react-native';
import type { categories, transactions } from './schema';

/** Any valid PascalCase icon name exported by lucide-react-native. */
export type LucideIconName = keyof typeof LucideIcons;

export type Category = InferSelectModel<typeof categories>;
export type NewCategory = Omit<InferInsertModel<typeof categories>, 'id' | 'createdAt'>;

export type Transaction = InferSelectModel<typeof transactions>;
export type NewTransaction = Omit<
  InferInsertModel<typeof transactions>,
  'id' | 'createdAt' | 'updatedAt'
>;

export type TransactionWithCategory = Transaction & {
  category: Category | null;
};

export type TransactionType = 'income' | 'expense';
export type CategoryType = 'income' | 'expense' | 'both';

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
