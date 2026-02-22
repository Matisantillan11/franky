import { ReactNode, useId } from 'react';
import { toast } from 'sonner-native';
import { theme } from '~/shared/constants/theme';

export const useToast = () => {
  const id = useId();

  const addToast = ({
    message,
    description,
    duration = 1000,
    icon,
    type,
  }: {
    message: string;
    description?: string;
    duration?: number;
    icon?: ReactNode;
    type?: 'success' | 'error' | 'warning' | 'loading';
  }) => {
    if (type) {
      toast[type](message, {
        id,
        description,
        duration,
        icon,
        richColors: true,
      });

      return;
    }

    toast(message, {
      id,
      description,
      duration,
      icon,
      richColors: true,
      styles: {
        title: {
          color: theme.gray.gray100,
        },
        description: {
          color: theme.gray.gray100,
        },
        toast: {
          backgroundColor: theme.brand.brand900,
          borderColor: theme.brand.brand700,
        },
      },
    });
  };

  return {
    addToast,
  };
};
