import { BiSolidErrorCircle, BiSolidErrorAlt, BiSolidError } from 'react-icons/bi'

const COLORS = {
    error: 'text-red-500',
    success: 'text-green-500',
    info: 'text-sky-500',
    warning: 'text-yellow-500',
}

const ICONS = {
    error: <BiSolidErrorAlt size={ 20 } />,
    success: <BiSolidErrorCircle size={ 20 } />,
    info: <BiSolidErrorCircle size={ 20 } />,
    warning: <BiSolidError size={ 20 } />,
}

function Message({ type, message }){
    if (!type || !COLORS[type]) type = 'info'
    const messageType = type
    return (
        <p className={ 'text-xs flex justify-start items-center gap-2 text-mist-500' }>
            <span className={ `${ COLORS[messageType] } font-bold flex justify-center items-center gap-1` }>
                { ICONS[messageType] }
                {`${String(type).toUpperCase() ?? 'Message'}: `}
            </span>
            { `${ message ?? 'No message' }` }
        </p>
    )
}

export default Message
