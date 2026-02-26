export const queryKeys = {
  categories: {
    all: ['categories'] as const,
    byId: (id: string) => ['categories', id] as const,
    byType: (type: string) => ['categories', 'type', type] as const,
  },
  transactions: {
    all: ['transactions'] as const,
    byId: (id: string) => ['transactions', id] as const,
    list: (filters?: Record<string, any>) => ['transactions', 'list', filters] as const,
    summary: (filters?: Record<string, any>) => ['transactions', 'summary', filters] as const,
  },
  monthlyBudgets: {
    all: ['monthlyBudgets'] as const,
    byId: (id: string) => ['monthlyBudgets', id] as const,
    latest: ['monthlyBudgets', 'latest'] as const,
  },
} as const;
