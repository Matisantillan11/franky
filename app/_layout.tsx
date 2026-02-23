import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { AppProviders } from '~/components';
import { SentryWrapper } from '~/libs';
import '../styles/global.css';

function RootLayout() {
  return (
    <AppProviders>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack>
    </AppProviders>
  );
}

export default SentryWrapper(RootLayout);
