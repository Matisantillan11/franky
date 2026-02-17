import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'rounded-full w-fit flex-row items-center justify-center font-medium  disabled:bg-gray-gray500 disabled:hover:cursor-not-allowed disabled:active:cursor-not-allowed disabled:hover:bg-gray-gray500 disabled:active:bg-gray-gray500',
  {
    variants: {
      variant: {
        default: 'bg-brand-brand500 border-none hover:bg-brand-brand600 active:bg-brand-brand600',
        outline:
          'bg-transparent border border-brand-brand500 hover:bg-brand-brand500 active:bg-brand-brand500 disabled:border-gray-gray500',
        ghost: 'bg-transparent border-none hover:bg-brand-brand900/10 active:bg-brand-brand900/10',
      },
      size: {
        default: 'px-2 min-h-10',
        sm: 'px-2 min-h-8',
        lg: 'px-2 min-h-12',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
