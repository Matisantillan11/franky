import { WalletIcon } from 'lucide-react-native';
import { IconProps } from '~/shared/types/icon-props.types';

export default function Wallet({ ...rest }: IconProps) {
  return <WalletIcon {...rest} />;
}
