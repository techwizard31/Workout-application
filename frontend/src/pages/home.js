import React, { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import WorkoutDetail from "../components/WorkoutDetail";
import Workoutform from "../components/Workoutform";
import { useAuthContext } from "../hooks/useAuthContext";

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${process.env.LINK}/api/workouts`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]); // Include user in the dependency array

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetail key={workout._id} workout={workout} />
          ))}
      </div>
      <Workoutform />
    </div>
  );
}

export default Home;
