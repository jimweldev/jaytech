import type { Services } from '@/04_types/services';
import { create } from 'zustand';

type ServicesProps = {
  selectedServices: Services | null;
  setSelectedServices: (Services: Services | null) => void;
};

const useServicesStore = create<ServicesProps>(set => ({
  selectedServices: null,
  setSelectedServices: Services => set({ selectedServices: Services }),
}));

export default useServicesStore;
