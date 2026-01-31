import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Welcome 👋</h1>

      <p className="text-gray-600 text-center max-w-md">
        A simple profile-based comment app with real-time updates.
      </p>

      {!isAuthenticated && (
        <div className="flex gap-4">
          <Link to="/signup">Get Started</Link>
          <Link to="/login">Login</Link>
        </div>
      )}

      {isAuthenticated && <Link to="/profile">Go to your profile →</Link>}
    </div>
  );
};
