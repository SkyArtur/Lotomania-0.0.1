import { Link } from 'react-router'
import Icon from "./Icon.jsx";


function Header() {
    return (
        <header className={ 'w-full ps-4 py-3 flex items-center justify-start' }>
            <Link to={ '/' } className={ 'flex items-center justify-start' }>
                <Icon width={ '35px' } height={ '35px' }/>
                <h1 className={ 'ps-2 flex justify-center items-center text-4xl font-bold text-orange-500' }>
                    Lotomania <sup className={ 'text-[.8rem] text-blue-900 font-semibold font-mono' }>APP</sup>
                </h1>
            </Link>
        </header>
    )
}

export default Header
