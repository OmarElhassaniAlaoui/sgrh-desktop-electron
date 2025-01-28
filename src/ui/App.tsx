import { Routes, Route } from "react-router-dom";
import { Accueil, AjouterFonctionnaire, CreeConge, Settings, } from "./_root/pages";
import RootLayout from "./_root/RootLayout";
import { LoginForm } from "./_auth/forms/login-form";
import AuthLayout from "./_auth/AuthLayout";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes  */}
        <Route  element={<AuthLayout />} >
          <Route path="/login" element={<LoginForm />} />
        </Route>
        {/* private  routes  */}
      <Route element={<RootLayout />}>
          <Route index  element={<Accueil />} />
          <Route path="/cree-conge" element={<CreeConge />} />
          <Route path="/ajouter-fonctionnaire" element={<AjouterFonctionnaire />} />
          <Route path="/settings" element={<Settings />} />     
        </Route> 
      </Routes>
    </main>
  );
};

export default App;
