import { poolPromise } from "../config/db";


export const obtenerUsuarioPorEmail = async (email: string) => {

    const pool = await poolPromise;

    const result = await pool
        .request()
        .input("email", email)
        .query(`
            SELECT 
            id_usuario,
            nombre,
            email,
            password_hash,
            activo
            FROM usuarios
            WHERE email = @email
            AND activo = 1
        `);

    return result.recordset[0] || null;

};