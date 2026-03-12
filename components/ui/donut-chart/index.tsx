import React, { useMemo } from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { BlurView } from '~/components/blur-circle';
import ThemedText from '../themed-text';
import {
  ARC_RADIUS,
  CENTER,
  CHART_SIZE,
  CIRCUMFERENCE,
  SEGMENT_GAP,
  STROKE_WIDTH,
} from './constants';
import { DonutChartProps } from './types';

export default function DonutChart({ data, centerLabel }: DonutChartProps) {
  const segments = useMemo(() => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    if (!total) return [];
    const usableArc = CIRCUMFERENCE - data.length * SEGMENT_GAP;
    let cumulativeArc = 0;
    return data.map((segment) => {
      const segmentLength = Math.max(0, (segment.value / total) * usableArc);
      const startAngle = (cumulativeArc / CIRCUMFERENCE) * 360 - 90;
      cumulativeArc += segmentLength + SEGMENT_GAP;
      return { color: segment.color, startAngle, segmentLength };
    });
  }, [data]);

  return (
    <View className="items-center justify-center">
      <BlurView left={-10} top={-60} size={380} intensity={30} />
      <Svg width={CHART_SIZE} height={CHART_SIZE}>
        <Circle cx={CENTER} cy={CENTER} r={ARC_RADIUS - STROKE_WIDTH / 2} fill="transparent" />
        {segments.map((segment, i) => (
          <Circle
            key={i}
            cx={CENTER}
            cy={CENTER}
            r={ARC_RADIUS}
            fill="none"
            stroke={segment.color}
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={`${segment.segmentLength} ${CIRCUMFERENCE}`}
            strokeLinecap="round"
            transform={`rotate(${segment.startAngle} ${CENTER} ${CENTER})`}
          />
        ))}
      </Svg>
      <View className="absolute items-center">
        <ThemedText variant="primary" className="text-lg font-bold">
          {centerLabel}
        </ThemedText>
      </View>
    </View>
  );
}
