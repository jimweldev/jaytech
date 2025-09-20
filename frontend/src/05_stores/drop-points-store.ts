import { create } from 'zustand';
import type { DropPoints } from '@/04_types/dropPoints';

type DropPointProps = {
  selectedDropPoint: DropPoints | null;
  setSelectedDropPoint: (DropPoint: DropPoints | null) => void;
};

const useDropPointStore = create<DropPointProps>(set => ({
  selectedDropPoint: null,
  setSelectedDropPoint: DropPoint => set({ selectedDropPoint: DropPoint }),
}));

export default useDropPointStore;
