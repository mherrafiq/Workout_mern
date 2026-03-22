import React, { useState } from 'react'
import gearImg from '../assets/promotions/workout_gear.png'
import trainingImg from '../assets/promotions/personal_training.png'
import lifestyleImg from '../assets/promotions/fitness_lifestyle.png'
import FitnessQuote from '../components/FitnessQuote'
import WorkoutPlanModal from '../components/WorkoutPlanModal'
import FitnessTipModal from '../components/FitnessTipModal'
import PromoModal from '../components/PromoModal'

const Promotions = () => {
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [selectedTip, setSelectedTip] = useState(null)
    const [selectedAd, setSelectedAd] = useState(null)
    const ads = [
        {
            id: 1,
            title: "Pro Gear Essentials",
            description: "Elevate your training with our premium workout equipment. Designed for durability and performance.",
            longDescription: "Elevate your training with our premium workout equipment. Designed for durability and performance, our gear ensures you get the most out of every session.",
            image: gearImg,
            tag: "NEW ARRIVAL",
            features: [
                "High-grade stainless steel dumbbells",
                "Non-slip, eco-friendly yoga mats",
                "Heavy-duty resistance bands (set of 5)",
                "Breathable, moisture-wicking apparel"
            ]
        },
        {
            id: 2,
            title: "Expert Personal Training",
            description: "Get personalized workout plans and 1-on-1 coaching from world-class fitness experts.",
            longDescription: "Get personalized workout plans and 1-on-1 coaching from world-class fitness experts. Our certified trainers work with you to create a sustainable path to your goals.",
            image: trainingImg,
            tag: "LIMITED OFFER",
            features: [
                "Customized workout plans",
                "Tailored nutrition & meal guides",
                "Weekly progress tracking",
                "24/7 access to your trainer"
            ]
        },
        {
            id: 3,
            title: "Fitness Lifestyle",
            description: "Join a community of thousands achieving their goals. Start your journey today.",
            longDescription: "Join a community of thousands achieving their goals. Fitness is a journey, and we're here to provide the support, motivation, and resources you need to stay on track.",
            image: lifestyleImg,
            tag: "FEATURED",
            features: [
                "Exclusive mental health workshops",
                "Bi-weekly community fitness events",
                "Member-only productivity tips",
                "Access to a global support network"
            ]
        }
    ]

    const suggestedWorkouts = [
        {
            id: 1,
            title: "Beginner Full Body",
            level: "Beginner",
            time: "45 Min",
            focus: "Overall Fitness",
            icon: "fitness_center",
            description: "A comprehensive routine designed for newcomers to build a solid foundation of strength and endurance.",
            exercises: [
                { name: "Global Squats", sets: 3, reps: "12-15" },
                { name: "Push Ups (or Incline)", sets: 3, reps: "10-12" },
                { name: "Dumbbell Rows", sets: 3, reps: "12" },
                { name: "Plank", sets: 3, reps: "45 sec" },
                { name: "Glute Bridges", sets: 3, reps: "15" }
            ]
        },
        {
            id: 2,
            title: "15-Min Intense HIIT",
            level: "Advanced",
            time: "15 Min",
            focus: "Fat Burn",
            icon: "local_fire_department",
            description: "High-Intensity Interval Training to maximize calorie burn and improve cardiovascular health in a short time.",
            exercises: [
                { name: "Burpees", sets: 4, reps: "45 sec work / 15 sec rest" },
                { name: "Mountain Climbers", sets: 4, reps: "45 sec work / 15 sec rest" },
                { name: "Jump Squats", sets: 4, reps: "45 sec work / 15 sec rest" },
                { name: "High Knees", sets: 4, reps: "45 sec work / 15 sec rest" }
            ]
        },
        {
            id: 3,
            title: "Advanced Push Day",
            level: "Intermediate",
            time: "60 Min",
            focus: "Muscle Gain",
            icon: "sports_gymnastics",
            description: "Focus on pushing movements to develop strength in the chest, shoulders, and triceps.",
            exercises: [
                { name: "Bench Press", sets: 4, reps: "8-10" },
                { name: "Overhead Press", sets: 3, reps: "10" },
                { name: "Incline DB Flys", sets: 3, reps: "12" },
                { name: "Tricep Pushdowns", sets: 4, reps: "12-15" },
                { name: "Lateral Raises", sets: 3, reps: "15" }
            ]
        }
    ]

    const fitnessTips = [
        {
            id: 1,
            title: "Post-Workout Nutrition",
            snippet: "What you eat after your workout is crucial. Focus on protein and complex carbs to recover and grow.",
            icon: "restaurant",
            content: "Post-workout nutrition is vital for muscle repair and glycogen replenishment. Aim to consume a meal or snack high in protein (20-30g) and complex carbohydrates within 45-60 minutes after your workout. Good options include a protein shake with a banana, Greek yogurt with berries, or grilled chicken with sweet potatoes."
        },
        {
            id: 2,
            title: "Perfect Your Form",
            snippet: "Lifting heavier isn't always better. Perfect form prevents injuries and ensures maximum muscle engagement.",
            icon: "accessibility_new",
            content: "Quality over quantity is the golden rule of strength training. Proper form ensures that the target muscles are doing the work, which leads to better results and significantly lowers the risk of injury. Don't be afraid to lower the weight to get the movement right. Consider filming your sets or working with a coach to audit your technique."
        },
        {
            id: 3,
            title: "Hydration Basics",
            snippet: "Water is the unsung hero of fitness. Even a 2% drop in hydration can significantly impact your performance.",
            icon: "water_drop",
            content: "Hydration affects everything from joint lubrication to cognitive function. For active individuals, the standard '8 glasses a day' might not be enough. Aim for at least 3-4 liters if you are training intensely. Remember to replenish electrolytes (Sodium, Potassium, Magnesium) if you are sweating excessively, especially during long cardio sessions."
        },
        {
            id: 4,
            title: "Rest & Recovery",
            snippet: "Muscles are torn in the gym, fed in the kitchen, and built in bed. Prioritize your 7-9 hours of sleep.",
            icon: "bedtime",
            content: "Overtraining is a real risk that can stall your progress. Sleep is when your body produces the most growth hormone and repairs tissues. Beyond sleep, consider active recovery days (light walking, stretching) and stress management techniques like meditation to keep your nervous system in check. Listen to your body—sometimes, an extra rest day is exactly what you need to hit a new PR."
        }
    ]

    return (
        <div className="promotions-page">
            <FitnessQuote />
            <header className="promo-hero">
                <h1>Unlock Your Full Potential</h1>
                <p>Discover the best in fitness training, gear, and lifestyle.</p>
            </header>

            <div className="featured-workouts-section">
                <div className="section-header">
                    <h2>Featured Workout Plans</h2>
                    <p>Suggested routines to kickstart your journey</p>
                </div>
                <div className="workouts-grid">
                    {suggestedWorkouts.map(workout => (
                        <div key={workout.id} className="workout-plan-card">
                            <div className="workout-icon-wrapper">
                                <span className="material-symbols-outlined">{workout.icon}</span>
                            </div>
                            <h3>{workout.title}</h3>
                            <div className="workout-details-badges">
                                <span className="badge level">{workout.level}</span>
                                <span className="badge time">{workout.time}</span>
                            </div>
                            <p className="focus">Focus: <strong>{workout.focus}</strong></p>
                            <button className="start-btn" onClick={() => setSelectedPlan(workout)}>View Plan</button>
                        </div>
                    ))}
                </div>
            </div>

            {selectedPlan && (
                <WorkoutPlanModal 
                    plan={selectedPlan} 
                    onClose={() => setSelectedPlan(null)} 
                />
            )}

            <div className="fitness-tips-section">
                <div className="section-header">
                    <h2>Fitness Tips & Articles</h2>
                    <p>Knowledge to fuel your progress</p>
                </div>
                <div className="tips-grid">
                    {fitnessTips.map(tip => (
                        <div key={tip.id} className="tip-card">
                            <div className="tip-icon">
                                <span className="material-symbols-outlined">{tip.icon}</span>
                            </div>
                            <div className="tip-content">
                                <h3>{tip.title}</h3>
                                <p>{tip.snippet}</p>
                                <button className="read-more-btn" onClick={() => setSelectedTip(tip)}>
                                    Read More <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedTip && (
                <FitnessTipModal 
                    tip={selectedTip} 
                    onClose={() => setSelectedTip(null)} 
                />
            )}

            <div className="promo-grid">
                {ads.map(ad => (
                    <div key={ad.id} className="promo-card">
                        <div className="promo-image-wrapper">
                            <span className="promo-tag">{ad.tag}</span>
                            <img src={ad.image} alt={ad.title} />
                        </div>
                        <div className="promo-content">
                            <h3>{ad.title}</h3>
                            <p>{ad.description}</p>
                            <button className="promo-btn" onClick={() => setSelectedAd(ad)}>Learn More</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedAd && (
                <PromoModal 
                    ad={selectedAd} 
                    onClose={() => setSelectedAd(null)} 
                />
            )}

            <div className="community-section">
                {/* Floating decorative orbs */}
                <div className="community-orb community-orb-1"></div>
                <div className="community-orb community-orb-2"></div>
                <div className="community-orb community-orb-3"></div>

                <div className="community-inner">
                    {/* Top badge */}
                    <div className="community-badge">
                        <span className="material-symbols-outlined">groups</span>
                        <span>10,000+ Members Strong</span>
                    </div>

                    {/* Headline */}
                    <h2 className="community-title">
                        Join Our <span className="community-title-highlight">Elite Community</span>
                    </h2>
                    <p className="community-subtitle">
                        Connect with thousands of fitness enthusiasts, get exclusive tips, early access to plans, and daily motivation to crush your goals.
                    </p>

                    {/* Stats row */}
                    <div className="community-stats">
                        <div className="comm-stat">
                            <span className="comm-stat-number">10K+</span>
                            <span className="comm-stat-label">Active Members</span>
                        </div>
                        <div className="comm-stat-divider"></div>
                        <div className="comm-stat">
                            <span className="comm-stat-number">500+</span>
                            <span className="comm-stat-label">Workout Plans</span>
                        </div>
                        <div className="comm-stat-divider"></div>
                        <div className="comm-stat">
                            <span className="comm-stat-number">98%</span>
                            <span className="comm-stat-label">Satisfaction Rate</span>
                        </div>
                        <div className="comm-stat-divider"></div>
                        <div className="comm-stat">
                            <span className="comm-stat-number">24/7</span>
                            <span className="comm-stat-label">Community Support</span>
                        </div>
                    </div>

                    {/* Perks grid */}
                    <div className="community-perks">
                        <div className="community-perk">
                            <div className="perk-icon-wrap">
                                <span className="material-symbols-outlined">bolt</span>
                            </div>
                            <div className="perk-text">
                                <h4>Exclusive Workouts</h4>
                                <p>Members-only plans curated by top coaches</p>
                            </div>
                        </div>
                        <div className="community-perk">
                            <div className="perk-icon-wrap">
                                <span className="material-symbols-outlined">nutrition</span>
                            </div>
                            <div className="perk-text">
                                <h4>Nutrition Guides</h4>
                                <p>Science-backed meal plans for your goals</p>
                            </div>
                        </div>
                        <div className="community-perk">
                            <div className="perk-icon-wrap">
                                <span className="material-symbols-outlined">notifications_active</span>
                            </div>
                            <div className="perk-text">
                                <h4>Daily Motivation</h4>
                                <p>Curated tips & challenges straight to your inbox</p>
                            </div>
                        </div>
                        <div className="community-perk">
                            <div className="perk-icon-wrap">
                                <span className="material-symbols-outlined">local_offer</span>
                            </div>
                            <div className="perk-text">
                                <h4>Member Discounts</h4>
                                <p>Exclusive deals on premium gear and supplements</p>
                            </div>
                        </div>
                    </div>

                    {/* Email form */}
                    <form className="community-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="community-form-row">
                            <div className="community-input-wrapper">
                                <span className="material-symbols-outlined community-input-icon">mail</span>
                                <input type="email" placeholder="Enter your email address" required />
                            </div>
                            <button type="submit" className="community-subscribe-btn">
                                <span>Join Now</span>
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                        <p className="community-form-note">
                            <span className="material-symbols-outlined">lock</span>
                            No spam ever. Unsubscribe anytime. Free forever.
                        </p>
                    </form>

                    {/* Avatar row */}
                    <div className="community-avatars">
                        <div className="avatar-stack">
                            <div className="avatar av1">AK</div>
                            <div className="avatar av2">SR</div>
                            <div className="avatar av3">MJ</div>
                            <div className="avatar av4">PP</div>
                            <div className="avatar av5">+</div>
                        </div>
                        <p className="avatar-label">Join <strong>10,000+</strong> people already transforming their lives</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Promotions
