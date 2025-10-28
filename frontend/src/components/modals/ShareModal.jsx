import React from "react";

const ShareModal = ({ post, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="card w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Share Post
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <textarea
            placeholder="Add your thoughts..."
            rows={3}
            className="input-field"
          />
          <div className="p-3 border dark:border-gray-700 rounded-lg">
            <p className="font-semibold text-sm">{post.author}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
              {post.content}
            </p>
          </div>
          <button
            onClick={() =>
              navigator.clipboard.writeText("https://mindmile.app/post/123")
            }
            className="w-full text-left text-sm text-purple-600 dark:text-purple-400 font-semibold hover:underline"
          >
            Copy link to post
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <button onClick={onClose} className="btn btn-primary">
            Share to your feed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
