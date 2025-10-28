import React, { useState } from "react";

const ShareProjectModal = ({ onClose, onShareProject }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = () => {
    if (title.trim() && link.trim()) {
      onShareProject({ title, description, link });
      onClose(); // Close modal after successful share
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="card w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Share a Project
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
          {/* Title */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., AI-Powered Learning Assistant"
              className="input-field"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe your project, its purpose, and the tech used."
              rows={4}
              className="input-field"
            ></textarea>
          </div>

          {/* Project Link */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Project Link
            </label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://github.com/user/repo"
              className="input-field"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Upload Image/Thumbnail
            </label>
            <input
              type="file"
              className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <button onClick={onClose} className="btn btn-secondary mr-2">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={!title.trim() || !link.trim()}
          >
            Share Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareProjectModal;
