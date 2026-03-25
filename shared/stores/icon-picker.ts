import { create } from 'zustand';

type IconPickerStore = {
  selectedIcon: string;
  select: (icon: string) => void;
};

export const useIconPickerStore = create<IconPickerStore>((set) => ({
  selectedIcon: 'ShoppingBag',
  select: (icon) => set({ selectedIcon: icon }),
}));
