import React, { useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { FullWindowOverlay } from 'react-native-screens';
import { useTranslation } from 'react-i18next';
import { cn } from '~/shared/utils/tailwind';
import Button from '../button';
import Modal from '../modal';
import { BottomSheetModal } from '../modal/types';
import ThemedText from '../themed-text';
import { CalendarProps } from './types';

const containerComponent =
  Platform.OS === 'ios'
    ? (FullWindowOverlay as React.ComponentType<React.PropsWithChildren>)
    : undefined;

const SHORTCUT_KEYS = ['today', 'oneDayAgo', 'twoDaysAgo'] as const;
type ShortcutKey = (typeof SHORTCUT_KEYS)[number];

function getDateForShortcut(shortcut: ShortcutKey): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  if (shortcut === 'oneDayAgo') date.setDate(date.getDate() - 1);
  if (shortcut === 'twoDaysAgo') date.setDate(date.getDate() - 2);
  return date;
}

function matchShortcut(date: Date): ShortcutKey | null {
  for (const shortcut of SHORTCUT_KEYS) {
    const target = getDateForShortcut(shortcut);
    if (
      date.getFullYear() === target.getFullYear() &&
      date.getMonth() === target.getMonth() &&
      date.getDate() === target.getDate()
    ) {
      return shortcut;
    }
  }
  return null;
}

export default function Calendar({ value, onChange, label }: CalendarProps) {
  const [date, setDate] = useState<Date>(value ?? new Date());
  const bottomSheetRef = useRef<BottomSheetModal | null>(null);
  const { t, i18n } = useTranslation();

  const shortcutLabels: Record<ShortcutKey, string> = {
    today: t('calendar.today'),
    oneDayAgo: t('calendar.oneDayAgo'),
    twoDaysAgo: t('calendar.twoDaysAgo'),
  };

  const locale = i18n.language === 'es' ? 'es-ES' : 'en-US';

  const formatDate = (d: Date): string => {
    const shortcut = matchShortcut(d);
    if (shortcut) return shortcutLabels[shortcut];
    return d.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleOpen = () => {
    bottomSheetRef.current?.present();
  };

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    onChange?.(newDate);
  };

  return (
    <>
      <View className="w-full items-start">
        {label ? (
          <ThemedText className={cn('text-gray-gray500 dark:text-gray-gray400 mb-1 font-medium')}>
            {label}
          </ThemedText>
        ) : null}

        <Button variant="ghost" onPress={handleOpen}>
          {formatDate(date)}
        </Button>
      </View>

      <Modal ref={bottomSheetRef} containerComponent={containerComponent}>
        <View className="flex-1 gap-4 px-4">
          <DatePicker date={date} onDateChange={handleDateChange} mode="date" theme="dark" locale={locale} />
        </View>

        <View className="flex-1">
          <Button onPress={() => bottomSheetRef.current?.dismiss()}>{t('calendar.saveDate')}</Button>
        </View>
      </Modal>
    </>
  );
}
