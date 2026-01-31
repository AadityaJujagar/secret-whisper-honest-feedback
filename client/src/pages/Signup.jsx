import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useLocation, useNavigate, Link } from "react-router-dom";

export const Signup = () => {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await signup({ name, email, password, confirmPassword });
    if (ok) {
      // pass through the original `from` so login can redirect after sign-in
      navigate("/login", { state: location.state || undefined });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 border rounded-md shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Signup
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            state={location.state}
            className="text-blue-600 hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};
