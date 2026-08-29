import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface GlobalStore {
  servidor: boolean;
  setServidor: (servidor: boolean) => void;

  usuario: string;
  setUsuario: (usuario: string) => void;
}

export const useGlobalStore = create<GlobalStore>()(
  persist(
    (set) => ({
      servidor: false,
      setServidor: (servidor: boolean) => set({ servidor }),

      usuario: '',
      setUsuario: (usuario: string) => set({ usuario }),
    }),
    {
      name: 'global-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ servidor: state.servidor }),
    }
  )
);
