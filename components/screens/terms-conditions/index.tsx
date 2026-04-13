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

export default function TermsConditionsScreen() {
  const router = useRouter();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1">
      <ModalScreenNodge />

      <View className="gap-6 px-5 pb-16">
        <View className="items-center gap-1">
          <ThemedText variant="primary" size="title" className="text-center text-2xl font-bold">
            Terms & Conditions
          </ThemedText>
          <ThemedText variant="secondary" className="text-center text-sm">
            Last updated: April 2025
          </ThemedText>
        </View>

        <Body>
          Please read these Terms and Conditions carefully before using Franky. By accessing or
          using the app, you agree to be bound by these terms.
        </Body>

        <Section title="1. Acceptance of Terms">
          <Body>
            By downloading, installing, or using Franky, you confirm that you are at least 13
            years old and agree to these Terms and Conditions. If you do not agree, please
            discontinue use of the app immediately.
          </Body>
        </Section>

        <Section title="2. Description of Service">
          <Body>
            Franky is a personal finance tracking application that allows you to record
            transactions, manage categories, set budgets, and visualize your spending habits.
            All data is stored locally on your device. Franky does not connect to your bank
            accounts or any financial institution.
          </Body>
        </Section>

        <Section title="3. User Responsibilities">
          <Body>
            You are solely responsible for the accuracy of the data you enter into Franky. The
            app is a tool to assist with personal financial awareness — it is not a substitute for
            professional financial advice. You agree not to misuse the app or attempt to interfere
            with its proper functioning.
          </Body>
        </Section>

        <Section title="4. No Financial Advice">
          <Body>
            The information and features provided by Franky are for informational and organizational
            purposes only. Nothing in the app constitutes financial, legal, tax, or investment
            advice. Always consult a qualified professional for decisions related to your finances.
          </Body>
        </Section>

        <Section title="5. Intellectual Property">
          <Body>
            All content, design, code, and branding within Franky are the intellectual property of
            the developers. You may not reproduce, distribute, or create derivative works from any
            part of the app without explicit written permission.
          </Body>
        </Section>

        <Section title="6. Disclaimer of Warranties">
          <Body>
            Franky is provided "as is" and "as available" without warranties of any kind, express
            or implied. We do not guarantee that the app will be error-free, uninterrupted, or
            free from security vulnerabilities. Use the app at your own risk.
          </Body>
        </Section>

        <Section title="7. Limitation of Liability">
          <Body>
            To the maximum extent permitted by applicable law, the developers of Franky shall not
            be liable for any indirect, incidental, special, or consequential damages arising from
            your use of the app, including but not limited to loss of data or financial loss.
          </Body>
        </Section>

        <Section title="8. Data & Privacy">
          <Body>
            Your use of Franky is also governed by our Privacy Policy, which is incorporated into
            these Terms by reference. By using the app, you consent to the data practices
            described in the Privacy Policy.
          </Body>
        </Section>

        <Section title="9. Termination">
          <Body>
            You may stop using Franky at any time by uninstalling the app. We reserve the right
            to discontinue or modify the app at any time without notice. Upon uninstallation, all
            locally stored data will be removed from your device.
          </Body>
        </Section>

        <Section title="10. Changes to These Terms">
          <Body>
            We may revise these Terms and Conditions periodically. The "Last updated" date at the
            top of this page reflects the most recent revision. Continued use of the app after
            changes are posted constitutes your acceptance of the updated terms.
          </Body>
        </Section>

        <Section title="11. Governing Law">
          <Body>
            These Terms shall be governed by and construed in accordance with applicable laws.
            Any disputes arising from these Terms or your use of Franky shall be resolved through
            good-faith negotiation or, if necessary, through the courts of competent jurisdiction.
          </Body>
        </Section>

        <Section title="12. Contact">
          <Body>
            If you have questions about these Terms and Conditions, please contact us through the
            app's support channels.
          </Body>
        </Section>
      </View>
    </ScrollView>
  );
}
