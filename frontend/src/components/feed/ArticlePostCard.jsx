import React from 'react';

const ArticlePostCard = ({ author, avatarUrl, time, articleTitle, content }) => {
    return (
        <div className="card p-4">
            <div className="flex items-start space-x-3">
                <img src={avatarUrl} alt={author} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                    <p className="font-bold text-gray-900 dark:text-white">{author} <span className="font-normal text-gray-500 dark:text-gray-400">published an article</span></p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
                </div>
            </div>
            <div className="mt-4">
                 <h3 className="font-bold text-xl text-gray-900 dark:text-white">{articleTitle}</h3>
                 <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-4">{content}</p>
            </div>
            <div className="mt-4">
                <button className="font-semibold text-purple-600 dark:text-purple-400 hover:underline text-sm">
                    Read full article...
                </button>
            </div>
        </div>
    );
};

export default ArticlePostCard;
