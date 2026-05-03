"use server";

import { Color } from "../interface/Color";
import pool from "../lib/db";

export async function getColores(page: number, limit: number, search?: string): Promise<{ data: Color[]; totalPages: number } | null> {
  const { rows } = await pool.query(`SELECT id, codigo, color FROM colores WHERE color LIKE $3 LIMIT $1 OFFSET $2;`
    , [limit, (page - 1) * limit, `%${search}%`])

  const { rows: count } = await pool.query(`SELECT count(id) FROM colores WHERE color LIKE $1`, [`%${search}%`])

  const totalPages = Math.ceil(parseInt(count[0].count) / limit);

  if (rows.length > 0) {
    return { data: rows, totalPages };
  } else {
    return null;
  }
}