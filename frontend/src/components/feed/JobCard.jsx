import React, { useState } from 'react';

const JobCard = (props) => {
  const { role, company, location, logoUrl, onApplyNow } = props;
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="card p-4">
      <div className="flex items-start space-x-4">
        <img src={logoUrl} alt={`${company} logo`} className="w-12 h-12 rounded-md" />
        <div>
          <a href="#" className="font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 hover:underline cursor-pointer">{role}</a>
          <p className="text-sm text-gray-600 dark:text-gray-300">{company}</p>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM12 2a.5.5 0 01.5.5v3a.5.5 0 01-1 0v-3A.5.5 0 0112 2zm-8.485 2.485a.5.5 0 01.353-.853h.001c.196 0 .386.078.529.22l2.122 2.12a.5.5 0 01-.707.708l-2.122-2.12a.5.5 0 01-.22-.529zm13.435-.157a.5.5 0 01.5-.5h.001a.5.5 0 01.353.146l2.122 2.12a.5.5 0 01-.707.708l-2.122-2.12a.5.5 0 01-.353-.529zm-6.25 15.657a.5.5 0 01-.5-.5v-.001a.5.5 0 01.5-.5h.001c.276 0 .5.224.5.5s-.224.5-.5.5h-.001zm1.5-6.5a.5.5 0 01-.5-.5v-3a.5.5 0 011 0v3a.5.5 0 01-.5.5zm-5.414 4.5a.5.5 0 01-.353-.853l2.122-2.12a.5.5 0 01.707.708l-2.122 2.12a.5.5 0 01-.353.145zM20 12.75a.5.5 0 01-.5.5h-3a.5.5 0 010-1h3a.5.5 0 01.5.5zM4 12.75a.5.5 0 01-.5.5h-3a.5.5 0 010-1h3a.5.5 0 01.5.5zm13.435 2.157a.5.5 0 01-.353-.853l2.122-2.12a.5.5 0 01.707.708l-2.122 2.12a.5.5 0 01-.353.145zm-14.157-.157a.5.5 0 01.353.146l2.122 2.12a.5.5 0 01-.707.708l-2.122-2.12a.5.5 0 01-.22-.529zM12 22a.5.5 0 01-.5.5h-3a.5.5 0 010-1h3a.5.5 0 01.5.5zM12 2a.5.5 0 01.5.5v3a.5.5 0 01-1 0v-3A.5.5 0 0112 2zM12 22a.5.5 0 01-.5-.5v-3a.5.5 0 011 0v3a.5.5 0 01-.5.5z" clipRule="evenodd" /></svg>
            <span className="ml-1">{location}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button onClick={() => onApplyNow(props)} className="btn btn-primary flex-1">
          Apply Now
        </button>
        <button onClick={() => setIsSaved(!isSaved)} className={`btn flex-1 ${isSaved ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 'btn-secondary'}`}>
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
