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
        <div className={ 'w-full py-1 flex items-center justify-center select-none' }>
            <div className={ 'w-full max-w-2xl flex flex-wrap items-center justify-center sm:justify-between gap-2' }>
                <div className={ 'w-fit p-1 flex items-center justify-center' }>
                    <div className={ 'relative flex flex-col items-start justify-center' }>
                        <small className={ 'absolute -top-2 -right-3 text-[.7rem] font-mono text-mist-500' }>apostador #{ bettor.id }</small>
                        <h3 className={ 'text-2xl p-0 m-0 font-bold text-blue-900' }>{ bettor.username }</h3>
                    </div>
                </div>
                <div className={ 'w-fit flex items-center justify-end gap-2' }>
                    <div className={ 'w-25 p-1 relative flex flex-col items-center justify-center gap-1' }>
                        <p className={ 'absolute w-fit -top-2 left-0 text-[.7rem] text-mist-500 font-mono self-start truncate' }>Total Apostado</p>
                        <p className={ 'text-sm self-end font-bold' }>{ <Currency amount={ bettor.total_wagered } /> }</p>
                    </div>
                    <div className={ 'w-25 p-1 relative flex flex-col items-center justify-center gap-1'}>
                        <p className={ 'absolute w-fit -top-2 left-0 text-[.7rem] text-mist-500 font-mono self-start truncate'}>Total em prêmios</p>
                        <p className={ 'text-sm self-end font-bold'}>{ <Currency amount={ bettor.total_prizes } /> }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Bettor
