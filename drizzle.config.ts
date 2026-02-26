import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './libs/database/schema',
  out: './libs/database/migrations',
  dialect: 'sqlite',
  driver: 'expo',
  migrations: {
    table: 'migrations',
    schema: 'public',
    prefix: 'index',
  },
});
