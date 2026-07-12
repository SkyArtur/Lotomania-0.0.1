import { Link, useNavigate } from "react-router";
import { useState } from 'react';

import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { useAuth } from "../context/AuthContext.jsx";


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await login(username, password);
            navigate('/')
        } catch {
            setError('Usuário ou senha inválidos.')
        }

    }

    return (
        <div className="max-w-180 h-full p-2 mx-auto flex flex-col items-center justify-start">
            <div className={"w-full flex items-center justify-center"}>
                <span className="ps-2 flex justify-center items-center text-xl h-5"></span>
            </div>
            <div className={'flex flex-wrap items-center justify-center w-full'}>
                <div className={'w-1/2 min-w-75 sm:h-full flex flex-col items-center justify-start gap-2 py-2'}>
                    <h3 className={'text-xl font-semibold text-blue-900'}>Acompanhamento de apostas</h3>
                    <small className={'text-gray-800 text-sm text-justify italic px-2 max-w-65'}>
                        Aplicação para uso pessoal no gerenciamento de apostas na Lotomania. Modalidade de loteria
                        oferecida pela Caixa Econômica Federal. Realize o login para acessar o sistema.
                    </small>
                </div>
                <div className={'w-1/2 min-w-75 sm:h-full'}>
                    <form onSubmit={handleSubmit} className="w-full py-3 flex flex-col items-center justify-center gap-2">
                        <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {error && <p className={'text-sm text-red-600'}>{error}</p>}
                        <div className="w-full px-3 py-2 flex flex-col items-center justify-center gap-2">
                            <Button classes={'max-w-75'} text={'Entrar'} type="submit" />
                        </div>
                        <div className={'flex justify-end w-5/6'}>Não tem conta?
                            <Link className={'ps-2 text-blue-700 font-semibold hover:underline'} to={"/register"}>Cadastre-se!</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
