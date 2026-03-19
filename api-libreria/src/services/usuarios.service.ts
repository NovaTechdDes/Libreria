import * as repo from "../repositories/usuarios.repositores";

export async function obtenerUsuario(clave: string) {
  return await repo.getUsuario(clave);
}
