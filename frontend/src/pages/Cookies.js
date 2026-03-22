import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaCookie, FaInfoCircle } from 'react-icons/fa'

const Cookies = () => {
    const [preferences, setPreferences] = useState({
        essential: true,
        analytics: true,
        marketing: false
    })

    // Load preferences from localStorage on mount
    useEffect(() => {
        window.scrollTo(0, 0)
        const saved = localStorage.getItem('cookiePreferences')
        if (saved) {
            setPreferences(JSON.parse(saved))
        }
    }, [])

    const handleToggle = (type) => {
        if (type === 'essential') return // Essential is always on
        setPreferences(prev => ({
            ...prev,
            [type]: !prev[type]
        }))
    }

    const handleSave = () => {
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
        alert('Your cookie preferences have been updated!')
    }

    return (
        <div className="legal-page container">
            <div className="legal-header">
                <Link to="/" className="back-link">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to Home
                </Link>
                <h1>Manage Cookies</h1>
                <p>Customize your privacy and data preferences below.</p>
            </div>

            <div className="legal-card glass">
                <section className="legal-section">
                    <div className="section-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                        <FaCookie />
                    </div>
                    <div className="section-content">
                        <h2>Cookie Preferences</h2>
                        <p>We use cookies to enhance your experience, analyze site traffic, and for promotional purposes. You can control these settings at any time.</p>
                    </div>
                </section>

                <div className="cookie-sections-wrapper" style={{ marginTop: '2rem' }}>
                    <div className="cookie-item">
                        <div className="cookie-info">
                            <h3>Essential Cookies</h3>
                            <p>Required for secure login and account management. These cannot be disabled for security reasons.</p>
                        </div>
                        <label className="switch">
                            <input type="checkbox" checked={preferences.essential} disabled />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    <div className="cookie-item">
                        <div className="cookie-info">
                            <h3>Analytics Cookies</h3>
                            <p>Help us identify how users navigate the app to improve performance and usability.</p>
                        </div>
                        <label className="switch">
                            <input 
                                type="checkbox" 
                                checked={preferences.analytics} 
                                onChange={() => handleToggle('analytics')} 
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    <div className="cookie-item">
                        <div className="cookie-info">
                            <h3>Marketing Cookies</h3>
                            <p>Allow us to track the effectiveness of our promotions and provide relevant content.</p>
                        </div>
                        <label className="switch">
                            <input 
                                type="checkbox" 
                                checked={preferences.marketing} 
                                onChange={() => handleToggle('marketing')} 
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>

                <div className="legal-section" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
                    <div className="section-icon">
                        <FaInfoCircle />
                    </div>
                    <div className="section-content">
                        <h2>Why we use cookies?</h2>
                        <p>Cookies are small data files stored on your device that help us recognize you on subsequent visits. For more information, please read our <Link to="/privacy" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Privacy Policy</Link>.</p>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <button 
                        className="modal-action-btn" 
                        onClick={handleSave}
                        style={{ padding: '1rem 3rem', borderRadius: '3rem' }}
                    >
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cookies
