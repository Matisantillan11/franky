import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { transactionsRepository } from '../../database/repositories';
import type { NewTransaction, TransactionFilters } from '../../database/types';
import { queryKeys } from '../keys';

export function useTransactions(filters?: TransactionFilters) {
  return useQuery({
    queryKey: queryKeys.transactions.list(filters),
    queryFn: () => transactionsRepository.findAll(filters),
  });
}

export function useTransactionById(id: string) {
  return useQuery({
    queryKey: queryKeys.transactions.byId(id),
    queryFn: () => transactionsRepository.findById(id),
    enabled: !!id,
  });
}

export function useTransactionSummary(filters?: TransactionFilters) {
  return useQuery({
    queryKey: queryKeys.transactions.summary(filters),
    queryFn: () => transactionsRepository.getSummary(filters),
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: NewTransaction) => transactionsRepository.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
      // Invalidate related aggregates or categories if needed
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<NewTransaction> }) =>
      transactionsRepository.update(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.byId(variables.id) });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => transactionsRepository.remove(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all });
      queryClient.removeQueries({ queryKey: queryKeys.transactions.byId(id) });
    },
  });
}
