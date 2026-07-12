import { apiFetch } from "./client.jsx";

export const login = (username, password) => apiFetch(
    '/token/', {
    method: 'POST',
    body: { username, password },
  });


export const register = (username, password) => apiFetch(
    '/bettors/', {
        method: 'POST',
        body: { username, password }
    });
