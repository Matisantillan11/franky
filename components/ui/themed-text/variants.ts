import { cva } from 'class-variance-authority';

export const textVariants = cva('text-sm', {
  variants: {
    variant: {
      default: 'text-text-tertiary',
      primary: 'text-text-primary font-bold',
      secondary: 'text-text-secondary font-medium',
    },
    size: {
      default: 'text-sm',
      title: 'text-3xl',
      subtitle: 'text-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
