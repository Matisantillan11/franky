import { eq } from 'drizzle-orm';
import { db } from '../client';
import { budgets, categories } from '../schema';
import { BudgetType } from '../types';
import type { LucideIconName } from '../types/lucide-icon-name';

type SeedCategory = {
  name: string;
  type: 'income' | 'expense' | 'both';
  icon: LucideIconName;
  color: string;
};

type SeedBudget = {
  type: BudgetType;
  createdAt: Date;
};

const DEFAULT_CATEGORIES: SeedCategory[] = [
  // Income
  { name: 'Salary', type: 'income', icon: 'Briefcase', color: '#10B981' },
  { name: 'Freelance', type: 'income', icon: 'Laptop', color: '#3B82F6' },
  { name: 'Investment', type: 'income', icon: 'TrendingUp', color: '#8B5CF6' },
  { name: 'Gift', type: 'income', icon: 'Gift', color: '#F59E0B' },
  { name: 'Other Income', type: 'income', icon: 'CirclePlus', color: '#6B7280' },
  // Expense
  { name: 'Food & Dining', type: 'expense', icon: 'Utensils', color: '#EF4444' },
  { name: 'Transportation', type: 'expense', icon: 'Car', color: '#F97316' },
  { name: 'Housing', type: 'expense', icon: 'House', color: '#EAB308' },
  { name: 'Healthcare', type: 'expense', icon: 'HeartPulse', color: '#EC4899' },
  { name: 'Entertainment', type: 'expense', icon: 'Tv', color: '#A855F7' },
  { name: 'Shopping', type: 'expense', icon: 'ShoppingBag', color: '#14B8A6' },
  { name: 'Education', type: 'expense', icon: 'BookOpen', color: '#06B6D4' },
  { name: 'Utilities', type: 'expense', icon: 'Zap', color: '#84CC16' },
  { name: 'New category', type: 'both', icon: 'Plus', color: '#6B7280' },
  //
];

async function seedDefaultCategories(): Promise<void> {
  const existing = await db
    .select({ id: categories.id })
    .from(categories)
    .where(eq(categories.isDefault, true))
    .limit(1);

  if (existing.length > 0) return;

  const now = new Date();

  await db.insert(categories).values(
    DEFAULT_CATEGORIES.map((c) => ({
      ...c,
      isDefault: true,
      createdAt: now,
    }))
  );
}

async function seedInitialBudget(): Promise<void> {
  const existingBudget = await db.select({ id: budgets.id }).from(budgets).limit(1);

  if (existingBudget.length > 0) return;
  const now = new Date();

  const newBudget: SeedBudget = {
    type: 'private',
    createdAt: now,
  };
  await db.insert(budgets).values(newBudget);
}

export async function seedDatabase(): Promise<void> {
  await Promise.all([seedDefaultCategories(), seedInitialBudget()]);
}
