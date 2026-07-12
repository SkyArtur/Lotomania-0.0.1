import { Link, useNavigate } from "react-router";
import { useState } from 'react';

import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        navigate('/')
    }

    return (
        <div className="max-w-180 h-full  p-2 mx-auto flex flex-col items-center justify-start">
            <div className={"w-full flex items-center justify-center"}>
                <span className="ps-2 flex justify-center items-center text-xl h-5"></span>
            </div>
            <div className={'flex flex-wrap-reverse items-center justify-center w-full'}>
                <div className={'w-1/2 min-w-75 sm:h-full flex flex-col items-center justify-around gap-2 py-2'}>
                    <h3 className={'text-xl font-semibold invisible sm:visible'}>Acompanhamento de apostas</h3>
                    <p className={'text-gray-800 text-justify italic px-2 invisible sm:visible'}>
                        Aplicação para uso pessoal no gerenciamento de apostas na Lotomania. Modalidade de loteria
                        oferecida pela Caixa Econômica Federal.
                    </p>
                    <small className={'text-xs'}>Copyright (c) 2026 Artur dos Santos Shon</small>
                </div>
                <div className={'w-1/2 min-w-75 sm:h-full'}>
                    <form onSubmit={handleSubmit} className="w-full py-3 flex flex-col items-center justify-center gap-2">
                        <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <div className="w-full px-3 py-2 flex flex-col items-center justify-center gap-2">
                            <Button classes={'max-w-75'} text={'Entrar'} type="submit" />
                        </div>
                        <div className={'flex flex-col'}>
                            <span className={'text-sm'}>Não tem conta?</span>
                            <Link className={'ps-2 text-blue-600 font-semibold hover:underline'} to={"/register"}>Cadastre-se</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};