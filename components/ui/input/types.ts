import { VariantProps } from 'class-variance-authority';
import { TextInputProps } from 'react-native';
import { inputVariants } from './variants';

export type InputProps = TextInputProps & {
  label?: string;
  errorText?: string;
  isError?: boolean;
  isRequired?: boolean;
  variant?: InputVariant;
  size?: InputSize;
};

export type InputVariant = VariantProps<typeof inputVariants>['variant'];

export type InputSize = VariantProps<typeof inputVariants>['size'];
