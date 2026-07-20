import { LuPanelTopOpen, LuPanelTopClose } from 'react-icons/lu'
import { useState } from 'react'
import Currency from './Currency.jsx'


function Bet ({ bet }) {
    const [ showNumbers, setShowNumbers ] = useState(false)
    const [ showResults, setShowResults ] = useState(false)

    if (!bet) return null

    const date = new Date(bet.date).toLocaleDateString('pt-BR')
    const prizes = [ ...bet.prizes ].sort((a, b) => b.points - a.points)
    const results = [ ...bet.results ].sort((a, b) => b.contest - a.contest)
    const stringNumbers = (number) => String(number).padStart(2, '0')

    return (
        <div className={ 'max-w-2xl w-full flex flex-col items-center justify-center gap-1 p-3 bg-mist-100 rounded-sm select-none' }>
            <div className={ 'w-full flex flex-wrap items-center justify-between gap-x-4 gap-y-2' }>
                <div className={ 'flex flex-col justify-center items-center ps-2' }>
                    <small className={ 'self-start text-[.65rem] font-mono text-mist-500' }>Aposta</small>
                    <h3 className={ 'text-2xl text-orange-500 font-bold' }>
                        <span className={ 'text-mist-500' }>#</span> { bet.id }
                    </h3>
                </div>
                <div className={ 'flex flex-col justify-center items-center ps-2' }>
                    <small className={ 'self-start text-[.65rem] font-mono text-mist-500' }>Validade</small>
                    <h3 className={ 'text-base' }>{ bet.initial } - { bet.final }</h3>
                </div>
                <div className={ 'flex flex-col justify-center items-center ps-2'}>
                    <small className={ 'self-start text-[.65rem] font-mono text-mist-500' }>Data</small>
                    <h3 className={ 'text-base' }>{ date }</h3>
                </div>
                <div className={ 'flex flex-col justify-center items-center ps-2'}>
                    <small className={ 'self-start text-[.65rem] font-mono text-mist-500' }>Valor</small>
                    <h3 className={ 'text-base' }><Currency amount={ bet.value } /></h3>
                </div>
            </div>
            <div className={ 'pt-0.5 bg-mist-500 w-full inline' }></div>
            <div className={ 'w-full flex items-center justify-between px-4 py-1 gap-1' }>
                <div className={ 'text-blue-900 font-semibold' }>Números Apostados</div>
                <button type={ 'button' }
                        onClick={ () => setShowNumbers(!showNumbers) }
                        className={ 'cursor-pointer text-mist-500 hover:text-mist-800' }>
                    { !showNumbers
                        ? <LuPanelTopOpen size={ 20 } />
                        : <LuPanelTopClose size={ 20 }/>
                    }
                </button>
            </div>
            { showNumbers && (
                <div className={ 'w-full grid grid-cols-10 gap-1 max-w-100' }>
                    { bet.numbers.map((number) => (
                        <div key={ number } className={ 'w-full h-full p-1 flex items-center justify-center text-orange-500' }>
                            <span className={ 'text-base font-semibold' }>{stringNumbers(number)}</span>
                        </div>
                    )) }
                </div>
            ) }
            <div className={ 'pt-0.5 bg-mist-500 w-full inline' }></div>
            <div className={ 'w-full flex items-center justify-between px-4 py-1 gap-1' }>
                <div className={ 'text-blue-900 font-semibold' }>Resultados</div>
                <button type={ 'button' }
                        onClick={ () => setShowResults(!showResults) }
                        className={ 'cursor-pointer text-mist-500 hover:text-mist-800' }>
                    { !showResults
                        ? <LuPanelTopOpen size={ 20 } />
                        : <LuPanelTopClose size={ 20 }/>
                    }
                </button>
            </div>
            <div className={ 'w-full flex flex-col items-center justify-center gap-1' }>
                <div className={ 'w-full max-w-100 grid grid-cols-3 gap-3 font-semibold text-center border-b-2 border-mist-500' }>
                    <div className={ 'text-[.90rem] flex items-center justify-center' }>Concurso</div>
                    <div className={ 'text-[.90rem] flex items-center justify-center' }>Pontos</div>
                    <div className={ 'text-[.90rem] flex items-center justify-center' }>Espelho</div>
                </div>
                { results.slice(0, 1).map((result) => (
                    <div key={ result.contest } className={ 'w-full grid max-w-100 grid-cols-3 gap-3 text-sm font-mono text-center' }>
                        <div className={ 'flex items-center justify-center' }>{ result.contest }</div>
                        <div className={ 'flex items-center justify-center' }>{ result.hits }</div>
                        <div className={ 'flex items-center justify-center' }>{ result.mirror_hits }</div>
                    </div>
                )) }
                { showResults && results.slice(1).map((result) => (
                    <div key={ result.contest } className={ 'w-full max-w-100 grid grid-cols-3 gap-3 text-sm font-mono text-center' }>
                        <div className={ 'flex items-center justify-center' }>{ result.contest }</div>
                        <div className={ 'flex items-center justify-center' }>{ result.hits }</div>
                        <div className={ 'flex items-center justify-center' }>{ result.mirror_hits }</div>
                    </div>
                ))}
            </div>
            <div className={ 'pt-0.5 bg-mist-500 w-full inline' }></div>
            { prizes.length > 0 && (
                <div className={ 'w-full flex flex-col items-center justify-center gap-1' }>
                    <div className={ 'w-full flex items-center justify-between px-4 py-1 gap-1' }>
                        <div className={ 'text-blue-900 font-semibold' }>Prêmios</div>
                    </div>
                    <div className={ 'w-full max-w-100 grid grid-cols-3 gap-3 font-semibold text-center border-b-2 border-mist-500' }>
                        <div className={ 'text-[.90rem] flex items-center justify-center' }>Concurso</div>
                        <div className={ 'text-[.90rem] flex items-center justify-center' }>Pontos</div>
                        <div className={ 'text-[.90rem] flex items-center justify-center' }>Valor</div>
                    </div>

                    { prizes.map((prize) => (
                        <div key={ prize.contest } className={ 'w-full max-w-100 grid grid-cols-3 gap-3 text-sm font-mono text-center' }>
                            <div className={'flex items-center justify-center' }>{ prize.contest }</div>
                            <div className={ 'flex items-center justify-center' }>{ prize.points }</div>
                            <div className={ 'flex items-center justify-center' }><Currency amount={ prize.value } /></div>
                        </div>
                    )) }
                </div>
            ) }
        </div>
    )
}

export default Bet
