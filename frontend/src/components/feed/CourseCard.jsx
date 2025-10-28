import React from 'react';

const CourseCard = (props) => {
  const { title, source, duration, thumbnailUrl, onStartLearning } = props;
  
  return (
    <div className="card">
        <div className="relative">
            <img src={thumbnailUrl} alt={title} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <svg className="w-12 h-12 text-white/80" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.555a.75.75 0 0 0 0-1.391l-6.525-3.5a.75.75 0 0 0-1.125.696v7a.75.75 0 0 0 1.125.696l6.525-3.5Z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
      <div className="p-4">
        <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">{source}</p>
        <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-1 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">{title}</h4>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-3">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.59 1.59a.75.75 0 0 0 1.06 1.06l1.59-1.59ZM3 12.75a.75.75 0 0 1-.75-.75v-2.25a.75.75 0 0 1 1.5 0V12a.75.75 0 0 1-.75.75ZM6.166 18.894a.75.75 0 0 0 1.06 1.06l1.59-1.59a.75.75 0 1 0-1.06-1.06l-1.59 1.59ZM12 21.75a.75.75 0 0 1-.75.75H9a.75.75 0 0 1 0-1.5h2.25a.75.75 0 0 1 .75.75ZM15.834 6.166a.75.75 0 0 0-1.06 1.06l1.59 1.59a.75.75 0 0 0 1.06-1.06l-1.59-1.59ZM12 10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM6.166 5.106a.75.75 0 0 0-1.06-1.06l-1.59 1.59a.75.75 0 0 0 1.06 1.06l1.59-1.59ZM15 21.75a.75.75 0 0 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75V21a.75.75 0 0 1 1.5 0v.75Z" />
          </svg>
          <span className="ml-2">{duration}</span>
        </div>
      </div>
       <div className="px-4 pb-4">
            <button 
              onClick={() => onStartLearning(props)} 
              className="btn btn-primary w-full"
            >
                Start Learning
            </button>
       </div>
    </div>
  );
};

export default CourseCard;
