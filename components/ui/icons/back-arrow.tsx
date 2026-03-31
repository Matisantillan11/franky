import { ArrowLeftIcon } from 'lucide-react-native';
import { IconProps } from '~/shared/types/icon-props.types';

export default function BackArrow({ ...rest }: IconProps) {
  return <ArrowLeftIcon {...rest} />;
}
