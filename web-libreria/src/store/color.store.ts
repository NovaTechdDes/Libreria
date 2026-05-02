import { create } from "zustand";
import { Color } from "../interface/Color";

export interface ColorState {
    colores: Color[];

    colorSeleccionado: Color | null;

    clearColorSeleccionado: () => void;
    setColorSeleccionado: (color: Color) => void;
    cargarColores: (colores: Color[]) => void;
}


export const useColorStore = create<ColorState>((set) => ({
    colores: [],
    colorSeleccionado: null,
    
    clearColorSeleccionado: () => set({ colorSeleccionado: null }),
    setColorSeleccionado: (color: Color) => set({ colorSeleccionado: color }),
    cargarColores: (colores: Color[]) => set({ colores }),


}))