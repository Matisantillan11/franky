import { UserIcon } from 'lucide-react-native';
import { IconProps } from '~/shared/types/icon-props.types';

export default function User({ ...rest }: IconProps) {
  return <UserIcon {...rest} />;
}
