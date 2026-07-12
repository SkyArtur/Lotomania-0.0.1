const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api-lotomania';

export async function apiFetch(path, { method = 'GET', body, token } = {}) {
    const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
    })
    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.detail ?? 'Erro de requisição')
    }
    return response.json()
}
