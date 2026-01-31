import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { MessageSquareHeart } from "lucide-react";

export const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="mx-auto px-4 h-auto flex items-center justify-between max-w-5xl">
        <nav className="w-full flex items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="bg-primary/10 p-2 rounded-lg">
              <MessageSquareHeart className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              TrueFeedback
            </span>
          </Link>

          <div className="flex gap-3 items-center">
            <>
              <Link to="/about">
                <div className="inline-flex items-center justify-center h-8 text-sm p-4 rounded-md hover:text-slate-700 font-semibold hover:font-bold transition bg-transparent">
                  About
                </div>
              </Link>
              <Link to="/plans">
                <div className="inline-flex items-center justify-center h-8 text-sm p-4 rounded-md hover:text-slate-700 font-semibold hover:font-bold transition bg-transparent">
                  See Plans
                </div>
              </Link>
            </>
            {!isAuthenticated ? (
              <>
                <Link to="/auth">
                  <div className="inline-flex items-center justify-center h-8 text-sm hover:border p-4 border rounded-md hover:text-slate-900 hover:bg-slate-50 transition bg-transparent">
                    Login
                  </div>
                </Link>
                <Link to="/auth">
                  <div className="inline-flex items-center justify-center h-8 px-2 text-sm rounded-md border-border hover:bg-indigo-400 transition bg-primary text-primary-foreground">
                    Get Started
                  </div>
                </Link>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/profile")}>
                  <div className="inline-flex items-center justify-center h-8 text-sm hover:border p-4 border rounded-md hover:text-slate-900 hover:bg-slate-50 transition bg-transparent">
                    Your Profile
                  </div>
                </button>
                <button onClick={handleLogout}>
                  <div className="inline-flex items-center justify-center h-8 px-2 text-sm rounded-md border-border hover:bg-indigo-400 transition bg-primary text-primary-foreground">
                    Logout
                  </div>
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
