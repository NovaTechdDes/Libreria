import { create } from "zustand";
import { Color } from "../interface/Color";

export interface ColorState {
    colores: Color[];

    colorSeleccionado: Color | null;

    clearColorSeleccionado: () => void;
    setColorSeleccionado: (color: Color) => void;
    cargarColores: (colores: Color[]) => void;

    setPage: (page: number) => void;
    setSearch: (search: string) => void;

    page: number;
    search: string;
}


export const useColorStore = create<ColorState>((set) => ({
    colores: [],
    colorSeleccionado: null,
    page: 1,
    search: '',
    
    clearColorSeleccionado: () => set({ colorSeleccionado: null }),
    setColorSeleccionado: (color: Color) => set({ colorSeleccionado: color }),
    cargarColores: (colores: Color[]) => set({ colores }),

    setPage: (page: number) => set({ page }),
    setSearch: (search: string) => set({ search }),

    


}))