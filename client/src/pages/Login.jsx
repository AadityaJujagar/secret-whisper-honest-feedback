import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useLocation, useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login({ email, password });
    if (ok) {
      const to = location.state?.from?.pathname || "/profile";
      navigate(to, { replace: true });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 border rounded-md shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            state={location.state}
            className="text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};
