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
                    <div className={ 'flex flex-col items-start justify-center' }>
                        <small className={ 'self-end text-[.7rem] font-mono text-mist-500' }>Apostador #{ bettor.id }</small>
                        <h3 className={ 'text-2xl p-0 m-0 font-bold text-blue-900' }>{ bettor.username }</h3>
                    </div>
                </div>
                <div className={ 'w-fit flex items-center justify-end gap-2' }>
                    <div className={ 'w-25 p-1 flex flex-col items-center justify-center gap-1' }>
                        <p className={ 'w-fit self-end text-[.7rem] text-mist-500 font-mono truncate' }>Apostas</p>
                        <p className={ 'text-sm self-end font-bold' }>{ <Currency amount={ bettor.total_wagered } /> }</p>
                    </div>
                    <div className={ 'w-25 p-1 flex flex-col items-center justify-center gap-1'}>
                        <p className={ 'w-fit self-end text-[.7rem] text-mist-500 font-mono truncate'}>Prêmios</p>
                        <p className={ 'text-sm self-end font-bold'}>{ <Currency amount={ bettor.total_prizes } /> }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Bettor
