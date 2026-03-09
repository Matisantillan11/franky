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
  ...rest
}: BudgetCardProps) {
  return (
    <Button
      {...rest}
      variant="ghost"
      className={cn(
        'p-4',
        'disabled:bg-brand-600/20 disabled:border-2 disabled:border-gray-800',
        variant === 'ghost' ? 'bg-brand-brand900 rounded-none' : 'bg-brand-brand800/60 rounded-xl',
        className
      )}
    >
      <View className="w-full flex-row items-center justify-between">
        {icon}

        <View className="w-full pr-10 pl-4">
          <ThemedText variant="primary">{title}</ThemedText>
          <ThemedText>{description}</ThemedText>
        </View>
      </View>
    </Button>
  );
}
