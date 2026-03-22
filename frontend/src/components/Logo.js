import React from 'react';

const Logo = () => {
    return (
        <svg
            width="50"
            height="50"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotating-svg-logo"
        >
            <defs>
                <linearGradient id="metallic" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="50%" stopColor="#f8fafc" />
                    <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
            </defs>

            {/* Dumbbell 1 (Diagonal \) */}
            <g transform="rotate(45 50 50)">
                <rect x="20" y="47" width="60" height="6" rx="3" fill="url(#metallic)" />
                <rect x="15" y="35" width="8" height="30" rx="2" fill="url(#metallic)" />
                <rect x="5" y="38" width="8" height="24" rx="2" fill="url(#metallic)" />
                <rect x="77" y="35" width="8" height="30" rx="2" fill="url(#metallic)" />
                <rect x="87" y="38" width="8" height="24" rx="2" fill="url(#metallic)" />
            </g>

            {/* Dumbbell 2 (Diagonal /) */}
            <g transform="rotate(-45 50 50)">
                <rect x="20" y="47" width="60" height="6" rx="3" fill="url(#metallic)" />
                <rect x="15" y="35" width="8" height="30" rx="2" fill="url(#metallic)" />
                <rect x="5" y="38" width="8" height="24" rx="2" fill="url(#metallic)" />
                <rect x="77" y="35" width="8" height="30" rx="2" fill="url(#metallic)" />
                <rect x="87" y="38" width="8" height="24" rx="2" fill="url(#metallic)" />
            </g>
        </svg>
    );
};

export default Logo;
