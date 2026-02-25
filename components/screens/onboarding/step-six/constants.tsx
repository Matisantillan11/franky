import { Calendar, Receipt, Saving, Shrub } from '~/components/ui';
import { theme } from '~/shared/constants/theme';

export enum GOAL_OPTION {
  PLAN = 'PLAN_MY_EXPENSES',
  DAILY = 'DAILY_TRACKING',
  SAVINGS = 'SAVE_MORE',
  UNKNOWN = 'UNKNOWN',
}

export const GOAL_OPTIONS = [
  {
    id: GOAL_OPTION.PLAN,
    title: 'Plan my monthly expenses',
    description: 'Organize bills and recurring costs.',
    icon: <Calendar color={theme.gray.gray100} />,
    disabled: false,
  },
  {
    id: GOAL_OPTION.DAILY,
    title: 'Track daily expenses',
    description: 'Monitor where every cent goes.',
    icon: <Receipt color={theme.gray.gray100} />,
    disabled: false,
  },
  {
    id: GOAL_OPTION.SAVINGS,
    title: 'Save more',
    description: 'Build your nest egg for the future.',
    icon: <Saving color={theme.gray.gray100} />,
    disabled: false,
  },
  {
    id: GOAL_OPTION.UNKNOWN,
    title: 'Other',
    description: "I don't have an specific goal in mind.",
    icon: <Shrub color={theme.gray.gray100} />,
    disabled: false,
  },
];
