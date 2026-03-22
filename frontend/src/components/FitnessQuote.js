import { useState, useEffect } from 'react'

const quotes = [
    { text: "The only bad workout is the one that didn't happen.", author: "Unknown" },
    { text: "Fitness is not about being better than someone else. It's about being better than you were yesterday.", author: "Khloe Kardashian" },
    { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
    { text: "The hard part isn't getting your body in shape. The hard part is getting your mind in shape.", author: "Unknown" },
    { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
    { text: "Your health is an investment, not an expense.", author: "Unknown" },
    { text: "Success starts with self-discipline.", author: "Unknown" },
    { text: "Strength does not come from physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi" },
    { text: "Don't stop when you're tired. Stop when you're done.", author: "David Goggins" },
    { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" }
]

const FitnessQuote = () => {
    const [quote, setQuote] = useState({ text: "", author: "" })

    useEffect(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
        setQuote(randomQuote)
    }, [])

    return (
        <div className="fitness-quote">
            <div className="quote-content">
                <span className="material-symbols-outlined quote-icon">format_quote</span>
                <p className="quote-text">{quote.text}</p>
                <p className="quote-author">— {quote.author}</p>
            </div>
        </div>
    )
}

export default FitnessQuote
