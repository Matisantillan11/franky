import { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';
import { cn } from '~/shared/utils/tailwind';
import Button from '../button';
import ThemedText from '../themed-text';
import { BadgeProps } from './types';

export default function Badge({
  leftIcon,
  rightIcon,
  label,
  color,
  variant = 'outline',
  className,
  style,
  ...props
}: BadgeProps) {
  const isIconOnly = !label;

  const colorBg = label && color ? { backgroundColor: color + '20' } : undefined;

  const mergedStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
    const external = typeof style === 'function' ? style(state) : style;
    return [colorBg, external];
  };

  return (
    <Button
      {...props}
      size={isIconOnly ? 'icon' : 'sm'}
      variant={variant}
      leftIcon={leftIcon}
      className={cn(
        isIconOnly && 'border-gray-gray50 justify-center border border-dashed px-0!',
        !isIconOnly && 'px-4 py-2',
        className
      )}
      style={mergedStyle}
    >
      {label ? (
        <ThemedText className="text-sm font-semibold" style={color ? { color } : undefined}>
          {label}
        </ThemedText>
      ) : undefined}
    </Button>
  );
}
