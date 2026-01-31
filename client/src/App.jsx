import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { NotFound } from "./pages/NotFound";
import { About } from "./pages/About";
import { AuthPage } from "./pages/Auth";
import { PlansPage } from "./pages/PaidPlans";
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
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="*" element={<NotFound />} />

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
