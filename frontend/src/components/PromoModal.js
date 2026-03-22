import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const PromoModal = ({ ad, onClose }) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const [isAdding, setIsAdding] = useState(false)
    const [message, setMessage] = useState('')

    if (!ad) return null

    const handleAddToSchedule = async () => {
        if (!user) {
            setMessage('Please login to add to schedule')
            return
        }

        setIsAdding(true)
        const workout = {
            title: ad.title,
            load: 0,
            reps: 0
        }

        try {
            const response = await fetch('/api/workouts', {
                method: 'POST',
                body: JSON.stringify(workout),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'CREATE_WORKOUT', payload: json })
                setMessage('Added to schedule!')
                setTimeout(() => {
                    onClose()
                }, 1500)
            } else {
                setMessage(json.error || 'Failed to add to schedule')
            }
        } catch (err) {
            setMessage('Error connecting to server')
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <div className="workout-modal-overlay" onClick={onClose}>
            <div className="workout-modal-content glass" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <span className="material-symbols-outlined">close</span>
                </button>

                <div className="modal-header">
                    <div className="modal-icon-wrap" style={{ background: 'rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
                        <img src={ad.image} alt={ad.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                        <h2>{ad.title}</h2>
                        <span className="badge" style={{ color: '#ffcc00', borderColor: 'rgba(255, 204, 0, 0.3)' }}>{ad.tag}</span>
                    </div>
                </div>

                <div className="modal-body">
                    <section className="modal-description">
                        <h3>Overview</h3>
                        <p>{ad.longDescription || ad.description}</p>
                    </section>

                    {ad.features && (
                        <section className="modal-exercises">
                            <h3>Key Features</h3>
                            <div className="exercises-list">
                                {ad.features.map((feature, index) => (
                                    <div key={index} className="exercise-item">
                                        <div className="ex-info">
                                            <span className="ex-number">{index + 1}</span>
                                            <span className="ex-name">{feature}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {message && <p className={`modal-message ${message.includes('Added') ? 'success' : 'error'}`}>{message}</p>}
                </div>

                <div className="modal-footer">
                    <button 
                        className="modal-action-btn" 
                        onClick={handleAddToSchedule}
                        disabled={isAdding}
                        style={{ marginRight: '10px', background: 'linear-gradient(135deg, #10b981, #059669)' }}
                    >
                        {isAdding ? 'Adding...' : 'Add to Schedule'}
                    </button>
                    <button className="modal-action-btn" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default PromoModal
