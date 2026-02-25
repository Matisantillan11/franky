import { ReceiptTextIcon } from 'lucide-react-native';
import { IconProps } from '~/shared/types/icon-props.types';

export default function Receipt({ ...rest }: IconProps) {
  return <ReceiptTextIcon {...rest} />;
}
