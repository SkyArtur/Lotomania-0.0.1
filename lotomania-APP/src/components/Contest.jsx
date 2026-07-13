import Currency from "./Currency.jsx";
import Input from "./Input.jsx";

function Contest({ contest }) {

    if (!contest) {
        return null
    }

    const prizes = [...contest.prizes].sort((a, b) => b.points - a.points);
    const date = new Date(contest.date).toLocaleDateString('pt-BR');

    const stringNumbers = (number) => String(number).padStart(2, '0');

    return (
        <div className={'max-w-100 min-w-96 flex flex-col items-center justify-center gap-1 p-3 bg-mist-100 border-2 border-mist-500 rounded-md'}>
            <div className={'w-full flex items-center justify-between gap-1'}>
                <div className={'relative ps-2'}>
                    <small className={'absolute -top-2 left-0 text-xs font-mono text-mist-500'}>concurso</small>
                    <h3 className={'text-2xl font-bold'}>{contest.reference}</h3>
                </div>
                <div className={'relative pe-2'}>
                    <small className={'absolute -top-2 -left-2 text-xs font-mono text-mist-500'}>Data</small>
                    <h3 className={'text-xl'}>{date}</h3>
                </div>
            </div>
            <div className={'pt-0.5 bg-mist-500 w-full inline'}></div>
            <div className={'w-full grid grid-cols-10 gap-1'}>
                { contest.numbers.map((number) => (
                    <div key={number} className={'w-full h-full p-1 flex items-center justify-center text-orange-500'}>
                        <span className={'text-xl font-semibold'}>{stringNumbers(number)}</span>
                    </div>
                )) }
            </div>
            <div className={'pt-0.5 bg-mist-500 w-full inline'}></div>
            <div className={'w-full flex flex-col items-center justify-center gap-1'}>
                <div className={'w-full grid grid-cols-3 gap-3 font-semibold text-center border-b-2 border-mist-500'}>
                    <div className={'flex items-center justify-center'}>Pontos</div>
                    <div className={'flex items-center justify-center'}>Ganhadores</div>
                    <div className={'flex items-center justify-center'}>Prêmio Pago</div>
                </div>
                { prizes.map((prize) => (
                    <div key={ prize.points } className={'w-full grid grid-cols-3 gap-3 text-sm font-mono text-center'}>
                        <div className={'flex items-center justify-center'}>{ prize.points }</div>
                        <div className={'flex items-center justify-center'}>{ prize.winners }</div>
                        <div className={'flex items-center justify-start ps-3'}><Currency amount={ prize.value } /></div>
                    </div>
                )) }
            </div>
        </div>
    )
}

export default Contest;
