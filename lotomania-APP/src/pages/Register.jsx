import { useNavigate } from "react-router";
import { useState } from 'react';

import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";


function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        navigate('/')
    }
    return (
        <div className="max-w-180 h-full p-2 mx-auto flex flex-col items-center justify-start">
            <div className={"w-full flex items-center justify-center"}>
                <span className="ps-2 flex justify-center items-center text-xl h-5"></span>
            </div>
            <div className={'flex flex-col items-center justify-center w-full'}>
                <div className={'max-w-100 min-w-75 sm:h-full flex flex-col items-center justify-around gap-2 py-2'}>
                    <h3 className={'text-xl font-semibold text-blue-900'}>Registre seu usuário e senha</h3>
                    <small className={'text-gray-800 text-sm text-justify italic px-2 max-w-65'}>
                        Observe um limite de 15 caracteres para o campo username e o mínimo de 8 caracteres
                        para o campo password.
                    </small>
                </div>
                <div className={'min-w-75 sm:h-full'}>
                    <form onSubmit={handleSubmit} className="w-full py-3 flex flex-col items-center justify-center gap-2">
                        <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <div className={'w-3/4 flex flex-col items-center justify-center gap-1 py-2'}>
                            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <Input type="password" placeholder="Confirm Password" />
                        </div>
                        <div className="w-full px-3 py-2 flex items-center justify-around gap-2">
                            <Button classes={'max-w-45'} text={'Registrar'} type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
