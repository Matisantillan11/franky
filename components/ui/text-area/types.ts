import { VariantProps } from 'class-variance-authority';
import { TextInputProps } from 'react-native';
import { textAreaVariants } from './variants';

export interface TextAreaVariantsProps extends VariantProps<typeof textAreaVariants> {}

export interface TextAreaProps extends TextInputProps {
  numberOfLines?: number;
  variant?: TextAreaVariantsProps['variant'];
  size?: TextAreaVariantsProps['size'];
  label?: string;
}
