import { api } from "../service";

export const login = async (email: string, password: string): Promise<{ ok: boolean; token?: string, error?: string }> => {
 try {
    const { data } = await api.post('/api/auth/login', {email, password});

    if(!data?.ok) {
        return {
            ok: false,
            error: data.msg
        }
    };

    return {
        ok: true,
        token: data.token
    }
 } catch (error) {
    console.error(error);
    return {
        ok: false,
        token: ''
    }
 }   
}