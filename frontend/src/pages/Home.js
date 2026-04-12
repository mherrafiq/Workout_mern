import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from "../hooks/useLogout"

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from "../components/WorkoutForm"
import WorkoutCharts from "../components/WorkoutCharts"


const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const [searchTerm, setSearchTerm] = useState('')
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
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
                dispatch({ type: 'SET_WORKOUTS', payload: json })

            }
        }

        if (user) {
            fetchWorkouts()
        }
    }, [dispatch, user, logout])

    // filter workouts based on search term
    const filteredWorkouts = workouts ? workouts.filter(workout =>
        workout.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) : null

    return (
        <div className="Home">
            <WorkoutCharts workouts={workouts} />
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search workouts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="workouts">
                {filteredWorkouts && filteredWorkouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />

                ))}
                {filteredWorkouts && filteredWorkouts.length === 0 && (
                    <p className="no-results">No workouts found matching "{searchTerm}"</p>
                )}

            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home
