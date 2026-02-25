import { eq } from 'drizzle-orm';
import { db } from '../client';
import { categories } from '../schema';
import type { Category, NewCategory } from '../types';

export const categoriesRepository = {
  async findAll(type?: Category['type']): Promise<Category[]> {
    const query = db.select().from(categories);
    if (type) {
      return query.where(eq(categories.type, type));
    }
    return query;
  },

  async findById(id: string): Promise<Category | undefined> {
    const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
    return result[0];
  },

  async create(input: NewCategory): Promise<Category> {
    const result = await db
      .insert(categories)
      .values({ ...input, createdAt: new Date() })
      .returning();
    return result[0];
  },

  async update(id: string, input: Partial<NewCategory>): Promise<Category | undefined> {
    const result = await db.update(categories).set(input).where(eq(categories.id, id)).returning();
    return result[0];
  },

  async remove(id: string): Promise<void> {
    await db.delete(categories).where(eq(categories.id, id));
  },
};
