import * as icons from 'lucide-react-native/icons';
import React, { useEffect, useRef } from 'react';
import { Animated, ColorValue, View } from 'react-native';
import ThemedText from '../themed-text';

type ExpenseCardProps = {
  icon: string;
  category: string;
  amount: string;
  color: string;
  progress: number; // 0 to 1
};

export default function ExpenseCard({ icon, category, amount, color, progress }: ExpenseCardProps) {
  const LucideIcon = icons[icon as keyof typeof icons] as React.ComponentType<{
    size?: number;
    color?: ColorValue;
  }>;
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const barWidth = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View className="bg-brand-brand800/60 gap-3 overflow-hidden rounded-2xl px-4 pt-4 pb-3">
      <View className="flex-row items-center gap-3">
        <View
          className="h-11 w-11 items-center justify-center rounded-full"
          style={{ backgroundColor: color + '15' }}
        >
          {LucideIcon && <LucideIcon size={20} color={color as ColorValue} />}
        </View>
        <ThemedText variant="primary" className="flex-1 text-base font-bold">
          {category}
        </ThemedText>
        <ThemedText variant="primary" className="text-base font-bold">
          {amount}
        </ThemedText>
      </View>

      <View className="bg-brand-brand700 h-1.5 overflow-hidden rounded-full">
        <Animated.View
          className="h-full rounded-full"
          style={{ width: barWidth, backgroundColor: color }}
        />
      </View>
    </View>
  );
}
