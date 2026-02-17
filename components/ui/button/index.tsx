import { TouchableOpacity } from 'react-native';
import { cn } from '~/shared/utils/tailwind';
import ThemedText from '../themed-text';
import { ButtonProps } from './types';
import { buttonVariants } from './variants';

export default function Button({
  children,
  className,
  variant,
  size,
  onPress,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {props.leftIcon}
      <ThemedText
        className={cn('text-text-primary font-bold', props.disabled ? 'text-text-secondary' : '')}
      >
        {children}
      </ThemedText>
      {props.rightIcon}
    </TouchableOpacity>
  );
}
