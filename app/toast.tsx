import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ThemedText, useToast } from '~/components/ui';

export default function ToastScreen() {
  const { addToast } = useToast();

  const handleOpenToast = () => {
    addToast({
      message: 'Success Toast',
      description: 'This is a success toast',
      duration: 1000,
      type: 'success',
    });
  };

  const handleOpenErrorToast = () => {
    addToast({
      message: 'Error Toast',
      description: 'This is an error toast',
      duration: 1000,
      type: 'error',
    });
  };

  const handleOpenWarningToast = () => {
    addToast({
      message: 'Warning Toast',
      description: 'This is a warning toast',
      duration: 1000,
      type: 'warning',
    });
  };

  const handleOpenLoadingToast = () => {
    addToast({
      message: 'Loading Toast',
      description: 'This is a loading toast',
      duration: 1000,
      type: 'loading',
    });
  };

  const handleOpenDefaultToast = () => {
    addToast({
      message: 'Default Toast',
      description: 'This is a default toast',
      duration: 1000,
    });
  };

  return (
    <SafeAreaView>
      <View className="h-screen gap-14">
        <ThemedText variant="primary" size="title">
          Toast
        </ThemedText>
        <View className="gap-4">
          <Button onPress={handleOpenToast}>Success</Button>
          <Button onPress={handleOpenErrorToast}>Error</Button>
          <Button onPress={handleOpenWarningToast}>Warning</Button>
          <Button onPress={handleOpenLoadingToast}>Loading</Button>
          <Button onPress={handleOpenDefaultToast}>Default</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
