"use server";

import { Color } from "../interface/Color";
import pool from "../lib/db";

export async function getColores(page:number, search: string): Promise<Color[] | null> {
  const {rows} = await pool.query(`SELECT id, codigo, color FROM colores WHERE color ILIKE $2 LIMIT 5 OFFSET $1;`
  , [(page - 1) * 10, `%${search}%`])

  if (rows.length > 0) {
    return rows;
  } else {
    return null;
  }
}