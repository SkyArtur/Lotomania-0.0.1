import Currency from './Currency.jsx'


function Bettor({ bettor }) {

    if (!bettor) {
        bettor = {
            id: 0,
            username: 'loading...',
            total_prizes: 0,
            total_wagered: 0,
        }
    }

    return (
        <div className={ 'w-full px-2 py-1 flex items-center justify-center gap-2 select-none' }>
            <div className={ 'w-fit p-1 flex flex-col items-center justify-center' }>
                <div className={ 'flex flex-col items-start justify-center' }>
                    <small className={ 'text-[.7rem] font-mono text-mist-500' }>apostador #{ bettor.id }</small>
                    <h3 className={ 'text-2xl p-0 m-0 font-bold text-blue-900' }>{ bettor.username }</h3>
                </div>
            </div>
            <div className={ 'w-3/4 flex items-center justify-center gap-2' }>
                <div className={ 'w-fit p-1 flex flex-col items-center justify-center gap-1' }>
                    <p className={ 'text-xs text-mist-500 font-mono self-start' }>Total Apostado</p>
                    <p className={ 'text-sm self-end font-bold' }>{ <Currency amount={ bettor.total_wagered } /> }</p>
                </div>
                <div className={ 'w-fit p-1 flex flex-col items-center justify-center gap-1'}>
                    <p className={ 'text-xs text-mist-500 font-mono self-start'}>Total em prêmios</p>
                    <p className={ 'text-sm self-end font-bold'}>{ <Currency amount={ bettor.total_prizes } /> }</p>
                </div>
            </div>
        </div>
    )
}


export default Bettor
