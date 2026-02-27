import { PlusIcon } from 'lucide-react-native';
import { IconProps } from '~/shared/types/icon-props.types';

export default function Plus({ ...rest }: IconProps) {
  return <PlusIcon {...rest} />;
}
