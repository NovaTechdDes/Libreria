'use server';
import pool from '../lib/db';

export async function getConfiguracion() {
  try {
    const { rows } = await pool.query(
      `
        SELECT * FROM configuracion LIMIT 1
        `
    );

    return rows[0];
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function putBannerConfig(body: { mensaje: string; habilitado: boolean }) {
  try {
    const { rows } = await pool.query(
      `
        UPDATE configuracion SET mensaje_informativo = $1, carrito_habilitado = $2 RETURNING * 
        `,
      [body.mensaje, body.habilitado]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function putDescuentoConfig(body: { mensaje: string; porcentaje: number }) {
  try {
    const { command } = await pool.query(
      `
        UPDATE configuracion SET frase_descuento = $1, porcentaje_descuento = $2 RETURNING * 
        `,
      [body.mensaje, body.porcentaje]
    );
    if (command === 'UPDATE') {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
