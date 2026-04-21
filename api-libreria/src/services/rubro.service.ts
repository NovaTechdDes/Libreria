import * as repo from "../repositories/rubro.repository";

export async function obtenerRubros() {
  return await repo.getRubros();
}
