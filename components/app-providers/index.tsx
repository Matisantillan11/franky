import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from '~/components/ui';
import { DatabaseProvider } from '~/libs';
import { FetcherProvider } from '~/libs/fetcher';
import i18n from '~/libs/i18n';
import { CustomTheme } from '~/shared/constants/theme';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider value={CustomTheme}>
          <DatabaseProvider>
            <FetcherProvider>
              <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
            </FetcherProvider>
          </DatabaseProvider>
        </ThemeProvider>
        <Toaster theme="dark" />
        <StatusBar style="auto" />
      </I18nextProvider>
    </GestureHandlerRootView>
  );
}
