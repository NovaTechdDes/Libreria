import { Request, Response } from "express";
import { poolPromise } from "../config/db";
import { obtenerUsuarioPorEmail } from "../service/auth.service";
import { comparePassword } from "../utils/password";
import { generarToken } from "../utils/jtw";


export const login = async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                ok: false,
                msg: 'Faltan datos',
            })
        }

        const usuario = await obtenerUsuarioPorEmail(email);

        console.log(usuario)

        if(!usuario){
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales invalidas',
            })
        }

        const passwordValida = await comparePassword(password, usuario.password_hash);

        if(!passwordValida){
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales invalidas',
            })
        };

        const token = generarToken({
            id_usuario: usuario.id_usuario,
            email: usuario.email
        });


        
        res.status(200).json({
            ok: true,
            token,
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                email: usuario.email
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener usuario',
            error
        })
    }
}