import type { TFunction } from 'i18next';
import { CalendarIcon, Receipt, Saving, Shrub } from '~/components/ui';
import { theme } from '~/shared/constants/theme';
import { GoalType } from '~/shared/types/settings.types';

export const getGoalOptions = (t: TFunction) => [
  {
    id: GoalType.PLAN,
    title: t('onboarding.step6.plan.title'),
    description: t('onboarding.step6.plan.description'),
    icon: <CalendarIcon color={theme.gray.gray100} />,
    disabled: false,
  },
  {
    id: GoalType.DAILY,
    title: t('onboarding.step6.daily.title'),
    description: t('onboarding.step6.daily.description'),
    icon: <Receipt color={theme.gray.gray100} />,
    disabled: false,
  },
  {
    id: GoalType.SAVINGS,
    title: t('onboarding.step6.savings.title'),
    description: t('onboarding.step6.savings.description'),
    icon: <Saving color={theme.gray.gray100} />,
    disabled: false,
  },
  {
    id: GoalType.UNKNOWN,
    title: t('onboarding.step6.other.title'),
    description: t('onboarding.step6.other.description'),
    icon: <Shrub color={theme.gray.gray100} />,
    disabled: false,
  },
];
