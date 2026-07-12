import { apiFetch } from "./client.jsx";

export const getMe = (token) => apiFetch('/bettors/me/', { token })