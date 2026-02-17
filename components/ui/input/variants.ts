import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  'text-text-primary w-fit rounded-lg border-2 bg-transparent p-3 h-stretch',
  {
    variants: {
      variant: {
        default: 'border-gray-gray600/50',
        ghost: 'border-transparent',
      },
      size: {
        default: 'min-h-12 text-base',
        lg: 'min-h-16 text-3xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
