import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

export const SignupForm = () => {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await signup({ name, email, password, confirmPassword });
    if (ok) {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      toast.success("Proceed for Login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-10 rounded-md border border-border bg-background px-3"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 rounded-md border border-border bg-background px-3"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 rounded-md border border-border bg-background px-3"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-10 rounded-md border border-border bg-background px-3"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full h-10 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
        >
          Signup
        </button>
      </div>
    </form>
  );
};
