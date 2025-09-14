import { create } from 'zustand';
import type { SystemGlobalDropdown } from '@/04_types/system/system-global-dropdown';

// Define the store
type SystemGlobalDropdownStoreProps = {
  selectedSystemGlobalDropdown: SystemGlobalDropdown | null;
  setSelectedSystemGlobalDropdown: (
    systemGlobalDropdown: SystemGlobalDropdown | null,
  ) => void;
};

// Create the store
const useSystemGlobalDropdownStore = create<SystemGlobalDropdownStoreProps>(
  set => ({
    selectedSystemGlobalDropdown: null,
    setSelectedSystemGlobalDropdown: systemGlobalDropdown =>
      set({ selectedSystemGlobalDropdown: systemGlobalDropdown }),
  }),
);

export default useSystemGlobalDropdownStore;
