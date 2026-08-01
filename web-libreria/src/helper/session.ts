

export const getOrCreateSessionId = (): string => {
    if (typeof window === 'undefined') return "";
    
    let session_id = localStorage.getItem('session_id');

    if (!session_id) {
        session_id = crypto.randomUUID();
        localStorage.setItem('session_id', session_id);
    }
    
    return session_id;
}