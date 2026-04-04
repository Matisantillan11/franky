import { Pressable, View } from 'react-native';
import ThemedText from '../themed-text';

export default function Tabs({
  value,
  options,
  onChange,
  label,
}: {
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  label?: string;
}) {
  return (
    <View className="w-full gap-4">
      {label && <ThemedText>{label}</ThemedText>}
      <View className="bg-gray-gray900 flex-row self-start rounded-xl p-1.5">
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              className={`items-center rounded-xl px-4 py-1 ${isSelected ? 'bg-brand-brand500/35' : 'bg-transparent'}`}
            >
              <ThemedText className="text-sm font-semibold text-white capitalize">
                {option.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
