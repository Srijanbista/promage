"use client";

import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import SideNav from "./SideNav";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const verifyToken = async (token: string) => {
      try {
        const response = await fetch("/api/verify-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        return response.ok;
      } catch (error) {
        console.error("Error verifying token:", error);
        return false;
      }
    };

    const checkAuthentication = async () => {
      if (typeof window === "undefined") {
        setIsLoaded(true);
        return;
      }

      const token = localStorage.getItem("user:token");
      const isAuthenticated = token ? await verifyToken(token) : false;

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        if (pathname === "/login") router.push("/");
      } else {
        if (pathname !== "/login") router.push("/login");
        localStorage.removeItem("user:token");
      }

      setIsLoaded(true);
    };

    checkAuthentication();
  }, [pathname, router]);

  if (!isLoaded) {
    return <h1 className="animate-bounce text-center">Loading...</h1>;
  }

  if (!isAuthenticated && pathname !== "/login") {
    return null;
  }

  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <Toaster />
      <SideNav />
      <div className="grow flex flex-col h-screen">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default AuthenticationProvider;
