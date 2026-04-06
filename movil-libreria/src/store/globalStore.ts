import { create } from 'zustand';

export interface GlobalStore {
  servidor: boolean;
  setServidor: (servidor: boolean) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  servidor: false,
  setServidor: (servidor: boolean) => set({ servidor }),
}));
