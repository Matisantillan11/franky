import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { AppProviders } from '~/components';
import { SentryWrapper } from '~/libs';
import '../styles/global.css';

function RootLayout() {
  return (
    <AppProviders>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(home)" />
        <Stack.Screen name="update-currency" options={{ presentation: 'modal' }} />
        <Stack.Screen name="add-transaction" options={{ presentation: 'modal' }} />
        <Stack.Screen name="add-category" options={{ presentation: 'modal' }} />
        <Stack.Screen name="transactions/[categoryId]" options={{ presentation: 'modal' }} />
        <Stack.Screen name="all-categories" options={{ presentation: 'modal' }} />
      </Stack>
    </AppProviders>
  );
}

export default SentryWrapper(RootLayout);
