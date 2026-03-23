import { CalendarIcon, Receipt, Saving, Shrub } from '~/components/ui';
import { theme } from '~/shared/constants/theme';
import { GoalType } from '~/shared/types/settings.types';

export const GOAL_OPTIONS = [
  {
    id: GoalType.PLAN,
    title: 'Plan my monthly expenses',
    description: 'Organize bills and recurring costs.',
    icon: <CalendarIcon color={theme.gray.gray100} />,
    disabled: false,
  },
  {
    id: GoalType.DAILY,
    title: 'Track daily expenses',
    description: 'Monitor where every cent goes.',
    icon: <Receipt color={theme.gray.gray100} />,
    disabled: false,
  },
  {
    id: GoalType.SAVINGS,
    title: 'Save more',
    description: 'Build your nest egg for the future.',
    icon: <Saving color={theme.gray.gray100} />,
    disabled: false,
  },
  {
    id: GoalType.UNKNOWN,
    title: 'Other',
    description: "I don't have an specific goal in mind.",
    icon: <Shrub color={theme.gray.gray100} />,
    disabled: false,
  },
];
