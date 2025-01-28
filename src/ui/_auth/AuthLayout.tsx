import { Outlet, Navigate } from "react-router-dom"
import { useLoginStore } from './store/login-store'

export default function AuthLayout() {
    const isAuthenticated = useLoginStore(state => state.isAuthenticated)
    
    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/" />
            ) : (
                <>
                    <section className="flex flex-1 justify-center items-center flex-col py-10">
                        <Outlet />
                    </section>
                </>
            )}
        </>
    )
}