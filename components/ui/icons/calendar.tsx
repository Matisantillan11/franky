import { CalendarDaysIcon } from 'lucide-react-native';
import { IconProps } from '~/shared/types/icon-props.types';

export default function Calendar({ ...rest }: IconProps) {
  return <CalendarDaysIcon {...rest} />;
}
