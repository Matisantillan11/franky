import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { budgetsRepository } from '../../database/repositories';
import type { NewBudget } from '../../database/types';
import { queryKeys } from '../keys';

export function useBudgets() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: () => budgetsRepository.findAll(),
  });
}

export function useBudgetById(id: string) {
  return useQuery({
    queryKey: queryKeys.categories.byId(id),
    queryFn: () => budgetsRepository.findById(id),
    enabled: !!id,
  });
}

export function useCreateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: NewBudget) => budgetsRepository.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.budgets.all });
    },
  });
}

export function useUpdateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<NewBudget> }) =>
      budgetsRepository.update(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.budgets.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.budgets.byId(variables.id) });
    },
  });
}

export function useDeleteBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => budgetsRepository.remove(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.budgets.all });
      queryClient.removeQueries({ queryKey: queryKeys.budgets.byId(id) });
    },
  });
}
