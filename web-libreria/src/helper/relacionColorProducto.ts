'use server';
import { Color } from '../interface/Color';
import pool from '../lib/db';

export const postrelacionColorProducto = async (id_producto: number, colores: Color[]) => {
  const cliente = await pool.connect();

  try {
    await cliente.query('BEGIN');

    //1. Borrar todas las relaciones
    await cliente.query(`DELETE FROM producto_colores WHERE producto_id = $1`, [id_producto]);

    //2. Crear las nuevas relaciones
    if (colores.length > 0) {
      const values = colores.map((_, i) => `($1, $${i + 2})`).join(',');

      const query = `INSERT INTO producto_colores (producto_id, color_id) VALUES ${values}`;
      const params = [id_producto, ...colores.map((c) => c.id)];
      await cliente.query(query, params);

      await cliente.query('COMMIT');
    }
  } catch (error) {
    await cliente.query('ROLLBACK');
    console.error('Error en Transaccion postRealcionColorProducto', error);
  } finally {
    cliente.release();
  }
};
