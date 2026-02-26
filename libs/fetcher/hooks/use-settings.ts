import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { settingsRepository } from '../../database/repositories';
import type { NewSettings } from '../../database/types';
import { queryKeys } from '../keys';

export function useSettings() {
  return useQuery({
    queryKey: queryKeys.settings.all,
    queryFn: () => settingsRepository.find(),
  });
}

export function useCreateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: NewSettings) => settingsRepository.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.settings.all });
    },
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<NewSettings> }) =>
      settingsRepository.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.settings.all });
    },
  });
}
