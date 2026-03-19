import * as repo from "../repositories/ventas.repositores";

export async function obtenerVentasDelDia() {
  return await repo.getVentasDelDia();
}
