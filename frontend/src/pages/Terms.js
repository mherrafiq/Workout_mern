import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaGavel, FaRegCheckCircle, FaExclamationTriangle, FaBan } from 'react-icons/fa'

const Terms = () => {
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
                <h1>Terms & Conditions</h1>
                <p>Last updated: March 2026</p>
            </div>

            <div className="legal-card glass">
                <section className="legal-section">
                    <div className="section-icon">
                        <FaGavel />
                    </div>
                    <div className="section-content">
                        <h2>1. Acceptance of Terms</h2>
                        <p>By accessing or using Workout Buddy, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, please do not use the application.</p>
                    </div>
                </section>

                <section className="legal-section">
                    <div className="section-icon">
                        <FaRegCheckCircle />
                    </div>
                    <div className="section-content">
                        <h2>2. User Accounts</h2>
                        <p>When you create an account, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account and for keeping your password secure.</p>
                    </div>
                </section>

                <section className="legal-section">
                    <div className="section-icon">
                        <FaBan />
                    </div>
                    <div className="section-content">
                        <h2>3. Prohibited Conduct</h2>
                        <p>You agree not to use Workout Buddy for any illegal purposes or to conduct any activity that would violate the rights of others. This includes attempting to hack into our servers or interfering with other users' data.</p>
                    </div>
                </section>

                <section className="legal-section">
                    <div className="section-icon">
                        <FaExclamationTriangle />
                    </div>
                    <div className="section-content">
                        <h2>4. Limitation of Liability</h2>
                        <p>Workout Buddy is provided "as is" without any warranties. We are not liable for any injuries or health issues that may occur as a result of using the workout tracking features. Always consult with a professional before starting a new fitness regimen.</p>
                    </div>
                </section>

                <section className="legal-section">
                    <div className="section-content">
                        <h2>5. Changes to Terms</h2>
                        <p>We reserve the right to modify these terms at any time. We will provide notice of significant changes by updating the "Last updated" date at the top of this page.</p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Terms
