'use server';
import { Rubro } from '../interface/Rubro';
import { api } from '../service';

export const getRubrosSubRubrosClient = async (): Promise<Rubro[]> => {

  const { data } = await api.get('api/rubros');

  if (!data.ok) {
    console.error(data.msg);
    return [];
  }

  const rubros = [{ id: 0, nombre: 'TODOS' }, ...data.rubros];

  return rubros;
}
