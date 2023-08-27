import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

export function useWorkoutContext() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside a WorkoutsContextProvider"
    );
  }
  return context;
}
