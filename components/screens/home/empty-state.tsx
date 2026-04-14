import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { BlurView } from '~/components/blur-circle';
import { Button, ThemedText } from '~/components/ui';
import { cn } from '~/shared/utils/tailwind';
import { AnimatedSeedingIcon } from './animated-seeding-icon';

export default function EmptyState() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';

  const handleAddTransaction = () => {
    router.push('/add-transaction');
  };

  return (
    <View className="gap-2 px-10 pt-40">
      <View className="items-center justify-center">
        <View className="items-center justify-center rounded-full">
          <BlurView top={-140} left={-160} size={450} intensity={25} />
          <AnimatedSeedingIcon />
        </View>
      </View>

      <View className="my-10 items-center gap-4">
        <ThemedText
          variant="primary"
          size="title"
          className={cn('text-center', isSpanish ? 'px-5' : 'px-10')}
        >
          {t('home.emptyState.title')}
        </ThemedText>
        <ThemedText size="subtitle" className="text-center">
          {t('home.emptyState.subtitle')}
        </ThemedText>
      </View>

      <View className="w-full p-5">
        <Button onPress={handleAddTransaction}>{t('home.emptyState.button')}</Button>
      </View>
    </View>
  );
}
