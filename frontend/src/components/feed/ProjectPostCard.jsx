import React from "react";

const ProjectPostCard = ({
  author,
  avatarUrl,
  time,
  projectTitle,
  description,
  projectLink,
  imageUrl,
}) => {
  return (
    <div className="card">
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <img
            src={avatarUrl}
            alt={author}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <p className="font-bold text-gray-900 dark:text-white">
              {author}{" "}
              <span className="font-normal text-gray-500 dark:text-gray-400">
                shared a project
              </span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
          </div>
        </div>
      </div>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={projectTitle}
          className="w-full h-56 object-cover"
        />
      )}

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
          {projectTitle}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-3">
          {description}
        </p>
      </div>

      <div className="px-4 pb-4">
        <a
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary w-full text-center"
        >
          View Project
        </a>
      </div>
    </div>
  );
};

export default ProjectPostCard;
