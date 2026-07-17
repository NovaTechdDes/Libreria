'use server';

import { ImageItem } from '../components/admin/inventario/FormularioProducto';
import { Color } from '../interface/Color';
import { revalidatePath } from 'next/cache';
import { api } from '../service';
import { mapProducto } from '../mappers/producto.mapper';

export const updateVisibilidadProducto = async (activo: boolean, id: number): Promise<boolean> => {
  try {
    const { data } = await api.put('/api/productos/activo', {
      id_producto: id,
      activo
    })
    
    if (!data.ok) throw new Error(data.msg);

    revalidatePath('/admin/inventario');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updatePrecioVisibleProducto = async (visible: boolean, id: number): Promise<boolean> => {
  try {
    const { data } = await api.put('/api/productos/visible-precio', {
      id_producto: id,
      visible: visible
    })

    if (!data.ok) throw new Error(data.msg);

    revalidatePath('/admin/inventario');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateStockVisibleProducto = async (activo: boolean, id: number): Promise<boolean> => {
  try {
    const { data } = await api.put('/api/productos/stock', {
      id_producto: id,
      isStock: activo
    });


    if (!data.ok) throw new Error(data.msg);

    revalidatePath('/admin/inventario');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateProducto = async (colores: Color[], imagenes: ImageItem[], id: number): Promise<boolean> => {
  try {

    const formData = new FormData();

    const archivosDeImagenes: File[] = imagenes.map((image) => image.file as File);

    const slot: string[] = [];
    let i = 0;
    archivosDeImagenes.map((archivo) => {
      formData.append('imagenes', archivo);
      slot[i] = archivo ? 'NUEVA' : 'VACIA';
      i++;
    });


    formData.append('slots', JSON.stringify(slot));
    formData.append('colores', JSON.stringify(colores));

    await api.put(`/api/productos/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    revalidatePath('/admin/inventario');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getProductoById = async(id: number) => {
  try {
    const { data } = await api.get(`/api/productos/${id}`);


    if (!data.ok) throw new Error(data.msg);

    return mapProducto(data.data);

  } catch (error) {
    console.error(error);
    return null;
  }
};
