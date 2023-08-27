import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkoutContext";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchWorkouts } = useWorkoutContext();

  const logout = async () => {
    setError(null);
    const response = await fetch("/api/user/logout");
    //const json = await response.json();

    if (response.ok) {
      //localStorage.removeItem("user");
      dispatch({ type: "LOGOUT", payload: null });
      dispatchWorkouts({ type: "GET_WORKOUT", payload: null });
    }
  };

  return { logout, error };
};
