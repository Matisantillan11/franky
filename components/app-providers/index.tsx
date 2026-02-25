import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from '~/components/ui';
import { DatabaseProvider } from '~/libs';
import { CustomTheme } from '~/shared/constants/theme';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={CustomTheme}>
        <DatabaseProvider>
          <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
        </DatabaseProvider>
      </ThemeProvider>
      <Toaster />
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
