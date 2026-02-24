import { ReactNode } from 'react';
import { ButtonProps } from '../ui/button/types';

export type BudgetCardProps = ButtonProps & {
  icon: ReactNode;
  title: string;
  description: string;
};
