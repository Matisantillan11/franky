const en = {
  onboarding: {
    step1: {
      title: "Money, without the stress",
      subtitle: "A calm way to understand, plan and share your money.",
    },
    step2: {
      title: "Your data is yours",
      subtitle:
        "We don't track any of your data. Everything remains private, secure, and stays only on your device.",
    },
    step3: {
      title: "How would you like to budget?",
      subtitle: "Choose the setup that best fits your financial journey right now.",
      personal: { title: "Personal Budget", description: "For individual tracking." },
      shared: { title: "Shared Budget", description: "For couples or roommates" },
    },
    step4: {
      title: "Choose your currency",
      subtitle: "Select the main currency you use for your daily expenses.",
    },
    step5: {
      title: "What's your monthly income?",
      subtitle: "This helps us calculate your monthly spending power.",
    },
    step6: {
      title: "What's your main goal?",
      subtitle: "This helps us personalize your experience",
      plan: { title: "Plan my monthly expenses", description: "Organize bills and recurring costs." },
      daily: { title: "Track daily expenses", description: "Monitor where every cent goes." },
      savings: { title: "Save more", description: "Build your nest egg for the future." },
      other: { title: "Other", description: "I don't have a specific goal in mind." },
    },
    actions: {
      getStarted: "Get started",
      gotIt: "Got it!",
      next: "Next",
      confirmAndSave: "Confirm & Save",
    },
    legal: {
      disclaimer: "By continuing you agree to our",
      terms: "Terms & Conditions",
      and: "and",
      privacy: "Privacy Policy",
    },
  },
  success: {
    title: "You're all set!",
    subtitle: "Your budget is now clear and ready",
    goToDashboard: "Go to my dashboard",
  },
  home: {
    remainingBudget: "Remaining monthly budget",
    income: "Income: {{amount}}",
    spent: "Spent: {{amount}}",
    recentTransactions: "Recent transactions",
    emptyState: {
      title: "Ready to grow?",
      subtitle:
        "Your financial journey starts with a single entry. Add an expense to see your insights bloom.",
      button: "Plant your first entry",
    },
  },
  stats: {
    title: "Stats",
    empty: "Your spending insights will appear here.",
  },
  budget: {
    title: "Budget",
    empty: "Manage your budget here.",
  },
  settings: {
    title: "Settings",
    account: {
      title: "Account",
      currency: { title: "Currency", description: "Primary display currency" },
      monthlyIncome: { title: "Monthly Income", description: "See your budget baseline" },
    },
    preferences: {
      title: "Preferences",
      categories: { title: "Categories", description: "Manage expense and income categories" },
      language: { title: "Language", description: "Change app language" },
    },
    legal: {
      title: "Legal",
      privacy: { title: "Privacy Policy", description: "How we handle your data" },
      terms: { title: "Terms & Conditions", description: "Rules for using Franky" },
    },
    clearData: {
      button: "Clear all my data",
      modal: {
        title: "Permanent Reset",
        description:
          "This will wipe your entire history, including custom categories. Only proceed if you want to start your workspace from scratch.",
        confirm: "Clear everything",
      },
      deleting: {
        title: "Clearing all your data...",
        subtitle: "This will only take a few moments",
      },
      deleted: {
        title: "All data cleared!",
        subtitle: "Redirecting you to onboarding",
      },
    },
  },
  language: {
    title: "Language",
    subtitle: "Choose your preferred language",
    en: "English",
    es: "Español",
  },
  transaction: {
    category: "Category",
    totalAmount: "Total amount",
    placeholder: "$ 0.00",
    expense: "Expense",
    income: "Income",
    date: "Date",
    notes: "Notes",
    notesPlaceholder: "What was this for? Add any extra details...",
    submit: "Add transaction",
    success: {
      title: "Transaction saved successfully",
      description:
        "Your transaction has been saved successfully. Go to your dashboard to see your updated balance.",
    },
    error: {
      title: "Error saving transaction",
      description:
        "Something went wrong while saving your transaction. Please try again later.",
    },
    noTransactions: "No transactions",
    today: "Today",
    yesterday: "Yesterday",
  },
  category: {
    add: {
      title: "New Category",
      subtitle: "Personalize your spending tracker",
      nameLabel: "Category Name",
      namePlaceholder: "Enter category name",
      chooseColor: "Choose Color",
      tapToChangeIcon: "Tap to change icon",
      creating: "Creating...",
      create: "Create Category",
      defaultName: "Category",
      error: "There was an error creating your category. Please, try again later.",
    },
    all: {
      title: "Categories",
      income: "Income",
      expense: "Expense",
      both: "Income & Expense",
      empty: "No categories",
      addNew: "Add new category",
    },
  },
  currency: {
    update: {
      title: "Update your preferred currency",
      subtitle: "Select the main currency you use for your daily expenses.",
      save: "Save",
      saving: "Saving...",
      error: "Error uploading your currency, please try again later",
    },
    names: {
      argentinePeso: 'Argentine Peso',
      euro: 'Euro',
      dollar: 'US Dollar',
      pound: 'British Pound',
      yen: 'Japanese Yen',
      rupee: 'Indian Rupee',
    },
  },
  income: {
    update: {
      title: "What's your monthly income?",
      subtitle: "This helps us calculate your monthly spending power.",
      save: "Save",
      saving: "Saving...",
      error: "Error uploading your monthly income, please try again later",
    },
  },
  calendar: {
    today: 'Today',
    oneDayAgo: '1 day ago',
    twoDaysAgo: '2 days ago',
    saveDate: 'Save date',
  },
  iconPicker: {
    title: "Choose Icon",
    searchPlaceholder: "Search icons...",
  },
  colorPicker: {
    title: "Choose Color",
    selectButton: "Select Color",
  },
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: April 2025",
    intro:
      "Franky is a personal finance tracker designed to help you manage your income, expenses, and budget. Your privacy is important to us. This policy explains what data we collect, how we use it, and your rights.",
    sections: {
      infoCollected: {
        title: "1. Information We Collect",
        body: "Franky stores all your financial data — transactions, categories, budgets, and settings — locally on your device using an encrypted SQLite database. We do not upload your personal financial information to any external server.\n\nWe collect limited, anonymized usage data to improve the app experience. This includes:\n- App events (e.g., screens visited, features used)\n- Crash reports and error logs\n- Device type, OS version, and app version",
      },
      analytics: {
        title: "2. Analytics",
        body: "We use PostHog to collect anonymized analytics about how users interact with Franky. This data helps us understand which features are most useful and where improvements are needed. No personally identifiable information (PII) is sent to PostHog.",
      },
      errorTracking: {
        title: "3. Error Tracking",
        body: "We use Sentry to capture crash reports and error logs. When the app encounters an unexpected error, diagnostic information (stack traces, device info, app state) is sent to Sentry to help us identify and fix issues quickly. This data does not include your financial information.",
      },
      dataStorage: {
        title: "4. Data Storage & Security",
        body: "All your financial data is stored exclusively on your device. We do not have access to your transactions, categories, balances, or any other personal financial records. If you delete the app, all locally stored data is permanently removed.",
      },
      thirdParty: {
        title: "5. Third-Party Services",
        body: "Franky integrates the following third-party services:\n- PostHog — anonymized analytics\n- Sentry — error and crash reporting\n\nEach service operates under its own privacy policy. We encourage you to review their respective policies for more information.",
      },
      children: {
        title: "6. Children's Privacy",
        body: "Franky is not directed to children under the age of 13. We do not knowingly collect information from children. If you believe a child has used the app and provided personal data, please contact us so we can address it promptly.",
      },
      yourRights: {
        title: "7. Your Rights",
        body: "Since all financial data is stored locally on your device, you have full control over it. You can clear all your data at any time from the Settings screen. For any concerns related to anonymized analytics data, you may contact us directly.",
      },
      changes: {
        title: "8. Changes to This Policy",
        body: 'We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page. Continued use of Franky after changes are made constitutes your acceptance of the revised policy.',
      },
      contact: {
        title: "9. Contact",
        body: "If you have any questions or concerns about this Privacy Policy, please reach out to us through the app's support channels.",
      },
    },
  },
  terms: {
    title: "Terms & Conditions",
    lastUpdated: "Last updated: April 2025",
    intro:
      "Please read these Terms and Conditions carefully before using Franky. By accessing or using the app, you agree to be bound by these terms.",
    sections: {
      acceptance: {
        title: "1. Acceptance of Terms",
        body: "By downloading, installing, or using Franky, you confirm that you are at least 13 years old and agree to these Terms and Conditions. If you do not agree, please discontinue use of the app immediately.",
      },
      description: {
        title: "2. Description of Service",
        body: "Franky is a personal finance tracking application that allows you to record transactions, manage categories, set budgets, and visualize your spending habits. All data is stored locally on your device. Franky does not connect to your bank accounts or any financial institution.",
      },
      userResponsibilities: {
        title: "3. User Responsibilities",
        body: "You are solely responsible for the accuracy of the data you enter into Franky. The app is a tool to assist with personal financial awareness — it is not a substitute for professional financial advice. You agree not to misuse the app or attempt to interfere with its proper functioning.",
      },
      noFinancialAdvice: {
        title: "4. No Financial Advice",
        body: "The information and features provided by Franky are for informational and organizational purposes only. Nothing in the app constitutes financial, legal, tax, or investment advice. Always consult a qualified professional for decisions related to your finances.",
      },
      ip: {
        title: "5. Intellectual Property",
        body: "All content, design, code, and branding within Franky are the intellectual property of the developers. You may not reproduce, distribute, or create derivative works from any part of the app without explicit written permission.",
      },
      warranty: {
        title: "6. Disclaimer of Warranties",
        body: 'Franky is provided "as is" and "as available" without warranties of any kind, express or implied. We do not guarantee that the app will be error-free, uninterrupted, or free from security vulnerabilities. Use the app at your own risk.',
      },
      liability: {
        title: "7. Limitation of Liability",
        body: "To the maximum extent permitted by applicable law, the developers of Franky shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the app, including but not limited to loss of data or financial loss.",
      },
      privacy: {
        title: "8. Data & Privacy",
        body: "Your use of Franky is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the app, you consent to the data practices described in the Privacy Policy.",
      },
      termination: {
        title: "9. Termination",
        body: "You may stop using Franky at any time by uninstalling the app. We reserve the right to discontinue or modify the app at any time without notice. Upon uninstallation, all locally stored data will be removed from your device.",
      },
      changes: {
        title: "10. Changes to These Terms",
        body: 'We may revise these Terms and Conditions periodically. The "Last updated" date at the top of this page reflects the most recent revision. Continued use of the app after changes are posted constitutes your acceptance of the updated terms.',
      },
      governingLaw: {
        title: "11. Governing Law",
        body: "These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms or your use of Franky shall be resolved through good-faith negotiation or, if necessary, through the courts of competent jurisdiction.",
      },
      contact: {
        title: "12. Contact",
        body: "If you have questions about these Terms and Conditions, please contact us through the app's support channels.",
      },
    },
  },
} as const;

export default en;
