import { Route, Routes, Navigate, Outlet } from 'react-router'
import { useAuth } from '../context/AuthContext.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'


function RequireAuth() {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to={ '/login' } replace />;
}

function Main() {
    return (
        <main className={ 'w-full h-full max-h-screen overflow-y-auto flex items-center justify-center scrollbar-app' }>
            <Routes>
                <Route element={ <RequireAuth /> }>
                    <Route path={ '/' } element={ <Dashboard /> } />
                </Route>
                <Route path={ '/login' } element={ <Login /> } />
                <Route path={ '/register' } element={ <Register /> } />
            </Routes>
        </main>
    )
}

export default Main
