import { View } from 'react-native';
import { cn } from '~/shared/utils/tailwind';
import { Button, RadioGroupItem, ThemedText } from '../ui';
import { CurrencyCardProps } from './types';

export default function CurrencyCard({
  icon,
  title,
  description,
  className,
  value,
  ...rest
}: CurrencyCardProps) {
  return (
    <Button
      {...rest}
      variant="ghost"
      className={cn(
        'bg-brand-brand800/60 my-2 rounded-xl p-4',
        'disabled:bg-brand-600/20 disabled:border-2 disabled:border-gray-800',
        className
      )}
    >
      <View className="w-full flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          <View className="bg-gray-gray800/40 rounded-xl px-4 py-2">
            <ThemedText variant="primary" size="subtitle">
              {icon}
            </ThemedText>
          </View>

          <View className="w-fit">
            <ThemedText variant="primary">{title}</ThemedText>
            <ThemedText>{description}</ThemedText>
          </View>
        </View>
        <RadioGroupItem value={value} />
      </View>
    </Button>
  );
}
