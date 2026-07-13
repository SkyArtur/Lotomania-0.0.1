import { apiFetch } from "./client.jsx";

export const getMe = (token) => apiFetch('/bettors/me/', { token })

export const getLatestContest = (token) => apiFetch('/contests/latest/', { token })

export const getLatestBet = (token) => apiFetch('/bets/latest/', { token })