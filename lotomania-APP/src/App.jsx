import { BrowserRouter, Routes, Route } from 'react-router'

import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'


function App() {
    return (
        <main className="h-auto flex flex-col items-center justify-center bg-app-image-sunshine text-gray-900 ">
            <div className="container flex flex-col items-center justify-start h-screen max-h-screen overflow-y-auto bg-mist-200">
                <div className={"w-full ps-4 py-3 flex items-center justify-start border-b-2 border-mist-500"}>
                    <img width={'35px'} height={'35px'} src={'/android-chrome-192x192.png'} alt={'Logo Loterias da Caixa'}/>
                    <h1 className="ps-2 flex justify-center items-center text-4xl font-bold text-orange-500">
                        Lotomania <sup className={'text-[.9rem] font-semibold font-mono'}>APP</sup>
                    </h1>
                </div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </BrowserRouter>
            </div>

        </main>


    )
}

export default App
