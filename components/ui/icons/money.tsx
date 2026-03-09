import { BanknoteIcon } from 'lucide-react-native';
import { IconProps } from '~/shared/types/icon-props.types';

export default function Money({ ...rest }: IconProps) {
  return <BanknoteIcon {...rest} />;
}
