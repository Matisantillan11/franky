import { HomeIcon } from 'lucide-react-native';
import { IconProps } from '~/shared/types/icon-props.types';

export default function Home({ ...rest }: IconProps) {
  return <HomeIcon {...rest} />;
}
