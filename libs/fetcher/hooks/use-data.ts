import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ONBOARDING_STORAGE } from '~/components/onboarding-stepper/constants';
import { useStorage } from '~/shared/hooks/useStorage';
import { dataRepository } from '../../database/repositories';

export function useClearAllData() {
  const queryClient = useQueryClient();
  const storage = useStorage({ id: ONBOARDING_STORAGE.id });

  return useMutation({
    mutationFn: () => dataRepository.clearAllData(),
    onSuccess: () => {
      queryClient.invalidateQueries();
      storage.destroy();
    },
  });
}
