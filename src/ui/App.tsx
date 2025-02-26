import { Routes, Route, Navigate } from "react-router-dom";
import { Accueil, CreateLeave, Request, Settings } from "./_root/pages";
import RootLayout from "./_root/RootLayout";
import { LoginForm } from "./_auth/forms/login-form";
import AuthLayout from "./_auth/AuthLayout";
import { useLoginStore } from "../ui/_auth/store/login-store"; // Adjust this import path as needed
import ListeFonctionnaire from "./_root/pages/ListeFonctionnaire";
import TemplatePage from "./_root/pages/template";

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useLoginStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  const isAuthenticated = useLoginStore((state) => state.isAuthenticated);

  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />
            }
          />
        </Route>

        {/* private routes */}
        <Route
          element={
            <ProtectedRoute>
              <RootLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Accueil />} />
          <Route path="/request" element={<Request />} />
          <Route path="/request/create" element={<CreateLeave />} />
          <Route path="/liste-fonctionnaire" element={<ListeFonctionnaire />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/template" element={<TemplatePage />} />
        </Route>

        {/* Catch all route - redirect to login if not authenticated, home if authenticated */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </main>
  );
};

export default App;
