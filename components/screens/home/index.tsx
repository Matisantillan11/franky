import * as LucideIcons from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import Card from '~/components/card';
import { ThemedText } from '~/components/ui';
import type { Category } from '~/libs';

export default function HomeScreen({ categories }: { categories: Category[] }) {
  return (
    <ScrollView contentContainerClassName="p-4 gap-3" contentInsetAdjustmentBehavior="automatic">
      <ThemedText variant="primary" className="mb-2 text-xl font-bold">
        Categories
      </ThemedText>

      {categories.map((category) => {
        const IconComponent = LucideIcons[
          category.icon as keyof typeof LucideIcons
        ] as React.ComponentType<{ size?: number; color?: string }>;

        return (
          <Card
            key={category.id}
            icon={
              <View
                className="h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: `${category.color}22` }}
              >
                {IconComponent && <IconComponent size={20} color={category.color ?? '#fff'} />}
              </View>
            }
            title={category.name}
            description={category.type}
          />
        );
      })}
    </ScrollView>
  );
}
