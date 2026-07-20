import { useEffect, useRef, useState } from 'react'
import { AiFillCloseSquare, AiOutlineClose, AiOutlinePlus, AiOutlineReload } from 'react-icons/ai'

import { useAuth } from "../context/AuthContext.jsx";
import { useApi } from "../hooks/useApi.js";
import Input from "./Input.jsx";
import Icon from "./Icon.jsx";
import Currency from "./Currency.jsx";
import {getNumbers} from "../api/getters.jsx";
import { createBet, createContest } from "../api/creates.jsx";
import Button from "./Button.jsx";
import Message from "./Message.jsx";


const VALID_PRIZE_POINTS = [0, 15, 16, 17, 18, 19, 20]

function Form({ bet = false, onClose, onSuccess }) {
    const limit_numbers = bet ? 50 : 20
    const [ formBet ] = useState(bet)
    const { token } = useAuth()
    const { data: numbers } = useApi(() => getNumbers(token), [token])
    const [ selectedNumbers, setSelectedNumbers ] = useState([])
    const [ registeredPrizes, setRegisteredPrizes ] = useState([])
    const [ message, setMessage ] = useState(null)
    const [ submitting, setSubmitting ] = useState(false)
    const formRef = useRef(null)
    const prevPrizesCountRef = useRef(0)

    const sortedPrizes = [ ...registeredPrizes ].sort((a, b) => b.points - a.points)

    useEffect(() => {
        if (!message) return
        const timer = setTimeout(() => setMessage(null), 5000)
        return () => clearTimeout(timer)
    }, [message])

    useEffect(() => {
        if (registeredPrizes.length > prevPrizesCountRef.current) {
            formRef.current?.scrollTo({ top: formRef.current.scrollHeight, behavior: 'instant' })
        }
        prevPrizesCountRef.current = registeredPrizes.length
    }, [registeredPrizes])

    const handleChange = (value) => {
        setSelectedNumbers((prev) => {
            if (prev.includes(value)) {
                return prev.filter((num) => num !== value)
            } else {
                return [...prev, value]
            }
        })
    }

    const handleReset = () => {
        setSelectedNumbers([])
        setRegisteredPrizes([])
    }

    const handleRemovePrize = (points) => {
        setRegisteredPrizes((prev) => prev.filter((prize) => prize.points !== points))
    }

    const handleAddPrize = () => {
        const formData = new FormData(formRef.current)
        const prizeData = {
            points: Number(formData.get('pointsPrizeContest')),
            winners: Number(formData.get('winnersPrizeContest')),
            value: Number(formData.get('valuePrizeContest')),
        }

        if (!VALID_PRIZE_POINTS.includes(prizeData.points)) {
            setMessage({
                type: 'error',
                text: `Pontuação de prêmio inválida: ${ prizeData.points }. ` +
                    `Use um destes valores: ${ VALID_PRIZE_POINTS.join(', ') }.`,
            })
            return
        }

        if (registeredPrizes.some((prize) => prize.points === prizeData.points)) {
            setMessage({ type: 'error', text: `Já existe um prêmio cadastrado para ${ prizeData.points } pontos.` })
            return
        }

        setRegisteredPrizes((prev) => [...prev, prizeData])

        formRef.current.elements.pointsPrizeContest.value = ''
        formRef.current.elements.winnersPrizeContest.value = ''
        formRef.current.elements.valuePrizeContest.value = ''
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (selectedNumbers.length !== limit_numbers) {
            setMessage({ type: 'error', text: `Selecione exatamente ${ limit_numbers } números.` })
            return
        }

        const formData = new FormData(formRef.current)
        setSubmitting(true)

        try {
            if (formBet) {
                await createBet(token, {
                    date: formData.get('dateBet'),
                    value: Number(formData.get('valueBet')),
                    initial: Number(formData.get('initialContest')),
                    final: Number(formData.get('finalContest')),
                    mirror: true,
                    numbers: selectedNumbers,
                })
                onSuccess?.({ type: 'success', text: 'Aposta registrada com sucesso.' })
            } else {
                await createContest(token, {
                    reference: Number(formData.get('referenceContest')),
                    date: formData.get('dateContest'),
                    numbers: selectedNumbers,
                    prizes: sortedPrizes,
                })
                onSuccess?.({ type: 'success', text: 'Concurso registrado com sucesso.' })
            }
            onClose?.()
        } catch (error) {
            setMessage({ type: 'error', text: error.message })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className={ 'fixed inset-0 z-50 flex items-center justify-center bg-mist-800/70 select-none p-4' }>
            <form ref={ formRef }
                  onSubmit={ handleSubmit }
                  onReset={ handleReset }
                  className={ 'w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-app ' +
                      'bg-mist-200 rounded p-3 flex flex-col items-center justify-start gap-2' }>
                <div className={ 'w-full flex items-center justify-between gap-2' }>
                    <div className={ 'w-1/5 flex items-center justify-start gap-2' }>
                        <Icon width={ '20px' } height={ '20px' } />
                    </div>
                    <div className={ 'w-3/5 flex items-center justify-center gap-2' }>
                        <h3 className={ 'text-xl font-semibold text-blue-900' }>
                            { formBet
                                ? 'Registrar Aposta'
                                : 'Registrar Concurso'
                            }
                        </h3>
                    </div>
                    <div className={ 'w-1/5 flex items-center justify-end gap-2' }>
                        <button type={ 'button' }
                                onClick={ onClose }
                                className={ 'cursor-pointer text-red-700 hover:text-red-800' }>
                            <AiFillCloseSquare size={ 20 } />
                        </button>
                    </div>
                </div>
                <div className={'p-2 w-full h-10 flex items-center justify-center gap-2 border-b-2 border-mist-500'}>
                    { message && (
                        <div className={ 'w-full max-w-90 flex items-center justify-center gap-2' }>
                            <Message type={ message.type } message={ message.text } />
                        </div>
                    )}
                </div>
                { formBet
                    ?
                    <div className={ 'w-full flex flex-col items-center justify-center gap-2' }>
                        <div className={ 'w-full flex items-center justify-evenly gap-2' }>
                            <div className={ 'flex flex-col items-center justify-center gap-2' }>
                                <label className={'text-xs self-start'}>Data da Aposta</label>
                                <Input type={ 'date' }
                                       name={ 'dateBet' }
                                       id={ 'dateBet' }
                                       width={ 'w-40' }
                                />
                            </div>
                            <div className={ 'flex flex-col items-center justify-center gap-2' }>
                                <label className={'text-xs self-start'}>Valor da Aposta</label>
                                <Input type={ 'number' }
                                       step={ '0.01' }
                                       name={ 'valueBet' }
                                       id={ 'valueBet' }
                                       placeholder={ 'R$ 0,00' }
                                       width={ 'w-25' }
                                />
                            </div>
                        </div>
                        <div className={ 'w-full flex items-center justify-center gap-2' }>
                            <div className={ 'flex flex-col items-center justify-center gap-2' }>
                                <label className={'text-xs self-start'}>Concurso Inicial</label>
                                <Input type={ 'number' }
                                       step={ '1' }
                                       name={ 'initialContest' }
                                       id={ 'initialContest' }
                                       placeholder={ '0000' }
                                       width={ 'w-25' }
                                />
                            </div>
                            <div className={ 'flex flex-col items-center justify-center gap-2' }>
                                <label className={'text-xs self-start'}>Concurso Final</label>
                                <Input type={ 'number' }
                                       step={ '1' }
                                       name={ 'finalContest' }
                                       id={ 'finalContest' }
                                       placeholder={ '0000' }
                                       width={ 'w-25' }
                                />
                            </div>
                        </div>
                    </div>
                    :
                    <div className={ 'w-full flex items-center justify-evenly gap-2' }>
                        <div className={ 'flex flex-col items-center justify-center gap-2' }>
                            <label className={'text-xs self-start'}>Referência</label>
                            <Input type={ 'number' }
                                   width={ 'max-w-25' }
                                   step={ '1' }
                                   name={ 'referenceContest' }
                                   id={ 'referenceContest' }
                                   placeholder={ '0000' }
                            />
                        </div>
                        <div className={ 'flex flex-col items-center justify-center gap-2' }>
                            <label className={'text-xs self-start'}>Data</label>
                            <Input type={ 'date' }
                                   width={ 'max-w-35' }
                                   name={ 'dateContest' }
                                   id={ 'dateContest' }
                            />
                        </div>
                    </div>
                }
                <div className={ 'w-full p-1 flex flex-col items-center justify-center border-t-2 border-mist-500' }>
                    <div className={ 'w-full p-2 flex items-center justify-between gap-2' }>
                        <div className={ 'w-4/5 flex items-center justify-start gap-2'}>
                            <h3 className={ 'text-base font-semibold text-blue-900' }>Números</h3>
                        </div>

                        <div className={ 'w-1/5 flex items-center justify-end gap-2' }>
                            {
                                <p className={'text-lg font-bold text-blue-900'}>
                                    { String(selectedNumbers.length).padStart(2, '0') }
                                </p>
                            }
                        </div>
                    </div>
                    <div className={'w-full grid grid-cols-10 gap-1 select-none bg-mist-100 border-2 rounded border-mist-500 p-2 '}>
                        { numbers?.map((number) => {
                            const isChecked = selectedNumbers.includes(number)
                            const limitReached = selectedNumbers.length >= limit_numbers

                            return (
                                <div key={ number } className={ 'flex items-center justify-center w-8 h-8 md:w-10 md:h-10 ' +
                                    'p-0.5 rounded-full bg-mist-500 hover:bg-orange-500 has-checked:bg-orange-500 ' +
                                    'transition-all duration-300 ease-in-out' }>
                                    <label className={ 'text-base font-semibold w-full h-full flex items-center justify-center ' +
                                        'rounded-full transition-all duration-300 ease-in-out cursor-pointer bg-mist-200 ' +
                                        'has-checked:bg-mist-100 has-checked:text-blue-900 ' +
                                        'has-disabled:cursor-not-allowed has-disabled:opacity-30' }>
                                        { String(number).padStart(2, '0') }
                                        <input type={ 'checkbox' }
                                               name={ 'numbers' }
                                               id={ 'number' + number }
                                               value={ number }
                                               checked={ isChecked }
                                               disabled={ !isChecked && limitReached }
                                               className={ 'hidden' }
                                               onChange={ () => handleChange(number) }
                                        />
                                    </label>
                                </div>
                            )
                        }) }
                    </div>
                </div>
                { !formBet && (
                    <div className={ 'w-full flex flex-col items-center justify-center p-2 gap-2 border-t-2 border-mist-500' }>
                        <div className={ 'w-full flex items-center justify-start gap-2'}>
                            <h3 className={ 'text-base font-semibold text-blue-900' }>Premiações</h3>
                        </div>
                        <div className={ 'w-full flex items-center justify-evenly gap-2' }>
                            <div className={ 'flex flex-col items-center justify-center gap-2' }>
                                <label className={ 'text-mist-500 text-sm self-start' }>Pontos</label>
                                <Input width={ 'max-w-15' }
                                       type={ 'number' }
                                       step={ '1' }
                                       id={ 'pointsPrizeContest' }
                                       name={ 'pointsPrizeContest' }
                                       placeholder={ '00' } />
                            </div>
                            <div className={ 'flex flex-col items-center justify-center gap-2' }>
                                <label className={ 'text-mist-500 text-sm self-start' }>Ganhadores</label>
                                <Input width={ 'max-w-20' }
                                       type={ 'number' }
                                       step={ '1' }
                                       id={ 'winnersPrizeContest' }
                                       name={ 'winnersPrizeContest' }
                                       placeholder={ '0000' } />
                            </div>
                            <div className={ 'flex flex-col items-center justify-center gap-2' }>
                                <label className={ 'text-mist-500 text-sm self-start' }>Valor</label>
                                <Input width={ 'max-w-35' }
                                       type={ 'number' }
                                       step={ '0.01' }
                                       id={ 'valuePrizeContest' }
                                       name={ 'valuePrizeContest' }
                                       placeholder={ 'R$ 0,00' } />
                            </div>
                            <div className={ 'ps-3 pb-1 self-end flex items-end justify-start gap-2' }>
                                <button className={ 'cursor-pointer select-none flex justify-center items-center' }
                                        type={ 'button' } onClick={ handleAddPrize }>
                                    <AiOutlinePlus size={ 30 } className={ 'text-mist-500 hover:scale-120 hover:text-orange-500 transition-all duration-300 ease-in-out' } />
                                </button>
                            </div>
                        </div>
                        <div className={ 'w-full flex flex-col items-center justify-center gap-1' }>
                            { registeredPrizes.length > 0 && (
                                <div className={ 'w-full max-w-100 grid grid-cols-[auto_1fr_1fr_1fr] gap-3 font-semibold text-center border-b-2 border-mist-500' }>
                                    <div></div>
                                    <div className={ 'text-[.90rem] flex items-center justify-center' }>Pontos</div>
                                    <div className={ 'text-[.90rem] flex items-center justify-center' }>Ganhadores</div>
                                    <div className={ 'text-[.90rem] flex items-center justify-center' }>Valor</div>
                                </div>
                            ) }
                            { sortedPrizes.map((prize) => (
                                <div key={ prize.points } className={ 'w-full max-w-100 grid grid-cols-[auto_1fr_1fr_1fr] gap-3 text-sm font-mono text-center items-center' }>
                                    <button type={ 'button' }
                                            onClick={ () => handleRemovePrize(prize.points) }
                                            className={ 'w-5 h-5 flex items-center justify-center rounded-full bg-white text-mist-500 ' +
                                                'cursor-pointer hover:text-red-600 transition-colors duration-300' }>
                                        <AiOutlineClose size={ 14 } />
                                    </button>
                                    <div className={ 'flex items-center justify-center' }>{ prize.points }</div>
                                    <div className={ 'flex items-center justify-center' }>{ prize.winners }</div>
                                    <div className={ 'flex items-center justify-center' }><Currency amount={ prize.value } /></div>
                                </div>
                            )) }
                        </div>
                    </div>
                ) }
                <div className={ 'w-full flex items-center justify-between p-2 gap-2 border-t-2 border-mist-500' }>
                    <button type={ 'reset' } disabled={ submitting } className={ 'cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-40' }>
                        <AiOutlineReload size={ 25 } className={ 'text-mist-500 hover:scale-120 hover:text-orange-500 active:rotate-180 transition-all duration-300 ease-in-out' } />
                    </button>
                    <Button type={ 'submit' } disabled={ submitting } text={ submitting ? 'Enviando...' : 'Registrar' } classes={ 'max-w-30' }/>
                </div>
            </form>
        </div>
    )
}

export default Form
