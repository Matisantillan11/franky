/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { DarkTheme, Theme } from '@react-navigation/native';
import { Platform } from 'react-native';

export const theme = {
  brand: {
    brand100: '#E3f8f5',
    brand200: '#B4E9E2',
    brand300: '#84D6CB',
    brand400: '#5FC4B8',
    brand500: '#3FB6A8',
    brand600: '#2B7D83',
    brand700: '#1C3A43',
    brand800: '#122027',
    brand900: '#0A1014',
  },
  gray: {
    gray10: '#A3A9B4',
    gray25: '#FCFCFD',
    gray50: '#F9FAFB',
    gray90: '#E9E9E9',
    gray100: '#F2F4F7',
    gray200: '#EAECF0',
    gray300: '#D0D5DD',
    gray400: '#98A2B3',
    gray500: '#667085',
    gray600: '#475467',
    gray700: '#344054',
    gray800: '#1D2939',
    gray900: '#101828',
    gray950: '#0C111D',
    gray975: '#0C111D',
  },
  error: {
    error25: '#FFFBFA',
    error50: '#FEF3F2',
    error100: '#FEE4E2',
    error200: '#FECDCA',
    error300: '#FDA29B',
    error400: '#F97066',
    error500: '#F04438',
    error600: '#D92D20',
    error700: '#B42318',
    error800: '#912018',
    error900: '#7A271A',
    error950: '#55160C',
    error975: '#55160C',
  },
  warning: {
    warning25: '#FFFCF5',
    warning50: '#FFFAEB',
    warning100: '#FEF0C7',
    warning200: '#FEDF89',
    warning300: '#FEC84B',
    warning400: '#FDB022',
    warning500: '#F79009',
    warning600: '#DC6803',
    warning700: '#B54708',
    warning800: '#93370D',
    warning900: '#7A2E0E',
    warning950: '#4E1D09',
    warning975: '#4E1D09',
  },
  success: {
    success25: '#F6FEF9',
    success50: '#ECFDF3',
    success75: '#DAF1BD',
    success100: '#D1FADF',
    success200: '#A6F4C5',
    success300: '#6CE9A6',
    success400: '#32D583',
    success500: '#12B76A',
    success600: '#039855',
    success700: '#027A48',
    success800: '#05603A',
    success900: '#054F31',
    success950: '#053321',
    success975: '#053321',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#D1D5DB',
    tertiary: '#9CA3AF',
  },
};

export const CustomTheme: Theme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    background: theme.brand.brand900,
    text: theme.text.primary,
  },
  fonts: DarkTheme.fonts,
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
