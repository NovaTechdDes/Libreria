"use server";

import { Color } from "../interface/Color";
import pool from "../lib/db";

export async function getAllColores(): Promise<Color[] | null> {
  try {
    const { rows } = await pool.query(`SELECT id, codigo, color FROM colores ORDER BY color ASC;`);
    
    if (rows.length > 0) {
      return rows;
    }
    return null;
  } catch (error) {
    console.error("Error fetching all colors:", error);
    return null;
  }
}
