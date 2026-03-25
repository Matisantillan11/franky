import { create } from 'zustand';
import { theme } from '~/shared/constants/theme';

type ColorPickerStore = {
  selectedColor: string;
  select: (color: string) => void;
};

export const useColorPickerStore = create<ColorPickerStore>((set) => ({
  selectedColor: theme.brand.brand500,
  select: (color) => set({ selectedColor: color }),
}));
