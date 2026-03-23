import * as icons from 'lucide-react-native/icons';
import { ColorValue, View } from 'react-native';
import { Category } from '~/libs';
import { Button, ThemedText } from '../ui';

export default function CategoryCard({
  category,
  onPress,
}: {
  category: Category;
  onPress: () => void;
}) {
  const LucideIcon = icons[category.icon as keyof typeof icons] as React.ComponentType<{
    size?: number;
    color?: ColorValue;
  }>;

  return (
    <Button
      variant="ghost"
      onPress={onPress}
      leftIcon={
        <View
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: (category.color ?? '#fff') + '30' }}
        >
          {LucideIcon && <LucideIcon size={20} color={category.color as ColorValue} />}
        </View>
      }
      className="w-full justify-start gap-4 rounded-2xl px-4 py-4"
      style={{ backgroundColor: (category.color ?? '#fff') + '18' }}
    >
      <ThemedText variant="primary" className="h-fulltext-base font-semibold">
        {category.name}
      </ThemedText>
    </Button>
  );
}
