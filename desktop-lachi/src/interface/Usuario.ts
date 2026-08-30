export interface Usuario {
    id_usuario: number;
    denominacion: string;
    clave: string;
    administrador: 1 | 0 | null
}