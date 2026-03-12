import { ButtonProps } from '../button/types';

export type BadgeProps = ButtonProps & {
  label?: string;
  color?: string;
};
