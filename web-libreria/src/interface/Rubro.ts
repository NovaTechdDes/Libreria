import { SubRubro } from "./SubRubro";

export interface Rubro {
  id: number;
  nombre: string;

  subrubros: SubRubro[]
}
