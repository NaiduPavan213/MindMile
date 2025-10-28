import React, { useState } from 'react';
import { CourseIcon, ProjectIcon, QuizIcon } from '../icons/PageIcons';

const roadmapsData = [
    { id: 1, title: 'Full-Stack Web Dev', description: 'Master the MERN stack from scratch and build complex web applications.', imageUrl: 'https://picsum.photos/seed/fullstack/400/200', category: 'Web Development' },
    { id: 2, title: 'React Frontend Developer', description: 'Become a master of creating dynamic and responsive user interfaces with React.', imageUrl: 'https://picsum.photos/seed/reactdev/400/200', category: 'Web Development' },
    { id: 4, title: 'AI/ML Engineer', description: 'Learn to build intelligent systems with Python, TensorFlow, and PyTorch.', imageUrl: 'https://picsum.photos/seed/aiml/400/200', category: 'AI & Machine Learning' },
    { id: 5, title: 'Natural Language Processing', description: 'Dive deep into the world of text analysis and language models.', imageUrl: 'https://picsum.photos/seed/nlp/400/200', category: 'AI & Machine Learning' },
    { id: 3, title: 'Data Science Path', description: 'From Python basics to advanced Deep Learning and data visualization.', imageUrl: 'https://picsum.photos/seed/datasci/400/200', category: 'Data Science' },
    { id: 6, title: 'UI/UX Design Fundamentals', description: 'Learn the principles of modern user-centric design and prototyping.', imageUrl: 'https://picsum.photos/seed/uiux/400/200', category: 'UI/UX Design' },
];

const categories = ['All', 'Web Development', 'AI & Machine Learning', 'Data Science', 'UI/UX Design'];

const RoadmapCard = ({ roadmap, onView }) => (
    <div className="card card-hover flex flex-col">
        <img src={roadmap.imageUrl} alt={roadmap.title} className="w-full h-44 object-cover" />
        <div className="p-5 flex flex-col flex-grow">
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase">{roadmap.category}</span>
            <h4 className="font-bold text-lg text-gray-900 dark:text-white mt-1">{roadmap.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex-grow h-16">{roadmap.description}</p>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-4 space-x-4">
                <span className="flex items-center space-x-1"><CourseIcon /> <span>12 Courses</span></span>
                <span className="flex items-center space-x-1"><ProjectIcon /> <span>5 Projects</span></span>
            </div>
            <button onClick={() => onView(roadmap)} className="btn btn-primary w-full mt-5">
                View Details
            </button>
        </div>
    </div>
);

const CategoryButton = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap focus:outline-none transition-colors ${
        isActive ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
      }`}
    >
      {label}
    </button>
);

const Roadmaps = ({ setViewingRoadmap }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    
    const filteredRoadmaps = activeCategory === 'All' 
        ? roadmapsData 
        : roadmapsData.filter(r => r.category === activeCategory);

    return (
        <div className="card p-6">
            <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">Explore Learning Roadmaps</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Choose a structured path to gain new skills and achieve your career goals.</p>

            <div className="flex space-x-2 border-b dark:border-gray-700 pb-4 mb-6 overflow-x-auto">
                {categories.map(category => (
                    <CategoryButton 
                        key={category} 
                        label={category} 
                        isActive={activeCategory === category} 
                        onClick={() => setActiveCategory(category)}
                    />
                ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRoadmaps.length > 0 ? (
                    filteredRoadmaps.map(r => (
                        <RoadmapCard key={r.id} roadmap={r} onView={setViewingRoadmap} />
                    ))
                ) : (
                     <p className="col-span-full text-center text-gray-500 py-16">No roadmaps found in this category.</p>
                )}
            </div>
        </div>
    );
};

export default Roadmaps;
