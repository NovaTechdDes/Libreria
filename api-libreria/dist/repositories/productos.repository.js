"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductos = getProductos;
exports.searchProductos = searchProductos;
const db_1 = require("../config/db");
async function getProductos() {
    await db_1.poolConnect;
    const result = await db_1.pool.request().query(`
    SELECT TOP 100
    id,
    descripcion,
    precio,
    stock
    FROM api_productos
    ORDER BY id DESC
    `);
    return result.recordset;
}
async function searchProductos(texto) {
    await db_1.poolConnect;
    const result = await db_1.pool.request().input("texto", `%${texto}%`).query(`
    SELECT TOP 100
    id,
    descripcion,
    precio,
    stock
    FROM api_productos
    WHERE descripcion LIKE @texto OR
          id LIKE @texto    
    ORDER BY descripcion
    `);
    return result.recordset;
}
