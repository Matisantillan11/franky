import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

// Pivot points: where each leaf meets the stem base
const LEFT_PIVOT = { x: 56.9308, y: 61.5098 };
const RIGHT_PIVOT = { x: 63.9998, y: 61.51 };

export function AnimatedSeedingIcon() {
  const leftRotation = useSharedValue(0);
  const rightRotation = useSharedValue(0);

  useEffect(() => {
    leftRotation.value = withRepeat(
      withSequence(
        withTiming(4, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.sin) })
      ),
      -1
    );

    rightRotation.value = withDelay(
      500,
      withRepeat(
        withSequence(
          withTiming(-4, { duration: 2300, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration: 2300, easing: Easing.inOut(Easing.sin) })
        ),
        -1
      )
    );
  }, []);

  // SVG rotate(angle, cx, cy) rotates around the given pivot point
  const leftLeafProps = useAnimatedProps(() => ({
    transform: `rotate(${leftRotation.value}, ${LEFT_PIVOT.x}, ${LEFT_PIVOT.y})`,
  }));

  const rightLeafProps = useAnimatedProps(() => ({
    transform: `rotate(${rightRotation.value}, ${RIGHT_PIVOT.x}, ${RIGHT_PIVOT.y})`,
  }));

  return (
    <Svg width="121" height="104" viewBox="0 0 121 104" fill="none">
      <Defs>
        <LinearGradient
          id="paint0_linear_210_3"
          x1="60.4697"
          y1="64"
          x2="60.4697"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#00E7D4" />
          <Stop offset="1" stopColor="#00E7D4" stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Rect x="56.4697" width="8" height="64" rx="4" fill="url(#paint0_linear_210_3)" />
      <AnimatedPath
        animatedProps={leftLeafProps}
        opacity={0.8}
        d="M-3.48188e-05 98.4811C5.51164 72.5507 31.0004 55.9981 56.9308 61.5098C51.4191 87.4402 25.9303 103.993 -3.48188e-05 98.4811Z"
        fill="#00E7D4"
      />
      <AnimatedPath
        animatedProps={rightLeafProps}
        opacity={0.8}
        d="M63.9998 61.51C89.9301 55.9983 115.419 72.5509 120.931 98.4813C95.0002 103.993 69.5114 87.4404 63.9998 61.51Z"
        fill="#B3FFF3"
      />
    </Svg>
  );
}
