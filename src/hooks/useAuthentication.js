import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function useAuthentication() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      // Set the Authorization header when the user is logged in
      localStorage.setItem("token", "isLoggedIn:true");
    } else {
      // Remove the Authorization header when the user logs out
      localStorage.removeItem("token");
    }
  }, [isLoggedIn]);

  const login = (password) => {
    if (password === "abc123") {
      setIsLoggedIn(true);
      router.push("/dashboard");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
}
