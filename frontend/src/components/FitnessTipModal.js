import React from 'react'

const FitnessTipModal = ({ tip, onClose }) => {
    if (!tip) return null

    return (
        <div className="workout-modal-overlay" onClick={onClose}>
            <div className="workout-modal-content glass" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <span className="material-symbols-outlined">close</span>
                </button>

                <div className="modal-header">
                    <div className="modal-icon-wrap" style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8' }}>
                        <span className="material-symbols-outlined">{tip.icon}</span>
                    </div>
                    <div>
                        <h2>{tip.title}</h2>
                        <span className="badge" style={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>Fitness Article</span>
                    </div>
                </div>

                <div className="modal-body">
                    <article className="article-content">
                        <p className="article-lead">{tip.snippet}</p>
                        <div className="article-divider"></div>
                        <p className="article-text">{tip.content}</p>
                    </article>
                </div>

                <div className="modal-footer">
                    <button className="modal-action-btn" style={{ background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)' }} onClick={onClose}>
                        Close Article
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FitnessTipModal
