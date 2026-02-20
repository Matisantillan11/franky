import { VariantProps } from 'class-variance-authority';
import { PressableProps } from 'react-native';
import { buttonVariants } from './variants';

export type ButtonProps = PressableProps & {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
