import { UsersIcon } from 'lucide-react-native';
import { IconProps } from '~/shared/types/icon-props.types';

export default function People({ ...rest }: IconProps) {
  return <UsersIcon {...rest} />;
}
