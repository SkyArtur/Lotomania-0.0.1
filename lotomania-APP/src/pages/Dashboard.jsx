import {getLatestContest, getLatestBet, getMe} from '../api/getters.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import {useApi} from "../hooks/useApi.js";
import Bettor from '../components/Bettor.jsx';
import Contest from "../components/Contest.jsx";


function Dashboard() {
    const { token } = useAuth();
    const { data: bettor } = useApi(() => getMe(token), [token]);
    const { data: contest } = useApi(() => getLatestContest(token), [token]);
    const { data: bet } = useApi(() => getLatestBet(token), [token]);

    return (
        <div className="container px-2 py-1 flex flex-col items-start justify-start h-full">
            <Bettor bettor={bettor} />
            <Contest contest={contest} />
        </div>
    )
}

export default Dashboard