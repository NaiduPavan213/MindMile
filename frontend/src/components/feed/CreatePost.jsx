import React from "react";
import { useModal } from "../contexts/ModalContext";
const ActionButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-600 dark:text-gray-300 font-medium"
  >
    {icon}
    <span>{label}</span>
  </button>
);

const CreatePost = () => {
  // use modal context provided by ModalProvider
  const { openModal } = useModal();
  return (
    <div className="card p-4">
      <div className="flex items-start space-x-4">
        <img
          src="https://picsum.photos/seed/user/100/100"
          alt="User"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <button
            onClick={() => openModal("createPost")}
            className="w-full text-left bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            Start a post, share your thoughts...
          </button>
        </div>
      </div>
      <div className="flex justify-around items-center mt-3 pt-2">
        <ActionButton
          onClick={() => openModal("askQuestion")}
          icon={
            <svg
              className="h-6 w-6 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          label="Ask Question"
        />
        <ActionButton
          onClick={() => openModal("shareProject")}
          icon={
            <svg
              className="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          }
          label="Share Project"
        />
        <ActionButton
          onClick={() => openModal("writeArticle")}
          icon={
            <svg
              className="h-6 w-6 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          }
          label="Write Article"
        />
      </div>
    </div>
  );
};

export default CreatePost;
