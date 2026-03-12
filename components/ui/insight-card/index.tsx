import { BrainCircuit } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { theme } from '~/shared/constants/theme';
import ThemedText from '../themed-text';

type InsightCardProps = {
  percentage: number;
};

function getInsight(percentage: number): {
  percentageColor: string;
  headline: string;
  subtitle: string;
} {
  if (percentage > 100) {
    return {
      percentageColor: theme.error.error400,
      headline: "You've exceeded your budget!",
      subtitle: 'Try to cut back on spending to recover.',
    };
  }
  if (percentage > 75) {
    return {
      percentageColor: theme.error.error400,
      headline: "You're close to your limit!",
      subtitle: 'Consider reducing your expenses.',
    };
  }
  if (percentage > 50) {
    return {
      percentageColor: theme.warning.warning400,
      headline: 'Spend mindfully.',
      subtitle: "You're approaching your budget limit.",
    };
  }
  return {
    percentageColor: theme.brand.brand400,
    headline: 'You are on track!',
    subtitle: 'Keep it up to reach your savings goal.',
  };
}

export default function InsightCard({ percentage }: InsightCardProps) {
  const clampedPercentage = Math.max(0, percentage);
  const displayPercentage = Math.round(clampedPercentage);
  const { percentageColor, headline, subtitle } = getInsight(clampedPercentage);

  return (
    <View className="bg-brand-brand800/60 gap-3 overflow-hidden rounded-2xl px-4 pt-4 pb-5">
      <View className="flex-row items-center gap-2">
        <BrainCircuit size={18} color={theme.brand.brand400} />
        <ThemedText
          className="text-xs font-semibold tracking-widest"
          style={{ color: theme.brand.brand400 }}
        >
          INSIGHT
        </ThemedText>
      </View>

      <ThemedText variant="primary" className="text-lg leading-9 font-bold">
        {"You've used "}
        <ThemedText
          variant="primary"
          className="text-lg font-bold"
          style={{ color: percentageColor }}
        >
          {displayPercentage}%
        </ThemedText>
        {' of your income this month. '}
        {headline}
      </ThemedText>

      <ThemedText className="text-sm" style={{ color: theme.text.tertiary }}>
        {subtitle}
      </ThemedText>
    </View>
  );
}
