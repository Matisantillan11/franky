import { BellIcon } from 'lucide-react-native';
import { IconProps } from '~/shared/types/icon-props.types';

export default function Notifications({ ...rest }: IconProps) {
  return <BellIcon {...rest} />;
}
