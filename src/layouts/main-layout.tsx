
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

interface MainLayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export function MainLayout({ children, requireAuth = true }: MainLayoutProps) {
  // Simple auth check - in a real app this would use context or a hook
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  
  // If authentication is required but user is not authenticated, redirect to login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col lg:pl-64">
        <Header />
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
