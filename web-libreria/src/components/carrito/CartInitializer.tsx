'use client';
import { useCarritoStore } from '@/src/store';
import { useEffect } from 'react';

interface Props {
  habilitado: boolean;
  frase?: string;
  descuento: number;
  mensaje: string;
}

export const CartInitializer = ({ habilitado, frase, descuento, mensaje }: Props) => {
  const { setHabilitado, setMensaje, setDescuento, setFrase } = useCarritoStore();

  console.log(habilitado, frase, descuento);

  useEffect(() => {
    setHabilitado(habilitado);
    setMensaje(mensaje || '');
    setDescuento(descuento);
    setFrase(frase || '');
  }, [habilitado, frase, descuento, setHabilitado, setMensaje, setDescuento, setFrase, mensaje]);

  return null;
};
