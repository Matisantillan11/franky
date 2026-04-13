import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';

import ModalScreenNodge from '~/components/modal-screen-nodge';
import { ThemedText } from '~/components/ui';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-2">
      <ThemedText variant="primary" className="text-base font-semibold">
        {title}
      </ThemedText>
      {children}
    </View>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <ThemedText variant="secondary" className="text-sm leading-6">
      {children}
    </ThemedText>
  );
}

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1">
      <ModalScreenNodge />

      <View className="gap-6 px-5 pb-16">
        <View className="items-center gap-1">
          <ThemedText variant="primary" size="title" className="text-center text-2xl font-bold">
            Privacy Policy
          </ThemedText>
          <ThemedText variant="secondary" className="text-center text-sm">
            Last updated: April 2025
          </ThemedText>
        </View>

        <Body>
          Franky is a personal finance tracker designed to help you manage your income, expenses,
          and budget. Your privacy is important to us. This policy explains what data we collect,
          how we use it, and your rights.
        </Body>

        <Section title="1. Information We Collect">
          <Body>
            Franky stores all your financial data — transactions, categories, budgets, and settings
            — locally on your device using an encrypted SQLite database. We do not upload your
            personal financial information to any external server.
          </Body>
          <Body>
            We collect limited, anonymized usage data to improve the app experience. This includes:
            {'\n'}- App events (e.g., screens visited, features used){'\n'}- Crash reports and
            error logs{'\n'}- Device type, OS version, and app version
          </Body>
        </Section>

        <Section title="2. Analytics">
          <Body>
            We use PostHog to collect anonymized analytics about how users interact with Franky.
            This data helps us understand which features are most useful and where improvements are
            needed. No personally identifiable information (PII) is sent to PostHog.
          </Body>
        </Section>

        <Section title="3. Error Tracking">
          <Body>
            We use Sentry to capture crash reports and error logs. When the app encounters an
            unexpected error, diagnostic information (stack traces, device info, app state) is sent
            to Sentry to help us identify and fix issues quickly. This data does not include your
            financial information.
          </Body>
        </Section>

        <Section title="4. Data Storage & Security">
          <Body>
            All your financial data is stored exclusively on your device. We do not have access to
            your transactions, categories, balances, or any other personal financial records. If
            you delete the app, all locally stored data is permanently removed.
          </Body>
        </Section>

        <Section title="5. Third-Party Services">
          <Body>
            Franky integrates the following third-party services:{'\n'}- PostHog — anonymized
            analytics{'\n'}- Sentry — error and crash reporting{'\n\n'}
            Each service operates under its own privacy policy. We encourage you to review their
            respective policies for more information.
          </Body>
        </Section>

        <Section title="6. Children's Privacy">
          <Body>
            Franky is not directed to children under the age of 13. We do not knowingly collect
            information from children. If you believe a child has used the app and provided
            personal data, please contact us so we can address it promptly.
          </Body>
        </Section>

        <Section title="7. Your Rights">
          <Body>
            Since all financial data is stored locally on your device, you have full control over
            it. You can clear all your data at any time from the Settings screen. For any concerns
            related to anonymized analytics data, you may contact us directly.
          </Body>
        </Section>

        <Section title="8. Changes to This Policy">
          <Body>
            We may update this Privacy Policy from time to time. When we do, we will update the
            "Last updated" date at the top of this page. Continued use of Franky after changes
            are made constitutes your acceptance of the revised policy.
          </Body>
        </Section>

        <Section title="9. Contact">
          <Body>
            If you have any questions or concerns about this Privacy Policy, please reach out to us
            through the app's support channels.
          </Body>
        </Section>
      </View>
    </ScrollView>
  );
}
