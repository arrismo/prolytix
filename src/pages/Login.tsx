
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/auth/login-form";

const Login = () => {
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  
  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="flex flex-col items-center mb-8">
        <div className="h-12 w-12 rounded-full bg-prolytix-purple mb-4" />
        <h1 className="text-3xl font-bold">Prolytix</h1>
        <p className="text-muted-foreground">Healthcare Analytics Platform</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
