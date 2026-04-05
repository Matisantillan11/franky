import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import Svg, { Circle } from 'react-native-svg';
import { Trash } from '~/components/ui';
import { theme } from '~/shared/constants/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SIZE = 200;
const CENTER = SIZE / 2;
const RADIUS = 85;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function DeleteLoaderIcon({ size = 200 }: { size?: number }) {
  const rotation = useSharedValue(0);
  const strokeOffset = useSharedValue(CIRCUMFERENCE);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1500, easing: Easing.linear }),
      -1,
      false
    );
    strokeOffset.value = withRepeat(
      withTiming(CIRCUMFERENCE * 0.4, { duration: 1000, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );
  }, []);

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: strokeOffset.value,
    transform: `rotate(${rotation.value}, ${CENTER}, ${CENTER})`,
  }));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: size, height: size, position: 'absolute' }}>
        <Svg width={size} height={size} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          {/* Background circle */}
          <Circle cx={CENTER} cy={CENTER} r={RADIUS} fill="#1A0A0A" />
          <Circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#2D1414" strokeWidth={4} />

          {/* Animated spinning loader */}
          <AnimatedCircle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke={theme.error.error500}
            strokeWidth={4}
            strokeDasharray={CIRCUMFERENCE}
            strokeLinecap="round"
            animatedProps={animatedCircleProps}
          />
        </Svg>
      </View>
      <Trash size={size * 0.4} color={theme.error.error500} />
    </View>
  );
}
