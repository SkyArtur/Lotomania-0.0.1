import { getLatestContest, getLatestBet, getMe } from '../api/getters.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useApi } from "../hooks/useApi.js"
import Bettor from '../components/Bettor.jsx'
import Contest from "../components/Contest.jsx"
import Bet from "../components/Bet.jsx"
import Navbar from "../components/Navbar.jsx"


function Dashboard() {

    const { token } = useAuth()
    const { data: bettor } = useApi(() => getMe(token), [token])
    const { data: contest } = useApi(() => getLatestContest(token), [token])
    const { data: bet } = useApi(() => getLatestBet(token), [token])

    return (
        <div className={ 'container py-1 flex flex-col items-start justify-start h-full' }>
            <div className={ 'w-full flex flex-col justify-center items-center gap-1 bg-mist-100' }>
                <Bettor bettor={ bettor } />
                <Navbar />
            </div>

            <div className={ 'w-full flex py-2 justify-center items-start flex-wrap gap-2' }>
                <Bet bet={ bet }/>
                <Contest contest={ contest } />
            </div>
        </div>
    )
}

export default Dashboard
