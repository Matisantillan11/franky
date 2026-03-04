import Button from '../button';
import { BadgeProps } from './types';

export default function Badge({ leftIcon, rightIcon, text, ...props }: BadgeProps) {
  return (
    <Button
      {...props}
      size="icon"
      variant="outline"
      leftIcon={leftIcon}
      className="border-gray-gray50 flex items-center justify-center border border-dashed pl-1"
    />
  );
}
