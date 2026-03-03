import Button from '../button';
import { BadgeProps } from './types';

export default function Badge({ leftIcon, rightIcon, text, ...props }: BadgeProps) {
  return (
    <Button
      {...props}
      variant="outline"
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      className="border-gray-gray50 flex-row items-center justify-center gap-2 border border-dashed px-4"
    >
      {text}
    </Button>
  );
}
