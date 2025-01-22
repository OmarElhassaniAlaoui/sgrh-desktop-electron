import { createBrowserRouter, Navigate } from 'react-router-dom'; 
import Settings from './pages/Settings';
import DashboardLayout from './layouts/DashboardLayout';
import Accueil from './pages/accueil';
import DemandeConges from './pages/demand-conges';
import AjouterFontionnaire from './pages/ajouter-fontionnaire';


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
                element: <Accueil />,
            },
            {
                path: 'demande-conges',
                element: <DemandeConges />,
            },
            {
                path: 'settings',
                element: <Settings />,
            },
            {
                path: 'ajouter-fonctionnaires',
                element: <AjouterFontionnaire />,
            },
        ],
    },
]) ;  

export default router ;