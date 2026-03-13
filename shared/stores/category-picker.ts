import { create } from 'zustand';

type CategoryPickerStore = {
  selectedCategoryId: string | null;
  select: (categoryId: string) => void;
  clear: () => void;
};

export const useCategoryPickerStore = create<CategoryPickerStore>((set) => ({
  selectedCategoryId: null,
  select: (categoryId) => set({ selectedCategoryId: categoryId }),
  clear: () => set({ selectedCategoryId: null }),
}));
