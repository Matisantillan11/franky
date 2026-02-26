import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { monthlyBudgetRepository } from '../../database/repositories/monthly-budget';
import type { NewMonthlyBudget } from '../../database/types';
import { queryKeys } from '../keys';

export function useMonthlyBudgets(createdAt?: Date) {
  return useQuery({
    // If createdAt is passed, include it in the key so caching differs per month
    queryKey: [...queryKeys.monthlyBudgets.all, createdAt ? createdAt.toISOString() : undefined],
    queryFn: () => monthlyBudgetRepository.findAll(createdAt),
  });
}

export function useMonthlyBudgetLatest() {
  return useQuery({
    queryKey: queryKeys.monthlyBudgets.latest,
    queryFn: () => monthlyBudgetRepository.findLatest(),
  });
}

export function useMonthlyBudgetById(id: string) {
  return useQuery({
    queryKey: queryKeys.monthlyBudgets.byId(id),
    queryFn: () => monthlyBudgetRepository.findById(id),
    enabled: !!id,
  });
}

export function useCreateMonthlyBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: NewMonthlyBudget) => monthlyBudgetRepository.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.monthlyBudgets.all });
    },
  });
}

export function useUpdateMonthlyBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<NewMonthlyBudget> }) =>
      monthlyBudgetRepository.update(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.monthlyBudgets.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.monthlyBudgets.byId(variables.id) });
    },
  });
}

export function useDeleteMonthlyBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => monthlyBudgetRepository.remove(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.monthlyBudgets.all });
      queryClient.removeQueries({ queryKey: queryKeys.monthlyBudgets.byId(id) });
    },
  });
}
