import { cva } from 'class-variance-authority';

export const textAreaVariants = cva(
  'text-text-primary w-fit rounded-lg border-2 bg-transparent p-3 h-stretch font-medium',
  {
    variants: {
      variant: {
        default: 'border-gray-gray600/50 focus:border-gray-gray500',
        ghost: 'border-transparent',
      },
      size: {
        default: 'min-h-28 text-sm',
        lg: 'min-h-32 text-base',
        xl: 'min-h-36 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
