"use server";

import pool from "@/src/lib/db";

export async function postColor(nombre: string, codigo: string){
    const res = await pool.query(`
        INSERT INTO colores(color, codigo)
        VALUES($1, $2)
    `, [nombre, codigo]);
    
    if(res){
        return true;
    }

    return false;
}