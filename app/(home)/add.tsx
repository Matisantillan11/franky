import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useRef } from 'react';
import { View } from 'react-native';

/**
 * This screen acts as a trigger for the Add Transaction modal.
 *
 * - First focus (user taps the "+" tab): pushes the modal.
 * - Subsequent focus (returning from the modal): navigates to stats
 *   so the "+" tab never stays selected.
 */
export default function AddTrigger() {
  const modalOpened = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (!modalOpened.current) {
        modalOpened.current = true;
        router.push('/add-transaction');
      } else {
        modalOpened.current = false;
        router.back();
      }
    }, [])
  );

  return <View style={{ flex: 1 }} />;
}
