import { useRef } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModal, Button, Modal, ThemedText } from '~/components/ui';

export default function ModalScreen() {
  const modalRef = useRef<BottomSheetModal>(null);

  const openModal = () => {
    modalRef.current?.present();
  };

  return (
    <SafeAreaView>
      <Button variant="ghost" onPress={openModal}>
        Open Modal
      </Button>

      <Modal ref={modalRef}>
        <View>
          <ThemedText variant="primary" size="title">
            Modal Title
          </ThemedText>
          <View>
            <ThemedText>Cool modal content 🚀🌱</ThemedText>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
