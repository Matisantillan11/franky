import { View } from 'react-native';
import ThemedText from '../themed-text';
import { RadioGroup as PrimitiveRadioGroup, RadioGroupItem } from './components';

export default function RadioGroup({
  value,
  onValueChange,
  options,
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: Array<{ id: string; label: string; value: string }>;
}) {
  return (
    <PrimitiveRadioGroup onValueChange={onValueChange} value={value} className="w-stretch h-full">
      {options.map((option) => (
        <View key={option.id} className="w-stretch flex-row items-center gap-2">
          <ThemedText className="w-40">{option.label}</ThemedText>
          <RadioGroupItem value={option.value} />
        </View>
      ))}
    </PrimitiveRadioGroup>
  );
}
