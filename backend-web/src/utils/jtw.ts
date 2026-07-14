import jwt from 'jsonwebtoken';

export interface JwtPayload {
    id_usuario: number;
    email: string;
};


export const generarToken = (payload: JwtPayload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET!,
        {
            expiresIn: '1d',
        }
    )
}

export const verificarToken = (token: string): JwtPayload => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET!
    ) as JwtPayload
}