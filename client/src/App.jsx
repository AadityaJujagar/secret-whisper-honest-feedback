import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import ProtectedRoutes from "./components/common/ProtectedRoutes";

export const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* protected routes */}
          <Route
            path="/profile/:userId?"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </main>
      <Footer /> 
    </div>
  );
};
