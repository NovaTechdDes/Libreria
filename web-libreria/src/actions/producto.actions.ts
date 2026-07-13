'use server';

import { ImageItem } from '../components/admin/inventario/FormularioProducto';
import { uploadImages } from '../helper/uploadImages';
import { Color } from '../interface/Color';
import { createClient } from '../lib/server';
import { revalidatePath } from 'next/cache';
import { api } from '../service';

export const updateVisibilidadProducto = async (activo: boolean, id: number): Promise<boolean> => {
  try {
    const { data } = await api.put('/api/producto/activo', {
      id_producto: id,
      activo: activo
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
    const { data } = await api.put('/api/producto/visible-precio', {
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
    const { data } = await api.put('/api/producto/stock', {
      id_producto: id,
      isStock: activo
    })

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
    const supabase = await createClient();

    // 1. Obtener imágenes actuales para comparar
    const { data: productoActual } = await supabase.from('productos').select('imagenes').eq('id_producto', id).single();
    const imagenesActuales: string[] = productoActual?.imagenes ? JSON.parse(productoActual.imagenes) : [];

    // 2. Subir nuevas imágenes y obtener lista final
    const urlsFinales = await uploadImages(imagenes, id);

    // 3. Identificar imágenes a borrar (estaban antes pero no están ahora)
    const imagenesABorrar = imagenesActuales.filter((url) => !urlsFinales.includes(url));

    if (imagenesABorrar.length > 0) {
      const pathsABorrar = imagenesABorrar
        .map((url) => {
          const parts = url.split('/productos/');
          return parts.length > 1 ? `productos/${parts[parts.length - 1]}` : null;
        })
        .filter((path): path is string => path !== null);

      if (pathsABorrar.length > 0) {
        await supabase.storage.from('productos').remove(pathsABorrar);
      }
    }

    // 4. Guardar URL de las imágenes en la base de datos
    await supabase
      .from('productos')
      .update({ imagenes: JSON.stringify(urlsFinales) })
      .eq('id_producto', id);

    //Eliminar relaciones de colores con el producto
    const { error } = await supabase.from('productos_colores').delete().eq('id_producto', id);

    if (error) throw error;

    //Insertar nuevas relaciones de colores con el producto
    if (colores.length > 0) {
      const dataToInsert = colores
        .filter((c) => c.id !== undefined)
        .map((c) => ({
          id_producto: id,
          id_color: c.id,
        }));

      if (dataToInsert.length > 0) {
        const { error: ErrorInsert } = await supabase.from('productos_colores').insert(dataToInsert);
        if (ErrorInsert) throw ErrorInsert;
      }
    }

    revalidatePath('/admin/inventario');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getProductoById = async(id: number) => {
  try {
    const { data } = await api.get(`/api/producto/${id}`);

    if (!data.ok) throw new Error(data.msg);

    return data.data;

  } catch (error) {
    console.error(error);
    return null;
  }
}
