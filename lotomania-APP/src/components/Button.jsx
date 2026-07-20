function Button({ type, classes, text, ...props }) {

    if (!type) type = 'button'
    if (!classes) classes = ''
    if (!text) text = 'Button'
    if (!props) props = {}

    const classNames = 'w-full text-mist-100 rounded font-bold py-1 border-2 border-orange-500 bg-orange-500 ' +
        'cursor-pointer select-none transition-all duration-300 active:scale-[.97] hover:border-orange-300 ' +
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 '

    return (
        <button className={ classNames + classes } type={ type } { ...props }>{ text }</button>
    )
}

export default Button
