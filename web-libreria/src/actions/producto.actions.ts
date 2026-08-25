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


    const slot: string[] = [];

    imagenes.forEach((image) => {
      if(image.file){
        formData.append('imagenes', image.file);
        slot.push('NUEVA');
      }else if (image.preview){
        formData.append('imagenes', new Blob());
        slot.push('MANTENER');
      }else{
        formData.append('imagenes', new Blob());
        slot.push('VACIA');
      }
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
