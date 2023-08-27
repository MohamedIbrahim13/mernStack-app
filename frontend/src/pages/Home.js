import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Home() {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      //console.log("json", json);
      if (response.ok) {
        dispatch({ type: "GET_WORKOUT", payload: json });
      }
    };

    if (user) {
      fetchData();
    }
  }, [dispatch, user]);

  console.log(workouts);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map(workout => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}
