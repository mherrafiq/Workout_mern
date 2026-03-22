import React from 'react'

const WorkoutPlanModal = ({ plan, onClose }) => {
    if (!plan) return null

    return (
        <div className="workout-modal-overlay" onClick={onClose}>
            <div className="workout-modal-content glass" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <span className="material-symbols-outlined">close</span>
                </button>

                <div className="modal-header">
                    <div className="modal-icon-wrap">
                        <span className="material-symbols-outlined">{plan.icon}</span>
                    </div>
                    <div>
                        <h2>{plan.title}</h2>
                        <div className="modal-badges">
                            <span className="badge level">{plan.level}</span>
                            <span className="badge time">{plan.time}</span>
                            <span className="badge focus">{plan.focus}</span>
                        </div>
                    </div>
                </div>

                <div className="modal-body">
                    <section className="modal-description">
                        <h3>About this plan</h3>
                        <p>{plan.description}</p>
                    </section>

                    <section className="modal-exercises">
                        <h3>Exercises</h3>
                        <div className="exercises-list">
                            {plan.exercises.map((ex, index) => (
                                <div key={index} className="exercise-item">
                                    <div className="ex-info">
                                        <span className="ex-number">{index + 1}</span>
                                        <span className="ex-name">{ex.name}</span>
                                    </div>
                                    <div className="ex-stats">
                                        <span className="ex-sets"><strong>{ex.sets}</strong> sets</span>
                                        <span className="ex-reps"><strong>{ex.reps}</strong> reps</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="modal-footer">
                    <button className="modal-action-btn" onClick={onClose}>Done</button>
                </div>
            </div>
        </div>
    )
}

export default WorkoutPlanModal
