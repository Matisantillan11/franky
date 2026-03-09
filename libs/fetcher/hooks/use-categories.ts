import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { categoriesRepository } from '../../database/repositories';
import type { CategoryType, NewCategory } from '../../database/types';
import { queryKeys } from '../keys';

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: () => categoriesRepository.findAll(),
  });
}

export function useCategoryById(id: string) {
  return useQuery({
    queryKey: queryKeys.categories.byId(id),
    queryFn: () => categoriesRepository.findById(id),
    enabled: !!id,
  });
}

export function useCategoriesByType(types: Array<CategoryType>) {
  return useQuery({
    queryKey: queryKeys.categories.byType(types),
    queryFn: () => categoriesRepository.findAll(types),
    enabled: !!types,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: NewCategory) => categoriesRepository.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<NewCategory> }) =>
      categoriesRepository.update(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.byId(variables.id) });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoriesRepository.remove(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      queryClient.removeQueries({ queryKey: queryKeys.categories.byId(id) });
    },
  });
}
