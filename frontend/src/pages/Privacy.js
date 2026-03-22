import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaShieldAlt, FaLock, FaUserSecret, FaCookieBite } from 'react-icons/fa'

const Privacy = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="legal-page container">
            <div className="legal-header">
                <Link to="/" className="back-link">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to Home
                </Link>
                <h1>Privacy Policy</h1>
                <p>Last updated: March 2026</p>
            </div>

            <div className="legal-card glass">
                <section className="legal-section">
                    <div className="section-icon">
                        <FaShieldAlt />
                    </div>
                    <div className="section-content">
                        <h2>1. Introduction</h2>
                        <p>Welcome to Workout Buddy. Your privacy is critically important to us. This Privacy Policy explain how we collect, use, and protect your personal information when you use our MERN-stack workout tracking application.</p>
                    </div>
                </section>

                <section className="legal-section">
                    <div className="section-icon">
                        <FaUserSecret />
                    </div>
                    <div className="section-content">
                        <h2>2. Information We Collect</h2>
                        <p>We specifically collect:</p>
                        <ul>
                            <li><strong>Account Data:</strong> Name, email address, and encrypted password during signup.</li>
                            <li><strong>Workout Data:</strong> Titles, reps, and load details you log in the app.</li>
                            <li><strong>Profile Info:</strong> Age, fitness goals, and profile pictures you choose to upload.</li>
                        </ul>
                    </div>
                </section>

                <section className="legal-section">
                    <div className="section-icon">
                        <FaLock />
                    </div>
                    <div className="section-content">
                        <h2>3. How We Use Your Information</h2>
                        <p>We use your data solely to provide and improve the services of Workout Buddy. This includes:</p>
                        <ul>
                            <li>Personalizing your dashboard and tracking your progress over time.</li>
                            <li>Ensuring the security of your account through JWT authentication.</li>
                            <li>Providing analytics and charts based on your workout history.</li>
                        </ul>
                        <p><strong>We never sell your data to third parties.</strong></p>
                    </div>
                </section>

                <section className="legal-section">
                    <div className="section-icon">
                        <FaCookieBite />
                    </div>
                    <div className="section-content">
                        <h2>4. Cookies & Security</h2>
                        <p>We use essential cookies strictly for session management. These cookies allow you to remain logged in as you navigate the app. No tracking or advertising cookies are implemented.</p>
                        <p>Our backend uses industry-standard security measures, including bcrypt for password hashing and MongoDB for secure data persistence.</p>
                    </div>
                </section>

                <section className="legal-section">
                    <div className="section-content">
                        <h2>5. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                        <p className="contact-email">support@workoutbuddy.mern</p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Privacy
