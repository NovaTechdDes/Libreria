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
}

export const CartInitializer = ({ habilitado, frase, descuento, mensaje, inicio, fin }: Props) => {
  const { setHabilitado, setMensaje, setDescuento, setFrase, setInicio, setFin } = useCarritoStore();

  useEffect(() => {
    setHabilitado(habilitado);
    setMensaje(mensaje || '');
    setDescuento(descuento);
    setFrase(frase || '');
    setInicio(inicio || '');
    setFin(fin || '');
  }, [habilitado, frase, descuento, setHabilitado, setMensaje, setDescuento, setFrase, mensaje, inicio, fin, setInicio, setFin]);

  return null;
};
