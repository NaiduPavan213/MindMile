import React, { useState } from "react";

const AskQuestionModal = ({ onClose, onPostQuestion }) => {
  const [question, setQuestion] = useState("");
  const [details, setDetails] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = () => {
    if (question.trim()) {
      onPostQuestion({ question, details, tags });
      onClose(); // Close modal after successful post
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="card w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Ask a Question
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
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Question
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Start your question with 'What', 'How', 'Why', etc."
              className="input-field"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Additional Details
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide more context or details here..."
              rows={4}
              className="input-field"
            ></textarea>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Add Skill Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., React, Python, DataScience"
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-1">
              Tags help your question reach the right experts.
            </p>
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
            disabled={!question.trim()}
          >
            Post Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionModal;
