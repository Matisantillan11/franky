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

export default function PrivacyPolicyScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1">
      <ModalScreenNodge />

      <View className="gap-6 px-5 pb-16">
        <View className="items-center gap-1">
          <ThemedText variant="primary" size="title" className="text-center text-2xl font-bold">
            {t('privacy.title')}
          </ThemedText>
          <ThemedText variant="secondary" className="text-center text-sm">
            {t('privacy.lastUpdated')}
          </ThemedText>
        </View>

        <ThemedText variant="secondary" className="text-sm leading-6">
          {t('privacy.intro')}
        </ThemedText>

        <Section
          title={t('privacy.sections.infoCollected.title')}
          body={t('privacy.sections.infoCollected.body')}
        />
        <Section
          title={t('privacy.sections.analytics.title')}
          body={t('privacy.sections.analytics.body')}
        />
        <Section
          title={t('privacy.sections.errorTracking.title')}
          body={t('privacy.sections.errorTracking.body')}
        />
        <Section
          title={t('privacy.sections.dataStorage.title')}
          body={t('privacy.sections.dataStorage.body')}
        />
        <Section
          title={t('privacy.sections.thirdParty.title')}
          body={t('privacy.sections.thirdParty.body')}
        />
        <Section
          title={t('privacy.sections.children.title')}
          body={t('privacy.sections.children.body')}
        />
        <Section
          title={t('privacy.sections.yourRights.title')}
          body={t('privacy.sections.yourRights.body')}
        />
        <Section
          title={t('privacy.sections.changes.title')}
          body={t('privacy.sections.changes.body')}
        />
        <Section
          title={t('privacy.sections.contact.title')}
          body={t('privacy.sections.contact.body')}
        />
      </View>
    </ScrollView>
  );
}
