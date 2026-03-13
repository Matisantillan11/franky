import { Pressable } from 'react-native';
import ConditionalWrapper from '~/components/conditional-wrapper';
import { cn } from '~/shared/utils/tailwind';
import ThemedText from '../themed-text';
import { ButtonProps } from './types';
import { buttonVariants } from './variants';

export default function Button({
  children,
  disabled,
  leftIcon,
  rightIcon,
  className,
  variant,
  size,
  onPress,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      <ConditionalWrapper conditional={!!leftIcon}>{leftIcon}</ConditionalWrapper>
      <ConditionalWrapper conditional={!!children}>
        <ThemedText
          className={cn('text-text-primary font-bold', disabled ? 'text-text-secondary' : '')}
        >
          {children}
        </ThemedText>
      </ConditionalWrapper>
      <ConditionalWrapper conditional={!!rightIcon}>{rightIcon}</ConditionalWrapper>
    </Pressable>
  );
}
