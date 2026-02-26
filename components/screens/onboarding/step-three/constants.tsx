import { theme } from '~/shared/constants/theme';
import { BudgetType } from '~/shared/types/settings.types';
import { People, User } from '../../../ui';

export const BUDGET_OPTIONS = [
  {
    id: BudgetType.PERSONAL,
    title: 'Personal Budget',
    description: 'For individual tracking.',
    icon: <User color={theme.gray.gray100} />,
    disabled: false,
  },
  {
    id: BudgetType.SHARED,
    title: 'Shared Budget',
    description: 'For couples or roommates',
    icon: <People color={theme.gray.gray100} />,
    disabled: true,
  },
];
