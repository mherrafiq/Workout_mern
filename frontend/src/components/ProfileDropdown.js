import { useState, useRef, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const ProfileDropdown = () => {
    const { user, dispatch } = useAuthContext()
    const { logout } = useLogout()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const dropdownRef = useRef(null)
    const fileInputRef = useRef(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            setError('Please select an image file')
            return
        }

        setIsLoading(true)
        setError(null)

        const formData = new FormData()
        formData.append('image', file)

        try {
            const response = await fetch('/api/user/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
                body: formData
            })

            if (response.status === 401) {
                logout()
                return
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server error: Backend might be down or not responding correctly. Please restart the backend server.");
            }

            const json = await response.json()

            if (!response.ok) {
                throw new Error(json.error)
            }

            // Update user state
            const updatedUser = { ...user, profilePicture: json.profilePicture }
            localStorage.setItem('user', JSON.stringify(updatedUser))
            dispatch({ type: 'LOGIN', payload: updatedUser })
            
            setIsOpen(false)
            alert('Profile picture updated!')
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete your profile picture?')) return

        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/user/profile', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            if (response.status === 401) {
                logout()
                return
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server route not found. Please restart the backend server to activate the delete feature.");
            }

            const json = await response.json()

            if (!response.ok) {
                throw new Error(json.error)
            }

            // Update user state
            const updatedUser = { ...user, profilePicture: '' }
            localStorage.setItem('user', JSON.stringify(updatedUser))
            dispatch({ type: 'LOGIN', payload: updatedUser })
            
            setIsOpen(false)
            alert('Profile picture deleted!')
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="profile-dropdown-container" ref={dropdownRef}>
            <div className="navbar-avatar-display" onClick={toggleDropdown}>
                {user.profilePicture ? (
                    <div className="navbar-avatar-wrapper">
                        <img src={`/uploads/${user.profilePicture}`} alt="Avatar" className="user-avatar-img" />
                    </div>
                ) : (
                    <span className="material-symbols-outlined user-icon">account_circle</span>
                )}
            </div>

            {isOpen && (
                <div className="profile-dropdown-menu">
                    <div className="dropdown-header">
                        <span className="user-name">{user.firstName} {user.lastName}</span>
                        <span className="user-email">{user.email}</span>
                    </div>
                    
                    <div className="dropdown-divider"></div>

                    <button className="dropdown-item" onClick={() => fileInputRef.current.click()} disabled={isLoading}>
                        <span className="material-symbols-outlined">upload</span>
                        Change Photo
                    </button>

                    {user.profilePicture && (
                        <button className="dropdown-item delete-item" onClick={handleDelete} disabled={isLoading}>
                            <span className="material-symbols-outlined">delete</span>
                            Delete Photo
                        </button>
                    )}

                    {error && <div className="dropdown-error">{error}</div>}

                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                    />
                </div>
            )}
        </div>
    )
}

export default ProfileDropdown
