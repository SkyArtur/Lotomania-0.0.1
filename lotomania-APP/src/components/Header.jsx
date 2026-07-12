function Header() {
    return (
        <header className={"w-full ps-4 py-3 flex items-center justify-start border-b-2 border-mist-900/50"}>
            <img width={'35px'} height={'35px'} src={'/android-chrome-192x192.png'} alt={'Logo Loterias da Caixa'}/>
            <h1 className="ps-2 flex justify-center items-center text-4xl font-bold text-orange-500">
                Lotomania <sup className={'text-[.9rem] font-semibold font-mono'}>APP</sup>
            </h1>
        </header>
    )
}

export default Header;
