import { ButtonProps } from '../button/types';

export type BadgeProps = ButtonProps & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  text?: string;
};
