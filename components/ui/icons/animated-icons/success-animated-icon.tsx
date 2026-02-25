import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';
import { theme } from '~/shared/constants/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const SIZE = 200;
const CENTER = SIZE / 2;
const RADIUS = 85;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Checkmark: short down-right leg, long up-right leg
const CHECK_PATH = 'M 55 100 L 83 128 L 145 68';
const CHECK_LENGTH = 130;

interface Props {
  size?: number;
  duration?: number;
}

export default function SuccessAnimatedIcon({ size = 200, duration = 1000 }: Props) {
  const ringProgress = useSharedValue(CIRCUMFERENCE);
  const checkProgress = useSharedValue(CHECK_LENGTH);

  useEffect(() => {
    ringProgress.value = withTiming(0, {
      duration,
      easing: Easing.out(Easing.cubic),
    });

    checkProgress.value = withDelay(
      duration - 100,
      withTiming(0, {
        duration: 400,
        easing: Easing.out(Easing.quad),
      })
    );
  }, []);

  const animatedRingProps = useAnimatedProps(() => ({
    strokeDashoffset: ringProgress.value,
  }));

  const animatedCheckProps = useAnimatedProps(() => ({
    strokeDashoffset: checkProgress.value,
  }));

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${SIZE} ${SIZE}`}>
      <Circle cx={CENTER} cy={CENTER} r={RADIUS} fill="#0D2219" />
      <Circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#1E3D30" strokeWidth={2.5} />

      <AnimatedCircle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        fill="none"
        stroke="#4ECFB3"
        strokeWidth={2.5}
        strokeDasharray={CIRCUMFERENCE}
        strokeLinecap="round"
        transform={`rotate(-90, ${CENTER}, ${CENTER})`}
        animatedProps={animatedRingProps}
      />

      <AnimatedPath
        d={CHECK_PATH}
        fill="none"
        stroke={theme.brand.brand500}
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={CHECK_LENGTH}
        animatedProps={animatedCheckProps}
      />
    </Svg>
  );
}
