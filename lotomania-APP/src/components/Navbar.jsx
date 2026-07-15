import { GiEightBall, GiCardRandom, GiExitDoor } from "react-icons/gi"
import { useAuth } from '../context/AuthContext.jsx'


function Navbar() {
    const { logout } = useAuth()

    return (
        <nav className={ ' w-full max-w-2xl h-15 bg-mist-100 flex items-center justify-between px-2' }>
            <div className={ 'w-2/3 flex items-center justify-start gap-3' }>
                <button onClick={ () => console.log('Nova concurso') }
                        className={ 'relative group flex items-center justify-center gap-2 font-semibold cursor-pointer ' +
                            'select-none text-mist-800/50 hover:text-mist-800 hover:font-bold ' }>
                    <span className={ 'absolute -top-3 left-1/2 -translate-x-1/2 text-[.65rem] invisible group-hover:visible w-max text-mist-500' }>
                        Add Contest
                    </span>
                    <GiEightBall size={ 35 } />
                </button>
                <button onClick={ () => console.log('Novo Concurso') }
                        className={ 'relative group flex items-center justify-center gap-2 font-semibold cursor-pointer ' +
                            'select-none text-mist-800/50 hover:text-mist-800 hover:font-bold ' }>
                    <span className={'absolute -top-3 left-1/2 -translate-x-1/2 text-[.65rem] invisible group-hover:visible w-max text-mist-500'}>Add Bet</span>
                    <GiCardRandom size={ 35 } />
                </button>
            </div>
            <div className={ 'w-1/3 flex items-center justify-end' }>
                <button onClick={ logout }
                        className={ 'relative group flex items-center justify-center gap-2 font-semibold cursor-pointer ' +
                            'select-none text-mist-800/50 hover:text-mist-800 hover:font-bold ' }>
                    <span className={'absolute -top-3 left-1/2 -translate-x-1/2 text-[.65rem] invisible group-hover:visible w-max text-mist-500'}>Sair</span>
                    <GiExitDoor size={ 30 } />
                </button>
            </div>
        </nav>
    )
}

export default Navbar
