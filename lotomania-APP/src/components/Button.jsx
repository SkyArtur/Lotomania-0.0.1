export default function Button({type, classes, text, ...props}) {
    const classNames = `${classes} w-full rounded-lg font-bold py-1 border-2 border-mist-500 bg-linear-60 ` +
        'from-orange-500 to-orange-400 cursor-pointer select-none transition-all ' +
        'active:scale-[.97] hover:border-mist-600'

    return (
        <button className={classNames} type={type} {...props}>{text}</button>
    )
}