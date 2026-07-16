import { NextFunction, Request, Response } from "express";
import { verificarToken } from "../utils/jtw";


export const validarJWT = (req: Request, res: Response, next: NextFunction) => {
    try {

        const authorization = req.headers.authorization;

        if(!authorization || !authorization.startsWith('Bearer ')){
            return res.status(401).json({
                ok: false,
                msg: 'Token de autorización no proporcionado',
            })
        };

        if(!authorization.startsWith('Bearer ')){
            return res.status(401).json({
                ok: false,
                msg: 'Formato de token invalido',
            })
        }

        const token = authorization.replace('Bearer ', '');

        const payload = verificarToken(token);

        (req as any).usuario = {
            id_usuario: payload.id_usuario,
            email: payload.email
        }

        next();

        
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token inválido o expirado"
        });
    }
}