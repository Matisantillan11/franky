import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import React, { useEffect, useState } from 'react';
import { db } from './client';
import migrations from './migrations/migrations';
import { seedDatabase } from './seed/seed';

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function DatabaseProvider({ children, fallback = null }: Props) {
  const { success, error } = useMigrations(db, migrations);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    if (!success) return;
    seedDatabase().then(() => setSeeded(true));
  }, [success]);

  if (error) throw error;

  if (!success || !seeded) return <>{fallback}</>;

  return <>{children}</>;
}
