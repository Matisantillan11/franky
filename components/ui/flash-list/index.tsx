import { FlashList as FlashListBase, FlashListProps } from '@shopify/flash-list';

export default function FlashList<T>(props: FlashListProps<T>) {
  return (
    <FlashListBase
      {...props}
      contentInsetAdjustmentBehavior="automatic"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
}
