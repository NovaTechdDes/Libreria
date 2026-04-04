import * as repo from "../repositories/caja.repository";

export async function obtenerValesDelDia() {
  return await repo.getValesDelDia();
}

export async function obtenerMovCajaDelDia() {
  return await repo.getMovCajaDelDia();
}

export async function cerrarCajaDelDia() {
  return await repo.postCloseCaja();
}
