import { GiEightBall, GiCardRandom, GiExitDoor } from 'react-icons/gi'
import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import Form from './Form.jsx'


function Navbar() {
    const { logout } = useAuth()
    const [ showFormBet, setShowFormBet ] = useState(false)
    const [ showFormContest, setShowFormContest ] = useState(false)

    function closeForms() {
        setShowFormBet(false)
        setShowFormContest(false)
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (event.target.classList.contains('fixed')) {
                closeForms()
            }
            if (event.key === 'Escape') {
                closeForms()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleClickOutside)
        }
    }, [])

    return (
        <nav className={ ' w-full max-w-2xl h-15 bg-mist-100 flex items-center justify-between px-2' }>
            <div className={ 'w-2/3 flex items-center justify-start gap-3' }>
                <button onClick={ () => setShowFormContest(true) }
                        className={ 'relative group flex items-center justify-center gap-2 font-semibold cursor-pointer ' +
                            'select-none outline-0 text-mist-800/50 hover:text-mist-800 hover:font-bold ' }>
                    <span className={ 'absolute -top-3 left-1/2 -translate-x-1/2 text-[.65rem] invisible group-hover:visible w-max text-mist-500' }>
                        Add Contest
                    </span>
                    <GiEightBall size={ 35 } />
                </button>
                <button onClick={ () => setShowFormBet(true) }
                        className={ 'relative group flex items-center justify-center gap-2 font-semibold cursor-pointer ' +
                            'select-none outline-0 text-mist-800/50 hover:text-mist-800 hover:font-bold ' }>
                    <span className={'absolute -top-3 left-1/2 -translate-x-1/2 text-[.65rem] invisible group-hover:visible w-max text-mist-500'}>Add Bet</span>
                    <GiCardRandom size={ 35 } />
                </button>
                { showFormContest && <Form onClose={ closeForms } /> }
                { showFormBet && <Form bet={ true } onClose={ closeForms } /> }
            </div>
            <div className={ 'w-1/3 flex items-center justify-end' }>
                <button onClick={ logout }
                        className={ 'relative group flex items-center justify-center gap-2 font-semibold cursor-pointer ' +
                            'select-none outline-0 text-mist-800/50 hover:text-mist-800 hover:font-bold ' }>
                    <span className={'absolute -top-3 left-1/2 -translate-x-1/2 text-[.65rem] invisible group-hover:visible w-max text-mist-500'}>Sair</span>
                    <GiExitDoor size={ 30 } />
                </button>
            </div>
        </nav>
    )
}

export default Navbar
