import * as icons from 'lucide-react-native/icons';
import { ColorValue, View } from 'react-native';
import { BlurView } from '~/components/blur-circle';
import { Badge, Button, FlashList, Input, TextArea, ThemedText } from '~/components/ui';
import { useCategoriesByType } from '~/libs/fetcher';

export default function AddTransactionScreen() {
  const { data: categories } = useCategoriesByType('expense');

  return (
    <View className="mb-12 h-full flex-1 justify-between">
      <View className="w-full flex-1">
        <View className="h-10 w-full" />
        <View className="w-full items-center">
          <ThemedText className="text-center">Total amount</ThemedText>
          <Input placeholder="$ 0.00" size="xl" variant="ghost" className="w-full" />
        </View>

        <View className="h-full w-full flex-1 gap-10">
          <View className="w-full gap-4 px-4">
            <ThemedText>Category</ThemedText>
            <FlashList
              horizontal
              data={categories}
              renderItem={({ item }) => {
                const LucideIcon = icons[item.icon as keyof typeof icons];
                return (
                  <View className="px-1">
                    <Badge
                      size="lg"
                      leftIcon={<LucideIcon size={20} color={item.color as ColorValue} />}
                      text={item.name}
                      style={({ pressed }) => [
                        {
                          backgroundColor: pressed ? `${item.color}30` : 'transparent',
                          borderColor: item.color as ColorValue,
                        },
                      ]}
                    />
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </View>

          <View className="w-full gap-4 px-4">
            {/* Here we should add Calendar component */}

            <TextArea
              size="lg"
              label="Notes"
              placeholder="What was this for? Add any extra details..."
            />
          </View>
        </View>
      </View>
      <View className="w-full px-4">
        <BlurView size={500} left={-50} />
        <Button>Add transaction</Button>
      </View>
    </View>
  );
}
