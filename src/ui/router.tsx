import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DemandeConges from "./pages/demand-conges";
import Accueil from "./pages/accueil";
import CreerConge from "./pages/CreerConge";
import SoldeConge from "./pages/SoldeConge";
import Rapports from "./pages/Rapports";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "accueil",
        element: <Accueil />,
      },
      {
        path: "demande-conges",
        element: <DemandeConges />,
      },
      {
        path: "creer-conge",
        element: <CreerConge />,
      },
      {
        path: "solde-de-conge",
        element: <SoldeConge />,
      },
      {
        path: "rapports",
        element: <Rapports />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "parametres",
        element: <Settings />,

      }
    ],
  },
  {
    path: "/auth",
    element: <Navigate to="/login" replace />,
  },
]);

export default router;
