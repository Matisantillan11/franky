import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import ModalScreenNodge from '~/components/modal-screen-nodge';
import { ThemedText } from '~/components/ui';

function Section({ title, body }: { title: string; body: string }) {
  return (
    <View className="gap-2">
      <ThemedText variant="primary" className="text-base font-semibold">
        {title}
      </ThemedText>
      <ThemedText variant="secondary" className="text-sm leading-6">
        {body}
      </ThemedText>
    </View>
  );
}

export default function TermsConditionsScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1">
      <ModalScreenNodge />

      <View className="gap-6 px-5 pb-16">
        <View className="items-center gap-1">
          <ThemedText variant="primary" size="title" className="text-center text-2xl font-bold">
            {t('terms.title')}
          </ThemedText>
          <ThemedText variant="secondary" className="text-center text-sm">
            {t('terms.lastUpdated')}
          </ThemedText>
        </View>

        <ThemedText variant="secondary" className="text-sm leading-6">
          {t('terms.intro')}
        </ThemedText>

        <Section
          title={t('terms.sections.acceptance.title')}
          body={t('terms.sections.acceptance.body')}
        />
        <Section
          title={t('terms.sections.description.title')}
          body={t('terms.sections.description.body')}
        />
        <Section
          title={t('terms.sections.userResponsibilities.title')}
          body={t('terms.sections.userResponsibilities.body')}
        />
        <Section
          title={t('terms.sections.noFinancialAdvice.title')}
          body={t('terms.sections.noFinancialAdvice.body')}
        />
        <Section
          title={t('terms.sections.ip.title')}
          body={t('terms.sections.ip.body')}
        />
        <Section
          title={t('terms.sections.warranty.title')}
          body={t('terms.sections.warranty.body')}
        />
        <Section
          title={t('terms.sections.liability.title')}
          body={t('terms.sections.liability.body')}
        />
        <Section
          title={t('terms.sections.privacy.title')}
          body={t('terms.sections.privacy.body')}
        />
        <Section
          title={t('terms.sections.termination.title')}
          body={t('terms.sections.termination.body')}
        />
        <Section
          title={t('terms.sections.changes.title')}
          body={t('terms.sections.changes.body')}
        />
        <Section
          title={t('terms.sections.governingLaw.title')}
          body={t('terms.sections.governingLaw.body')}
        />
        <Section
          title={t('terms.sections.contact.title')}
          body={t('terms.sections.contact.body')}
        />
      </View>
    </ScrollView>
  );
}
