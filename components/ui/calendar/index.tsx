import React, { useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { FullWindowOverlay } from 'react-native-screens';
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

const SHORTCUTS = ['Today', '1 day ago', '2 days ago'] as const;
type Shortcut = (typeof SHORTCUTS)[number];

function getDateForShortcut(shortcut: Shortcut): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  if (shortcut === '1 day ago') date.setDate(date.getDate() - 1);
  if (shortcut === '2 days ago') date.setDate(date.getDate() - 2);
  return date;
}

function matchShortcut(date: Date): Shortcut | null {
  for (const shortcut of SHORTCUTS) {
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

function formatDate(date: Date): string {
  const shortcut = matchShortcut(date);
  if (shortcut) return shortcut;
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

export default function Calendar({ value, onChange, label }: CalendarProps) {
  const [date, setDate] = useState<Date>(value ?? new Date());
  const bottomSheetRef = useRef<BottomSheetModal | null>(null);

  const handleOpen = () => {
    bottomSheetRef.current?.present();
  };

  const handleShortcut = (shortcut: Shortcut) => {
    const newDate = getDateForShortcut(shortcut);
    setDate(newDate);
    onChange?.(newDate);
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
        <View className="flex-1 gap-4 p-4">
          <View className="flex-row gap-2">
            {SHORTCUTS.map((shortcut) => (
              <Button key={shortcut} variant="outline" onPress={() => handleShortcut(shortcut)}>
                {shortcut}
              </Button>
            ))}
          </View>
          <DatePicker date={date} onDateChange={handleDateChange} mode="date" theme="dark" />
        </View>

        <View className="flex-1">
          <Button onPress={() => bottomSheetRef.current?.dismiss()}>Save date</Button>
        </View>
      </Modal>
    </>
  );
}
