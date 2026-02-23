import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const WorkoutDetails = ({ workout }) => {
     const { dispatch } = useWorkoutsContext()

     const handleClick = async () => {
          const response = await fetch('/api/workouts/' + workout._id, {
               method: 'DELETE'
          })
          const json = await response.json()

          if (response.ok) {
               dispatch({ type: 'DELETE_WORKOUT', payload: json })
          }
     }

     return (
          <div className="workout-details">
               <h4>{workout.title}</h4>
               <div className="details-grid">
                    <p><strong>Load:</strong> {workout.load} kg</p>
                    <p><strong>Reps:</strong> {workout.reps}</p>
               </div>
               <p className="date">{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
               <span className="material-symbols-outlined" onClick={handleClick} title="Delete Workout">
                    delete
               </span>
          </div>
     )
}

export default WorkoutDetails