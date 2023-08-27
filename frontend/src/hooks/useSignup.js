import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setLoading(false);
    setError(null);
    const response = await fetch("/api/user/signup", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setLoading(true);
      setError(json.error);
    }
    if (response.ok) {
      //localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "SIGN_USER", payload: json });
      setLoading(false);
    }
  };

  return { signup, error, isLoading };
};
