import { create } from 'zustand';

export interface GlobalStore {
  servidor: boolean;
  setServidor: (servidor: boolean) => void;

  usuario: string;
  setUsuario: (usuario: string) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  servidor: false,
  setServidor: (servidor: boolean) => set({ servidor }),

  usuario: '',
  setUsuario: (usuario: string) => set({ usuario }),
}));
