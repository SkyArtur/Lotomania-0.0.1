import {Route, Routes} from "react-router";
import Dashboard from "../pages/Dashboard.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";


function Main() {
    return (
        <main className={"w-full h-full p-1 max-h-screen overflow-y-auto flex items-center justify-center"}>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </main>
    )
}

export default Main;
