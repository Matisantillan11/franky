import { Stack } from 'expo-router';
import { DatabaseProvider } from '~/libs';

function HomeLayout() {
  return (
    <DatabaseProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home screen' }} />
      </Stack>
    </DatabaseProvider>
  );
}

export default HomeLayout;
