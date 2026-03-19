import { create } from "zustand";

export interface UsuarioState {
  clave: string;
  setClave: (clave: string) => void;
}

export const useUsuarioStore = create<UsuarioState>((set) => ({
  clave: "",
  setClave: (clave: string) => set({ clave }),
}));
