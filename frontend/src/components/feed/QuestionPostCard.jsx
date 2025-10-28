import React from 'react';

const QuestionPostCard = ({ author, avatarUrl, time, question, details, tags }) => {
    return (
        <div className="card p-4">
            <div className="flex items-start space-x-3">
                <img src={avatarUrl} alt={author} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                    <p className="font-bold text-gray-900 dark:text-white">{author}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
                </div>
            </div>
            <div className="mt-4 pl-15">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{question}</h3>
                {details && <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{details}</p>}
                {Array.isArray(tags) && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {tags.map(tag => (
                            <span key={tag} className="text-xs text-purple-600 dark:text-purple-400 font-semibold bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded-full">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-2 flex justify-around">
                <button className="btn btn-secondary flex-1 text-sm">Answer</button>
                <button className="btn btn-secondary flex-1 text-sm ml-2">Follow</button>
            </div>
        </div>
    );
};

export default QuestionPostCard;
