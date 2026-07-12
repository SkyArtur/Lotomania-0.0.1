import { useEffect, useState } from 'react';

import Bettor from '../components/Bettor.jsx';
import { getMe } from '../api/getters.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard() {
    const [bettor, setBettor] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        let active = true;

        getMe(token)
            .then((data) => {
                if (active) setBettor(data);
            })
            .catch(() => {
                if (active) setBettor(null);
            });

        return () => {
            active = false;
        };
    }, [token]);

    return (
        <div className="container px-2 py-1 flex flex-col items-start justify-start h-full">
            <Bettor bettor={bettor} />
        </div>
    )
}
