function Input({ type, placeholder, name, value, onChange }) {
    const classNames = 'border-2 border-mist-500 rounded-md ps-2 py-1 bg-mist-100 w-full max-w-75 min-w-50 ' +
        'focus:outline-1 focus:outline-orange-500'

    return (
        <input className={ classNames }
               type={ type }
               name={ name }
               value={ value }
               placeholder={ placeholder }
               onChange={ onChange } />
    )
}

export default Input
