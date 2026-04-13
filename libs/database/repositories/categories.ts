import { eq, like, or } from 'drizzle-orm';
import { db } from '../client';
import { categories } from '../schema';
import type { Category, CategoryFilter, NewCategory } from '../types';

function buildWhereClause(filters: CategoryFilter) {
  const conditions: any[] = [];

  if (filters.type) {
    filters.type.map((categoryType) => conditions.push(eq(categories.type, categoryType)));
  }

  return conditions.length > 0 ? or(...conditions) : undefined;
}

export const categoriesRepository = {
  async findAll(types?: Array<Category['type']>): Promise<Category[]> {
    const query = db.select().from(categories);
    if (types) {
      const where = buildWhereClause({ type: types });
      return query.where(where);
    }
    return query;
  },

  async findById(id: string): Promise<Category | undefined> {
    const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
    return result[0];
  },

  async findByName(name: string): Promise<Category | undefined> {
    const result = await db
      .select()
      .from(categories)
      .where(like(categories.name, name))
      .limit(1);
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
