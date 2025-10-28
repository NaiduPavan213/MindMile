import React from 'react';

// Mock Page enum for a self-contained component
const Page = {
    Home: 'Home',
    Network: 'Network',
    Jobs: 'Jobs',
    Roadmaps: 'Roadmaps',
    Messages: 'Messages',
    Notifications: 'Notifications',
    Profile: 'Profile',
    'Resume Builder': 'Resume Builder',
    'Saved Items': 'Saved Items',
    Premium: 'Premium'
};

const RoadmapItem = ({ title, progress, onClick }) => (
    <button onClick={onClick} className="w-full p-3 block hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-left">
        <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{title}</span>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
    </button>
);

const SkillTag = ({ name, onClick }) => (
    <button onClick={onClick} className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline">
        #{name}
    </button>
);

const LeftSidebar = ({ setActivePage }) => {

    const handleSearchTag = (tagName) => {
        console.log(`Searching for tag: #${tagName}`);
        setActivePage(Page.Home);
    }

    return (
        <aside className="space-y-6 sticky top-24">
            {/* User Profile Card */}
            <div className="card text-center overflow-hidden">
                <div className="h-20 bg-gradient-to-r from-purple-500 to-pink-500 relative">
                    <img src="https://picsum.photos/seed/cover/300/80" alt="Cover" className="w-full h-full object-cover" />
                </div>
                <button onClick={() => setActivePage(Page.Profile)} className="p-4 pt-0 -mt-10 block w-full focus:outline-none">
                    <img src="https://picsum.photos/seed/user/100/100" alt="User" className="w-20 h-20 rounded-full mx-auto border-4 border-white dark:border-gray-800 shadow-md" />
                    <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white hover:underline">Priya Sharma</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">B.Tech Student @ RGUKT | Aspiring AI/ML Engineer</p>
                </button>
            </div>

            {/* My Roadmaps Card */}
            <div className="card p-4">
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">My Roadmaps</h4>
                <div className="space-y-3">
                    <RoadmapItem title="AI/ML Engineer" progress={75} onClick={() => setActivePage(Page.Roadmaps)} />
                    <RoadmapItem title="React Frontend Dev" progress={40} onClick={() => setActivePage(Page.Roadmaps)} />
                </div>
            </div>

            {/* My Skills & Quick Links Card */}
            <div className="card p-4">
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3">My Skills</h4>
                <div className="flex flex-wrap gap-x-3 gap-y-2 mb-4">
                    <SkillTag name="Python" onClick={() => handleSearchTag('Python')} />
                    <SkillTag name="MachineLearning" onClick={() => handleSearchTag('MachineLearning')} />
                    <SkillTag name="ReactJS" onClick={() => handleSearchTag('ReactJS')} />
                    <SkillTag name="TensorFlow" onClick={() => handleSearchTag('TensorFlow')} />
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                    <button onClick={() => setActivePage(Page['Resume Builder'])} className="w-full text-left block py-2 px-1 text-sm text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        Resume Builder
                    </button>
                    <button onClick={() => setActivePage(Page['Saved Items'])} className="w-full text-left block py-2 px-1 text-sm text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        Saved Items
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default LeftSidebar;
