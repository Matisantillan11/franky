import { VariantProps } from 'class-variance-authority';
import { TextProps } from 'react-native';
import { textVariants } from './variants';

export type ThemedTextProps = TextProps & {
  children?: React.ReactNode;
  variant?: TextVariant;
  size?: TextSize;
};

export type TextVariant = VariantProps<typeof textVariants>['variant'];

export type TextSize = VariantProps<typeof textVariants>['size'];
