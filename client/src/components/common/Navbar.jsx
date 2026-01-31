import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b">
      <Link to="/" className="font-bold text-xl">
        MyApp
      </Link>

      <div className="flex gap-4 items-center">
        {!isAuthenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/profile")}>Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};
