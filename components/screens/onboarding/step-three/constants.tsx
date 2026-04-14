import type { TFunction } from 'i18next';
import { theme } from '~/shared/constants/theme';
import { BudgetType } from '~/shared/types/settings.types';
import { People, User } from '../../../ui';

export const getBudgetOptions = (t: TFunction) => [
  {
    id: BudgetType.PERSONAL,
    title: t('onboarding.step3.personal.title'),
    description: t('onboarding.step3.personal.description'),
    icon: <User color={theme.gray.gray100} />,
    disabled: false,
  },
  {
    id: BudgetType.SHARED,
    title: t('onboarding.step3.shared.title'),
    description: t('onboarding.step3.shared.description'),
    icon: <People color={theme.gray.gray100} />,
    disabled: true,
  },
];
