import { useState } from 'react';

import Bettor from '../components/Bettor.jsx';

export default function Dashboard() {
    const [bettor, setBettor] = useState({
        id: 1,
        username: 'skyartur',
        prizes: 10.29,
        total: 235.25,
    });

    return (
        <div className="container px-2 py-1 flex flex-col items-start justify-start h-full">
            <Bettor bettor={bettor} />
        </div>
    )
}