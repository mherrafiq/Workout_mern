import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from "../hooks/useLogout"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const WorkoutDetails = ({ workout }) => {
     const { dispatch } = useWorkoutsContext()
     const { user } = useAuthContext()
     const { logout } = useLogout()

     const [isEditing, setIsEditing] = useState(false)
     const [editTitle, setEditTitle] = useState(workout.title)
     const [editLoad, setEditLoad] = useState(workout.load)
     const [editReps, setEditReps] = useState(workout.reps)
     const [error, setError] = useState(null)

     const handleClick = async () => {
          if (!user) {
               return
          }

          const response = await fetch('/api/workouts/' + workout._id, {
               method: 'DELETE',
               headers: {
                    'Authorization': `Bearer ${user.token}`
               }
          })
          const json = await response.json()

          if (response.status === 401) {
               logout()
               return
          }

          if (response.ok) {
               dispatch({ type: 'DELETE_WORKOUT', payload: json })
          }
     }

     const handleEdit = () => {
          setIsEditing(true)
     }

     const handleCancel = () => {
          setIsEditing(false)
          setEditTitle(workout.title)
          setEditLoad(workout.load)
          setEditReps(workout.reps)
          setError(null)
     }

     const handleUpdate = async (e) => {
          e.preventDefault()

          if (!user) {
               setError('You must be logged in')
               return
          }

          const updatedWorkout = { title: editTitle, load: editLoad, reps: editReps }

          const response = await fetch('/api/workouts/' + workout._id, {
               method: 'PATCH',
               body: JSON.stringify(updatedWorkout),
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
               }
          })

          const json = await response.json()

          if (response.status === 401) {
               logout()
               return
          }

          if (!response.ok) {
               setError(json.error)
          }
          if (response.ok) {
               setIsEditing(false)
               setError(null)
               dispatch({ type: 'UPDATE_WORKOUT', payload: json })
          }
     }

     return (
          <div className="workout-details">
               {!isEditing ? (
                    <>
                         <h4>{workout.title}</h4>
                         <div className="details-grid">
                              <p><strong>Load:</strong> {workout.load} kg</p>
                              <p><strong>Reps:</strong> {workout.reps}</p>
                         </div>
                         <p className="date">{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
                         <span className="material-symbols-outlined edit-icon" onClick={handleEdit} title="Edit Workout">
                              edit
                         </span>
                         <span className="material-symbols-outlined" onClick={handleClick} title="Delete Workout">
                              delete
                         </span>
                    </>
               ) : (
                    <form className="edit-form" onSubmit={handleUpdate}>
                         <h3>Edit Workout</h3>
                         {error && <div className="error">{error}</div>}

                         <label>Exercise Title:</label>
                         <input
                              type="text"
                              onChange={(e) => setEditTitle(e.target.value)}
                              value={editTitle}
                         />

                         <label>Load (in kg):</label>
                         <input
                              type="number"
                              onChange={(e) => setEditLoad(e.target.value)}
                              value={editLoad}
                         />

                         <label>Reps:</label>
                         <input
                              type="number"
                              onChange={(e) => setEditReps(e.target.value)}
                              value={editReps}
                         />

                         <div className="form-buttons">
                              <button type="submit">Update</button>
                              <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                         </div>
                    </form>
               )}
          </div>
     )
}

export default WorkoutDetails