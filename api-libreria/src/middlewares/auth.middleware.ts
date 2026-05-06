import { NextFunction, Request, Response } from "express";
import { pool } from "../config/db";

export const verificarUsuario = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const apiKey = req.headers.authorization?.replace("Bearer ", "");
    console.log(req.headers);

    if (!apiKey) {
      return res.status(401).json({
        ok: false,
        message: "No se proporciono un API Key",
      });
    }

    const result = await pool.request().input("clave", apiKey).query(`
            SELECT id_usuario, denominacion, administrador 
            FROM usuarios 
            WHERE clave = @clave and administrador = 1
        `);

    const usuario = result.recordset[0];

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        message: "API Key invalida",
      });
    }

    req.body.usuario = usuario;
    next();
  } catch (error) {
    console.error("Error al verificar usuario:", error);
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};
