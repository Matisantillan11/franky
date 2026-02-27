import { SettingsIcon } from 'lucide-react-native';
import { IconProps } from '~/shared/types/icon-props.types';

export default function Settings({ ...rest }: IconProps) {
  return <SettingsIcon {...rest} />;
}
