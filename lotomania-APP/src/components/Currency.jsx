function Currency({ amount }) {

    const formatter = (value) => {
        const prizeNumber = parseFloat(value)
        return new Intl.NumberFormat(
            'pt-BR',
            { style: 'currency', currency: 'BRL' }
        ).format(prizeNumber)
    }

    return (
        <span>{ formatter(amount) }</span>
    )
}



export default Currency