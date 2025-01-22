import { createBrowserRouter, Navigate } from 'react-router-dom'; 
import Settings from './pages/Settings';
import About from './pages/About';
import { Home } from 'lucide-react';
import DashboardLayout from './layouts/DashboardLayout';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
    } , 
    {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'settings',
                element: <Settings />,
            },
        ],
    },
]) ;  

export default router ;