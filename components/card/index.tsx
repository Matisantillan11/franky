import { View } from 'react-native';
import { cn } from '~/shared/utils/tailwind';
import { Button, ThemedText } from '../ui';
import { BudgetCardProps } from './types';

export default function Card({
  icon,
  title,
  description,
  className,
  variant,
  rightIcon,
  ...rest
}: BudgetCardProps) {
  return (
    <Button
      {...rest}
      variant="ghost"
      className={cn(
        'rounded-xl p-4',
        'disabled:bg-brand-600/20 disabled:border-2 disabled:border-gray-800',
        variant === 'ghost' ? 'bg-brand-brand900' : 'bg-brand-brand800/60',
        className
      )}
    >
      <View className="w-full flex-row items-center justify-between">
        <View className="flex-row">
          {icon}

          <View className="pl-4">
            <ThemedText variant="primary">{title}</ThemedText>
            <ThemedText>{description}</ThemedText>
          </View>
        </View>

        {rightIcon}
      </View>
    </Button>
  );
}
