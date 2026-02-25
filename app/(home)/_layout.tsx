import { Stack } from 'expo-router';

function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home screen' }} />
    </Stack>
  );
}

export default HomeLayout;
