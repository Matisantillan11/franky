import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import ColorPicker, { HueSlider, Panel1, Preview } from 'reanimated-color-picker';
import ModalScreenNodge from '~/components/modal-screen-nodge';
import { Button, ThemedText } from '~/components/ui';
import { theme } from '~/shared/constants/theme';
import { useColorPickerStore } from '~/shared/stores/color-picker';

export default function ColorPickerScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { selectedColor, select } = useColorPickerStore();

  return (
    <View className="bg-brand-brand900 flex-1">
      <ModalScreenNodge />

      <View className="flex-1 gap-6 px-5 pt-2">
        <ThemedText variant="primary" className="text-center text-2xl font-bold">
          {t('colorPicker.title')}
        </ThemedText>

        <ColorPicker
          value={selectedColor}
          onChangeJS={(colors) => select(colors.hex)}
          style={{ gap: 20 }}
        >
          <Preview hideInitialColor style={{ height: 48, borderRadius: 24 }} />
          <Panel1 style={{ borderRadius: 16, height: 220 }} />
          <HueSlider
            style={{ borderRadius: 12 }}
            sliderThickness={32}
            thumbSize={32}
            thumbShape="circle"
          />
        </ColorPicker>
      </View>

      <View className="px-5 pb-8 pt-4">
        <Button
          size="lg"
          className="w-full"
          onPress={() => router.back()}
          style={{ backgroundColor: selectedColor }}
        >
          {t('colorPicker.selectButton')}
        </Button>
      </View>
    </View>
  );
}
