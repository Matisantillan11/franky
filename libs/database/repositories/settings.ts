import { eq } from 'drizzle-orm';
import { db } from '../client';
import { settings } from '../schema';
import type { NewSettings, Settings } from '../types';

export const settingsRepository = {
  async find(): Promise<Settings | undefined> {
    const result = await db.select().from(settings).limit(1);
    return result[0];
  },

  async create(input: NewSettings): Promise<Settings> {
    const result = await db
      .insert(settings)
      .values({ ...input, createdAt: new Date() })
      .returning();
    return result[0];
  },

  async update(id: string, input: Partial<NewSettings>): Promise<Settings | undefined> {
    const result = await db
      .update(settings)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(settings.id, id))
      .returning();
    return result[0];
  },
};
