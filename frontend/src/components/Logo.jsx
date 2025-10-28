import React from 'react';

const Logo = ({ className = 'h-10 w-auto' }) => {
  return (
    <div className="flex items-center space-x-2">
      <svg className={className} viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="30"
          fontFamily="Poppins, sans-serif"
          fontSize="32"
          fontWeight="bold"
          fill="url(#logoGradient)"
        >
          MindMile
        </text>
      </svg>
    </div>
  );
};

export default Logo;
