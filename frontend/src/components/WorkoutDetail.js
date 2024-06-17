import React from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext';

function WorkoutDetail({workout}) {
  const {dispatch}=useWorkoutsContext()
  const {user}=useAuthContext()
  const handleclick = async ()=>{
        if(!user){
          return
        }
        const response = await fetch(`${process.env.REACT_APP_LINKED}/api/workouts/`+ workout._id, {
          method:'DELETE',
          headers:{
            'Authorization':`Bearer ${user.token}`
          }
        })
        const json = await response.json()
        if(response.ok){
          dispatch({type:'DELETE_WORKOUT', payload:json})
        }
  }
  return (
    <div className='workout-details'>
        <h4>{workout.title}</h4>
        <p><strong>Load (kg):</strong> {workout.load}</p>
        <p><strong>Reps :</strong> {workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true})}</p>
        <span className="material-symbols-outlined" onClick={handleclick}>delete</span>
    </div>
  )
}

export default WorkoutDetail;