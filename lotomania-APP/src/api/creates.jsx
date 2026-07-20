import { apiFetch } from './client.jsx'

export const createContest = (token, contest) => apiFetch('/contests/', { method: 'POST', body: contest, token })

export const createBet = (token, bet) => apiFetch('/bets/', { method: 'POST', body: bet, token })
