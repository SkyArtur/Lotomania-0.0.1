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
        const errorBody = await response.json().catch(() => ({}))
        const [ firstFieldError ] = Object.values(errorBody)
        const message = errorBody.detail
            ?? (Array.isArray(firstFieldError) ? firstFieldError[0] : firstFieldError)
            ?? 'Erro de requisição.'
        throw new Error(message)
    }
    return response.json()
}
