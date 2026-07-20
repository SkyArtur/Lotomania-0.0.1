const ICON_PNG_192 = '/android-chrome-192x192.png'

function Icon({ width, height, src }) {
    return (
        <img width={ width } height={ height } src={ src ?? ICON_PNG_192 } alt={ 'Ícone Loterias da Caixa' }/>
    )
}

export default Icon
