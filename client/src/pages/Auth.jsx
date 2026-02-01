import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LoginForm } from "../components/common/LoginForm";
import { SignupForm } from "../components/common/SignupForm";

export const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const modeParam = searchParams.get("mode") || "login";
  const [mode, setMode] = useState(modeParam);

  return (
    <div className="flex flex-col my-6 items-center justify-center bg-background px-4">
      <div className="w-full max-w-md border border-border/50 rounded-xl p-6 bg-card space-y-6">
        <div className="flex items-center justify-center px-0">
          <div className="relative w-full flex rounded-full bg-muted py-1">
            <div
              className={`absolute top-1 h-[calc(100%-0.5rem)] w-1/2 rounded-full bg-background shadow transition-transform duration-300 ${
                mode === "signup" ? "translate-x-full" : "translate-x-0"
              }`}
            />

            <button
              onClick={() => setMode("login")}
              className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors ${
                mode === "login" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setMode("signup")}
              className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors ${
                mode === "signup" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Sign up
            </button>
          </div>
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">
            {mode === "login" ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {mode === "login"
              ? "Sign in to manage your feedback"
              : "Get your anonymous feedback link"}
          </p>
        </div>

        {mode === "login" ? <LoginForm /> : <SignupForm />}

        <div className="text-center text-sm">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-primary hover:underline font-medium"
              >
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
