import { theme } from '~/shared/constants/theme';
import { People, User } from '../../../ui';

export enum BUDGET_OPTION {
  PERSONAL = 'personal',
  SHARED = 'shared',
}

export const BUDGET_OPTIONS = [
  {
    id: BUDGET_OPTION.PERSONAL,
    title: 'Personal Budget',
    description: 'For individual tracking.',
    icon: <User color={theme.gray.gray100} />,
    disabled: false,
  },
  {
    id: BUDGET_OPTION.SHARED,
    title: 'Shared Budget',
    description: 'For couples or roommates',
    icon: <People color={theme.gray.gray100} />,
    disabled: true,
  },
];
