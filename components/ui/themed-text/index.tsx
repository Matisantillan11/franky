import { Text } from 'react-native';
import { cn } from '~/shared/utils/tailwind';
import { ThemedTextProps } from './types';
import { textVariants } from './variants';

export default function ThemedText(props: ThemedTextProps) {
  const { size, variant, className, children, ...rest } = props;
  return (
    <Text {...rest} className={cn(textVariants({ variant, size }), className)}>
      {children}
    </Text>
  );
}
