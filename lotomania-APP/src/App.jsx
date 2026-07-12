import {BrowserRouter} from "react-router";

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Main from "./components/Main.jsx";


function App() {
    return (
        <div className="h-auto flex flex-col items-center justify-center bg-app-image-sunshine text-gray-900 ">
            <div className="container flex flex-col items-center justify-between h-screen max-h-screen bg-mist-200">
                <BrowserRouter>
                    <Header />
                    <Main />
                    <Footer />
                </BrowserRouter>
            </div>
        </div>
    )
}

export default App
