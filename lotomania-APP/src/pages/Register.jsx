import { useNavigate } from 'react-router'
import { useState } from 'react'

import { register } from '../api/auth.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'


function Register() {

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ error, setError ] = useState(null)
    const navigate = useNavigate()
    const { login } = useAuth()

    async function handleSubmit(event) {
        event.preventDefault()
        setError(null)

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.')
            return
        }

        try {
            await register(username, password)
            await login(username, password)
            navigate('/')
        } catch {
            setError('Não foi possível concluir o cadastro. Verifique os dados e tente novamente.')
        }
    }

    return (
        <div className={ 'max-w-180 h-full p-2 mx-auto flex flex-col items-center justify-start' }>
            <div className={ 'w-full flex items-center justify-center' }>
                <span className={ 'ps-2 flex justify-center items-center text-xl h-5' }></span>
            </div>
            <div className={ 'flex flex-wrap items-center justify-center w-full' }>
                <div className={ 'w-1/2 min-w-75 sm:h-full flex flex-col items-center justify-start gap-2 py-2' }>
                    <h3 className={ 'text-xl font-semibold text-blue-900' }>Registre seu usuário e senha</h3>
                    <small className={ 'text-gray-800 text-sm text-justify italic px-2 max-w-65 '}>
                        Observe um limite de 15 caracteres para o campo username e o mínimo de 8 caracteres
                        para o campo password.
                    </small>
                </div>
                <div className={ 'w-1/2 min-w-75 sm:h-full flex-col items-center justify-center gap-2 py-2' }>
                    <form onSubmit={ handleSubmit } className={ 'w-full py-3 flex flex-col items-center justify-center gap-2' }>
                        <Input type={ 'text' }
                               placeholder={'Username'}
                               value={ username }
                               onChange={ (e) => setUsername(e.target.value) }/>
                        <Input type={ 'password' }
                               placeholder={ 'Password' }
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                        <Input type={ 'password' }
                               placeholder={ 'Confirm Password' }
                               value={ confirmPassword }
                               onChange={ (e) => setConfirmPassword(e.target.value) }/>
                        <div className={ 'h-7 max-w-75' }>
                            { error && <p className={'text-sm text-red-600'}>{ error }</p> }
                        </div>
                        <div className={ 'w-full px-3 py-2 flex items-center justify-around gap-2' }>
                            <Button classes={ 'max-w-45' } text={ 'Registrar' } type={ 'submit' }/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
