import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { ReactNode, useState } from 'react';
import { View } from 'react-native';
import { theme } from '~/shared/constants/theme';
import { cn } from '~/shared/utils/tailwind';
import { ThemedText } from '../ui';
import { Home, Plus, Settings, TrendingUp, Wallet } from '../ui/icons';

const ButtonTab = ({
  isSelected,
  children,
  label,
}: {
  isSelected: boolean;
  children: ReactNode;
  label: string;
}) => {
  return (
    <View className="items-center justify-between px-2">
      {children}
      <ThemedText className={cn(isSelected ? 'text-brand-brand600' : '')}>{label}</ThemedText>
    </View>
  );
};

export default function TabLayout() {
  const [tab, setTab] = useState<'index' | 'stats' | 'add' | 'settings' | 'budget'>('index');

  const handleTabPress = (newTab: typeof tab) => {
    setTab(newTab);
  };

  const isHomeTabSelected = tab === 'index';
  const isBudgetTabSelected = tab === 'budget';
  const isStatsTabSelected = tab === 'stats';
  const isSettingsTabSelected = tab === 'settings';

  return (
    <Tabs>
      <TabSlot />
      <TabList className="border-brand-brand700/30 shadow-brand-brand700/70 mx-auto mb-12 gap-4 rounded-full border p-4 shadow-2xl">
        <TabTrigger name="index" href="/(home)" onPress={() => handleTabPress('index')}>
          <ButtonTab isSelected={isHomeTabSelected} label="Home">
            <Home color={isHomeTabSelected ? theme.brand.brand600 : theme.gray.gray100} />
          </ButtonTab>
        </TabTrigger>
        <TabTrigger name="budget" href="/(home)/budget" onPress={() => handleTabPress('budget')}>
          <ButtonTab isSelected={isBudgetTabSelected} label="Budget">
            <Wallet color={isBudgetTabSelected ? theme.brand.brand600 : theme.gray.gray100} />
          </ButtonTab>
        </TabTrigger>
        <TabTrigger name="add" href="/(home)/add" onPress={() => handleTabPress('add')}>
          <View className="bg-brand-brand600 items-center justify-between rounded-full p-2">
            <Plus color={theme.gray.gray100} />
          </View>
        </TabTrigger>
        <TabTrigger name="stats" href="/(home)/stats" onPress={() => handleTabPress('stats')}>
          <ButtonTab isSelected={isStatsTabSelected} label="Stats">
            <TrendingUp color={isStatsTabSelected ? theme.brand.brand600 : theme.gray.gray100} />
          </ButtonTab>
        </TabTrigger>
        <TabTrigger
          name="settings"
          href="/(home)/settings"
          onPress={() => handleTabPress('settings')}
        >
          <ButtonTab isSelected={isSettingsTabSelected} label="Settings">
            <Settings color={isSettingsTabSelected ? theme.brand.brand600 : theme.gray.gray100} />
          </ButtonTab>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
