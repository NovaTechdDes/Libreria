
import { NextRequest } from 'next/server';
import { api } from '../service';

interface ResponseProps {
  ok: boolean,
  msg: string
}

export async function updateSession(request: NextRequest):Promise<ResponseProps> {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return {
      ok: false,
      msg: 'No hay token'
    }
  };

  try {
    const { data } = await api.get('/api/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  
    return {
      ok: data.ok,
      msg: data.msg
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      msg: 'Token invalido'
    }
  }



}
