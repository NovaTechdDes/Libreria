"use server";

import pool from "@/src/lib/db";
import { Producto } from "../interface/Producto";


export async function getProductos(): Promise<Producto[] | null> {
  const { rows } = await pool.query(`
    SELECT p.id, p.codigo, p.descripcion, p.precio, p.cantidad, p.imagen_url, p.activo, r.nombre as rubro FROM productos p JOIN rubro r ON p.id_rubro = r.id;`);

  if (rows.length > 0) {
    return rows;
  } else {
    return null;
  }
}