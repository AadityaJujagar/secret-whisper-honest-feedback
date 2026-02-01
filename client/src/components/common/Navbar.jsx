import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { MessageSquareHeart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    function handleOutside(e) {
      if (!open) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="mx-auto px-4 h-auto flex items-center justify-between max-w-5xl">
        <nav className="w-full relative flex items-center justify-between px-6 py-4">
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

          <div className="hidden md:flex gap-3 items-center">
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

            {!isAuthenticated ? (
              <>
                <Link to="/auth?mode=login">
                  <div className="inline-flex items-center justify-center h-8 text-sm hover:border p-4 border rounded-md hover:text-slate-900 hover:bg-slate-50 transition bg-transparent">
                    Login
                  </div>
                </Link>
                <Link to="/auth?mode=signup">
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

          <div className="md:hidden flex items-center">
            <button
              ref={btnRef}
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="p-2 rounded-md hover:bg-muted/30 transition"
            >
              {!open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>

            <div
              ref={menuRef}
              className={`absolute top-full  right-4 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg transform transition duration-200 origin-top-right z-50
                ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
              style={{ willChange: "transform, opacity" }}
            >
              <div className="py-2">
                <Link to="/about" onClick={() => setOpen(false)}>
                  <div className="px-4 py-2 hover:bg-primary/5">About</div>
                </Link>
                <Link to="/plans" onClick={() => setOpen(false)}>
                  <div className="px-4 py-2 hover:bg-primary/5">See Plans</div>
                </Link>
                <div className="border-t border-border/30 my-1" />
                {!isAuthenticated ? (
                  <>
                    <Link to="/auth?mode=login" onClick={() => setOpen(false)}>
                      <div className="px-4 py-2 hover:bg-primary/5">Login</div>
                    </Link>
                    <Link to="/auth?mode=signup" onClick={() => setOpen(false)}>
                      <div className="px-4 py-2 hover:bg-primary/5">
                        Get Started
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setOpen(false);
                        navigate("/profile");
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-primary/5"
                    >
                      Your Profile
                    </button>
                    <button
                      onClick={() => {
                        setOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-primary/5"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
