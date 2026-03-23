import { TrashIcon } from 'lucide-react-native';
import { IconProps } from '~/shared/types/icon-props.types';

export default function Trash({ ...rest }: IconProps) {
  return <TrashIcon {...rest} />;
}
