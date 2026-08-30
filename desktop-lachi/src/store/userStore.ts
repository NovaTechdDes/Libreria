import { create } from "zustand";
import { Usuario } from "../interface";

export interface UserState {
    usuario: Usuario | null;
    setUsuario: (usuario: Usuario) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    usuario: null,
    setUsuario: (usuario) => set({ usuario }),
    logout: () => set({ usuario: null }),
}));