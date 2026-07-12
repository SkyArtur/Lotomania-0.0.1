export default function Button({type, classes, text, ...props}) {
    let color = 'from-blue-500 to-blue-400'

    if (!type) type = 'button';
    if (!classes) classes = '';
    if (!text) text = 'Button';
    if (!props) props = {};
    if (type === 'submit') color = 'from-orange-500 to-orange-400';

    const classNames = `${classes} w-full rounded-lg font-bold py-1 border-2 border-mist-500 bg-linear-60 ` +
        `${color} cursor-pointer select-none transition-all active:scale-[.97] hover:border-mist-600`

    return (
        <button className={classNames} type={type} {...props}>{text}</button>
    )
}