import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import Card from '~/components/card';
import { Money, Notifications, Shapes, ThemedText, Wallet } from '~/components/ui';
import { useSettings } from '~/libs/fetcher';
import { theme } from '~/shared/constants/theme';
import { cn } from '~/shared/utils/tailwind';

export default function SettingsScreen() {
  const router = useRouter();
  const { data } = useSettings();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1 p-4">
      <ThemedText variant="primary" className="text-2xl font-bold">
        Settings
      </ThemedText>

      <View className="flex-col gap-4 py-4">
        <View className="gap-4">
          <ThemedText variant="secondary">Account</ThemedText>
          <View>
            <Card
              disabled={false}
              variant="ghost"
              icon={
                <View className={cn('bg-brand-brand700 rounded-xl p-2')}>
                  <Money color={theme.brand.brand500} />
                </View>
              }
              title="Currency"
              description="Primary display currency"
            />
            <Card
              disabled={false}
              variant="ghost"
              icon={
                <View className={cn('bg-brand-brand700 rounded-xl p-2')}>
                  <Wallet color={theme.brand.brand500} />
                </View>
              }
              title="Monthly Income"
              description="See your budget baseline"
            />
          </View>
        </View>

        <View className="gap-4">
          <ThemedText variant="secondary">Preferences</ThemedText>
          <View>
            <Card
              disabled={false}
              variant="ghost"
              icon={
                <View className={cn('bg-brand-brand700 rounded-xl p-2')}>
                  <Shapes color={theme.brand.brand500} />
                </View>
              }
              title="Categories"
              description="Manage expense and income categories"
              onPress={() => router.push('/all-categories')}
            />
            <Card
              disabled={false}
              variant="ghost"
              icon={
                <View className={cn('bg-brand-brand700 rounded-xl p-2')}>
                  <Notifications color={theme.brand.brand500} />
                </View>
              }
              title="Notifications"
              description="Manage notification preferences"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
