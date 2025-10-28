import React from 'react';

const iconProps = {
    className: "h-6 w-6",
    strokeWidth: 1.5,
    fill: "none",
    stroke: "currentColor"
};

export const HomeIcon = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

export const NetworkIcon = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

export const JobsIcon = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.182 0-6.134-.59-8.67-1.605a23.934 23.934 0 01-1.13-1.605-2.062 2.062 0 01-.412-1.353V6.255a2.062 2.062 0 01.412-1.353m17.5 8.106a2.062 2.062 0 00.412-1.353V6.255a2.062 2.062 0 00-.412-1.353m-17.5 0a2.062 2.062 0 01.412-1.353M12 21c3.182 0 6.134-.59 8.67-1.605M12 21c-3.182 0-6.134-.59-8.67-1.605m17.34-16.14a2.062 2.062 0 00-.412-1.353m-1.13 1.605c-1.131.39-2.314.698-3.535.925M5.67 5.055A23.931 23.931 0 0112 3c3.182 0 6.134.59 8.67 1.605" />
    </svg>
);

export const RoadmapIcon = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
    </svg>
);

export const MessageIcon = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

export const NotificationIcon = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);
