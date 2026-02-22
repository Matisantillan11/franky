import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Toaster } from '~/components/ui';
import { SentryWrapper } from '~/libs';
import { CustomTheme } from '~/shared/constants/theme';
import '../styles/global.css';

function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={CustomTheme}>
        <BottomSheetModalProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="buttons" options={{ headerShown: false }} />
            <Stack.Screen name="inputs" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ headerShown: false }} />
            <Stack.Screen name="radio" options={{ headerShown: false }} />
            <Stack.Screen name="toast" options={{ headerShown: false }} />
          </Stack>
        </BottomSheetModalProvider>
      </ThemeProvider>
      <Toaster />
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

export default SentryWrapper(RootLayout);
