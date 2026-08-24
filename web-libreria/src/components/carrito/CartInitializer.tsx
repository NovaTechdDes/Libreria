'use client';
import { useCarritoStore } from '@/src/store';
import { useEffect } from 'react';

interface Props {
  habilitado: boolean;
  frase?: string;
  descuento: number;
  mensaje: string;
  inicio: string;
  fin: string;
  mostrar_precios: boolean;
}

export const CartInitializer = ({ habilitado, frase, descuento, mensaje, inicio, fin, mostrar_precios }: Props) => {
  const { setHabilitado, setMensaje, setDescuento, setFrase, setInicio, setFin, setMostrarPrecio } = useCarritoStore();

  useEffect(() => {
    setHabilitado(habilitado);
    setMensaje(mensaje || '');
    setDescuento(descuento);
    setFrase(frase || '');
    setInicio(inicio || '');
    setFin(fin || '');
    setMostrarPrecio(mostrar_precios);
  }, [habilitado, frase, descuento, setHabilitado, setMensaje, setMostrarPrecio, setDescuento, setFrase, mensaje, inicio, fin, setInicio, setFin, mostrar_precios]);

  return null;
};
