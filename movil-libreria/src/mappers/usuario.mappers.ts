import { Usuario } from "@/interface";

interface UsuarioBackend {
  id_usuario: string;
  denominacion: string;
  clave: string;
  administrador: number;
}

export const mapUsuario = (usuario: UsuarioBackend): Usuario => {
  return {
    id_usuario: usuario.id_usuario,
    denominacion: usuario.denominacion,
    clave: usuario.clave,
    administrador: usuario.administrador,
  };
};
