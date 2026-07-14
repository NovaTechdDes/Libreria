import { api } from "../service";

export const login = async (email: string, password: string): Promise<{ ok: boolean; data?: any, error?: string }> => {
 try {
    const { data } = await api.post('/api/auth/login', {email, password});

    if(!data?.ok) {
        return {
            ok: false,
            error: data.msg
        }
    };

    console.log(data)

    return {
        ok: true,
        data
    }
 } catch (error) {
    console.error(error);
    return {
        ok: false,
        data: null
    }
 }   
}