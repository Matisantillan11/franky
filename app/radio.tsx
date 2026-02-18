import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioGroup } from '~/components/ui';

export default function RadioScreen() {
  const [value, setValue] = useState('1');

  const onValueChange = (value: string) => setValue(value);

  const options = [
    { id: '1', label: 'Esta es la primera experiencia', value: '1' },
    { id: '2', label: 'Esta es la segunda experiencia', value: '2' },
    { id: '3', label: 'Esta es la tercera experiencia', value: '3' },
  ];

  return (
    <SafeAreaView>
      <RadioGroup value={value} onValueChange={onValueChange} options={options} />
    </SafeAreaView>
  );
}
