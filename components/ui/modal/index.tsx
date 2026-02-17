import { ReactNode, RefObject } from 'react';
import { theme } from '~/shared/constants/theme';
import { BottomSheetModal, BottomSheetView } from './components';
import { BottomSheetModalProps } from './types';

export default function Modal({
  ref,
  onChange,
  children,
  ...props
}: {
  ref: RefObject<BottomSheetModal | null>;
  onChange?: (index: number) => void;
  children?: ReactNode;
} & BottomSheetModalProps) {
  return (
    <BottomSheetModal
      ref={ref}
      onChange={onChange}
      containerStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
      backgroundStyle={{
        backgroundColor: theme.brand.brand900,
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.text.primary,
      }}
      {...props}
    >
      <BottomSheetView className="bg-brand-brand900 flex-1 p-6">{children}</BottomSheetView>
    </BottomSheetModal>
  );
}
