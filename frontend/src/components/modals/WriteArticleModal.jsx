import React, { useState } from "react";
import { BoldIcon, ItalicIcon, ListIcon, CodeBlockIcon } from "../icons/PageIcons";

const WriteArticleModal = ({ onClose, onWriteArticle }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      onWriteArticle({ title, content });
      onClose(); // Close modal after successful publish
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="card w-full max-w-2xl mx-4 flex flex-col h-[80vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Write an Article
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-grow flex flex-col">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article Title"
            className="input-field text-xl font-bold mb-4"
          />

          {/* Formatting Toolbar */}
          <div className="flex items-center space-x-2 p-2 border rounded-t-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50">
            <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
              <BoldIcon />
            </button>
            <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
              <ItalicIcon />
            </button>
            <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
              <ListIcon />
            </button>
            <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
              <CodeBlockIcon />
            </button>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your article here..."
            className="input-field !mt-0 w-full flex-grow rounded-b-md rounded-t-none resize-none focus:ring-0"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <button onClick={onClose} className="btn btn-secondary mr-2">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={!title.trim() || !content.trim()}
          >
            Publish Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteArticleModal;
