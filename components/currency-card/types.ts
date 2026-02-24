import { ReactNode } from 'react';
import { ButtonProps } from '../ui/button/types';

export type CurrencyCardProps = ButtonProps & {
  icon: ReactNode;
  title: string;
  description: string;
  value: string;
};
