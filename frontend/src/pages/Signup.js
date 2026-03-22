import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [fitnessGoal, setFitnessGoal] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const success = await signup(firstName, lastName, age, fitnessGoal, email, password)

        if (success) {
            navigate('/login')
        }
    }

    return (
        <div className="auth-form-container">
            <form className="signup" onSubmit={handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-row">
                    <div>
                        <label>First Name:</label>
                        <input
                            type="text"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div>
                        <label>Age:</label>
                        <input
                            type="number"
                            onChange={(e) => setAge(e.target.value)}
                            value={age}
                        />
                    </div>
                    <div>
                        <label>Fitness Goal:</label>
                        <select
                            onChange={(e) => setFitnessGoal(e.target.value)}
                            value={fitnessGoal}
                        >
                            <option value="">Select a Goal</option>
                            <option value="Weight Loss">Weight Loss</option>
                            <option value="Muscle Gain">Muscle Gain</option>
                            <option value="Endurance">Endurance</option>
                            <option value="Flexibility">Flexibility</option>
                        </select>
                    </div>
                </div>

                <label>Email address:</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label>Password:</label>
                <div className="password-input-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <span className="material-symbols-outlined">
                            {showPassword ? "visibility" : "visibility_off"}
                        </span>
                    </button>
                </div>

                <button disabled={isLoading}>Sign up</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Signup
