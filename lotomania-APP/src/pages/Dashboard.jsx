import { useEffect, useState } from 'react'

import { getLatestContest, getLatestBet, getMe } from '../api/getters.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useApi } from "../hooks/useApi.js"
import Bettor from '../components/Bettor.jsx'
import Contest from "../components/Contest.jsx"
import Bet from "../components/Bet.jsx"
import Navbar from "../components/Navbar.jsx"


function Dashboard() {

    const { token } = useAuth()
    const [ refreshKey, setRefreshKey ] = useState(0)
    const [ message, setMessage ] = useState(null)
    const { data: bettor } = useApi(() => getMe(token), [token, refreshKey])
    const { data: contest } = useApi(() => getLatestContest(token), [token, refreshKey])
    const { data: bet } = useApi(() => getLatestBet(token), [token, refreshKey])

    useEffect(() => {
        if (!message) return
        const timer = setTimeout(() => setMessage(null), 5000)
        return () => clearTimeout(timer)
    }, [message])

    function handleFormSuccess(successMessage) {
        setMessage(successMessage)
        setRefreshKey((prev) => prev + 1)
    }

    return (
        <div className={ 'w-full relative flex flex-col items-center justify-start h-full' }>
            <div className={ 'w-full sticky top-0 z-50 flex flex-col justify-center items-center gap-1 bg-mist-100' }>
                <Bettor bettor={ bettor } />
                <Navbar message={ message } onFormSuccess={ handleFormSuccess } />
            </div>
            <div className={ 'w-full flex py-2 justify-center items-start flex-wrap gap-2' }>
                <Bet bet={ bet }/>
                <Contest contest={ contest } />
            </div>
        </div>
    )
}

export default Dashboard
