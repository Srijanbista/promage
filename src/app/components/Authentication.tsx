"use client";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Check if we're running in the browser
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("user:token");

          if (token) {
            const response = await fetch("/api/verify-token", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token }),
            });

            if (response.ok) {
              setIsAuthenticated(true);
              router.push("/");
            } else {
              setIsAuthenticated(false);
              if (pathname !== "/login") {
                router.push("/login");
              }
            }
          } else {
            setIsAuthenticated(false);
            if (pathname !== "/login") {
              router.push("/login");
            }
          }
        }
      } catch (error) {
        console.error("Error verifying token:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    checkAuthentication();
  }, [pathname, router]);

  if (!isLoaded) {
    return <h1 className="animate-bounce text-center">Loading...</h1>;
  }

  if (!isAuthenticated && pathname !== "/login") {
    return null; // Prevent rendering while redirecting
  }

  return <>{children}</>;
};

export default AuthenticationProvider;
