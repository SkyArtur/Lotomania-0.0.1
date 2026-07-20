import { useState } from 'react'
import Currency from './Currency.jsx'
import {LuPanelTopClose, LuPanelTopOpen} from "react-icons/lu";


function Contest({ contest }) {
    const [ showNumbers, setShowNumbers ] = useState(true)

    if (!contest) return null

    const prizes = [ ...contest.prizes ].sort((a, b) => b.points - a.points)
    const date = new Date(contest.date).toLocaleDateString('pt-BR')
    const stringNumbers = (number) => String(number).padStart(2, '0')

    return (
        <div className={ 'max-w-2xl w-full flex flex-col items-center justify-center gap-1 p-3 bg-mist-100 rounded-sm select-none' }>
            <div className={ 'w-full flex flex-wrap items-center justify-between gap-x-4 gap-y-2' }>
                <div className={ 'flex flex-col justify-center items-center ps-2' }>
                    <small className={ 'self-start text-[.65rem] font-mono text-mist-500' }>Concurso</small>
                    <h3 className={ 'text-2xl font-bold text-orange-500' }>
                        <span className={ 'text-mist-500' }>#</span> { contest.reference }
                    </h3>
                </div>
                <div className={ 'flex flex-col justify-center items-center ps-2' }>
                    <small className={ 'self-start text-[.65rem] font-mono text-mist-500' }>Data</small>
                    <h3 className={ 'text-base' }>{ date }</h3>
                </div>
            </div>
            <div className={ 'pt-0.5 bg-mist-500 w-full inline' }></div>
            <div className={ 'w-full flex items-center justify-between px-4 py-1 gap-1' }>
                <div className={ 'text-blue-900 font-semibold' }>Números Sorteados</div>
                <button type={ 'button' }
                        onClick={ () => setShowNumbers(!showNumbers) }
                        className={ 'cursor-pointer text-mist-500 hover:text-mist-800' }>
                    {!showNumbers
                        ? <LuPanelTopOpen size={ 20 } />
                        : <LuPanelTopClose size={ 20 }/>
                    }
                </button>
            </div>
            <div className={ 'w-full max-w-100 grid grid-cols-10 gap-1' }>
                { showNumbers &&  contest.numbers.map((number) => (
                    <div key={number} className={ 'w-full p-1 flex items-center justify-center text-orange-500' }>
                        <span className={ 'text-base font-semibold' }>{stringNumbers(number)}</span>
                    </div>
                )) }
            </div>
            <div className={ 'pt-0.5 bg-mist-500 w-full inline' }></div>
            <div className={ 'w-full flex items-center justify-between px-4 py-1 gap-1' }>
                <div className={ 'text-blue-900 font-semibold' }>Premiação</div>
            </div>
            <div className={ 'w-full flex flex-col items-center justify-center px-4 py-2 gap-1' }>
                <div className={ 'w-full max-w-100 grid grid-cols-3 gap-3 font-semibold text-center border-b-2 border-mist-500' }>
                    <div className={ 'text-[.90rem] flex items-center justify-center' }>Pontos</div>
                    <div className={ 'text-[.90rem] flex items-center justify-center' }>Ganhadores</div>
                    <div className={ 'text-[.90rem] flex items-center justify-center' }>Prêmio Pago</div>
                </div>
                { prizes.map((prize) => (
                    <div key={ prize.points } className={ 'w-full max-w-100 grid grid-cols-3 gap-3 text-sm font-mono text-center' }>
                        <div className={ 'flex items-center justify-center' }>{ prize.points }</div>
                        <div className={ 'flex items-center justify-center' }>{ prize.winners }</div>
                        <div className={ 'flex items-center justify-start ps-3' }><Currency amount={ prize.value } /></div>
                    </div>
                )) }
            </div>
            <div className={ 'pt-0.5 bg-mist-500 w-full inline' }></div>
        </div>
    )
}

export default Contest
