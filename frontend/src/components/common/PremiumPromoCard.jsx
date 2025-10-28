import React, { useState, useEffect } from 'react';

// Using inline SVG for icons to avoid external dependencies
const AIMentorIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.59 1.59a.75.75 0 0 0 1.06 1.06l1.59-1.59ZM3 12.75a.75.75 0 0 1-.75-.75v-2.25a.75.75 0 0 1 1.5 0V12a.75.75 0 0 1-.75.75ZM6.166 18.894a.75.75 0 0 0 1.06 1.06l1.59-1.59a.75.75 0 1 0-1.06-1.06l-1.59 1.59ZM12 21.75a.75.75 0 0 1-.75.75H9a.75.75 0 0 1 0-1.5h2.25a.75.75 0 0 1 .75.75ZM15.834 6.166a.75.75 0 0 0-1.06 1.06l1.59 1.59a.75.75 0 0 0 1.06-1.06l-1.59-1.59ZM12 10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM6.166 5.106a.75.75 0 0 0-1.06-1.06l-1.59 1.59a.75.75 0 0 0 1.06 1.06l1.59-1.59ZM15 21.75a.75.75 0 0 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75V21a.75.75 0 0 1 1.5 0v.75Z" />
    </svg>
);

const AdvancedAnalyticsIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.59 1.59a.75.75 0 0 0 1.06 1.06l1.59-1.59ZM3 12.75a.75.75 0 0 1-.75-.75v-2.25a.75.75 0 0 1 1.5 0V12a.75.75 0 0 1-.75.75ZM6.166 18.894a.75.75 0 0 0 1.06 1.06l1.59-1.59a.75.75 0 1 0-1.06-1.06l-1.59 1.59ZM12 21.75a.75.75 0 0 1-.75.75H9a.75.75 0 0 1 0-1.5h2.25a.75.75 0 0 1 .75.75ZM15.834 6.166a.75.75 0 0 0-1.06 1.06l1.59 1.59a.75.75 0 0 0 1.06-1.06l-1.59-1.59ZM12 10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM6.166 5.106a.75.75 0 0 0-1.06-1.06l-1.59 1.59a.75.75 0 0 0 1.06 1.06l1.59-1.59ZM15 21.75a.75.75 0 0 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75V21a.75.75 0 0 1 1.5 0v.75Z" />
    </svg>
);

const ExclusiveContentIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.59 1.59a.75.75 0 0 0 1.06 1.06l1.59-1.59ZM3 12.75a.75.75 0 0 1-.75-.75v-2.25a.75.75 0 0 1 1.5 0V12a.75.75 0 0 1-.75.75ZM6.166 18.894a.75.75 0 0 0 1.06 1.06l1.59-1.59a.75.75 0 1 0-1.06-1.06l-1.59 1.59ZM12 21.75a.75.75 0 0 1-.75.75H9a.75.75 0 0 1 0-1.5h2.25a.75.75 0 0 1 .75.75ZM15.834 6.166a.75.75 0 0 0-1.06 1.06l1.59 1.59a.75.75 0 0 0 1.06-1.06l-1.59-1.59ZM12 10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM6.166 5.106a.75.75 0 0 0-1.06-1.06l-1.59 1.59a.75.75 0 0 0 1.06 1.06l1.59-1.59ZM15 21.75a.75.75 0 0 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75V21a.75.75 0 0 1 1.5 0v.75Z" />
    </svg>
);

const slides = [
    {
        icon: <AIMentorIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
        title: "Unlock Your AI Mentor",
        description: "Get personalized guidance and feedback.",
    },
    {
        icon: <AdvancedAnalyticsIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
        title: "Advanced Analytics",
        description: "See who's viewing your profile and track your progress.",
    },
    {
        icon: <ExclusiveContentIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
        title: "Exclusive Content",
        description: "Access premium courses and workshops.",
    }
];

const PremiumPromoCard = ({ setActivePage }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 4000); // Change slide every 4 seconds

        return () => clearTimeout(timer);
    }, [currentSlide]);
    
    return (
        <div className="card p-4 text-center overflow-hidden">
             <div className="relative h-28">
                {slides.map((slide, index) => (
                    <div 
                        key={index} 
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="flex flex-col items-center justify-center h-full">
                            {slide.icon}
                            <p className="font-bold text-gray-800 dark:text-gray-100 mt-2">{slide.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{slide.description}</p>
                        </div>
                    </div>
                ))}
            </div>
             <div className="flex justify-center space-x-2 my-2">
                {slides.map((_, index) => (
                    <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'}`}></button>
                ))}
            </div>
            <button 
                onClick={() => setActivePage('Premium')} 
                className="btn w-full mt-2 border border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
                Try Premium for Free
            </button>
        </div>
    );
};

export default PremiumPromoCard;
