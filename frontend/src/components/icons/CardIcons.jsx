import React from 'react';

export const PlayIcon = () => (
    <div className="h-16 w-16 rounded-full bg-white bg-opacity-30 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer hover:bg-opacity-50 transition-all">
        <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4.018 15.592A1.875 1.875 0 012.125 14V6A1.875 1.875 0 014.018 4.408l8.102 4.051a1.875 1.875 0 010 3.132l-8.102 4.051z"></path></svg>
    </div>
);

export const ArticleIcon = () => (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);

export const BriefcaseIcon = () => (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.182 0-6.134-.59-8.67-1.605a23.934 23.934 0 01-1.13-1.605-2.062 2.062 0 01-.412-1.353V6.255a2.062 2.062 0 01.412-1.353m17.5 8.106a2.062 2.062 0 00.412-1.353V6.255a2.062 2.062 0 00-.412-1.353m-17.5 0a2.062 2.062 0 01.412-1.353M12 21c3.182 0 6.134-.59 8.67-1.605M12 21c-3.182 0-6.134-.59-8.67-1.605m17.34-16.14a2.062 2.062 0 00-.412-1.353m-1.13 1.605c-1.131.39-2.314.698-3.535.925M5.67 5.055A23.931 23.931 0 0112 3c3.182 0 6.134.59 8.67 1.605" />
    </svg>
);

export const LocationIcon = () => (
     <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
