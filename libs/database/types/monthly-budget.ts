import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { monthlyBudget } from '../schema';

export type MonthlyBudget = InferSelectModel<typeof monthlyBudget>;
export type NewMonthlyBudget = Omit<InferInsertModel<typeof monthlyBudget>, 'id' | 'createdAt'>;
