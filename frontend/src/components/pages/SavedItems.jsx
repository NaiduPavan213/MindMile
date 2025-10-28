import React, { useState } from "react";
import Post from "../feed/Post";
import CourseCard from "../feed/CourseCard";
import JobCard from "../feed/JobCard";

// Local placeholder for saved items — App does not export these values.
const savedItemsData = {
  posts: [],
  jobs: [],
  courses: [],
};

// Combine all items
const allItems = [
  ...savedItemsData.posts,
  ...savedItemsData.jobs,
  ...savedItemsData.courses,
];

const FilterButton = ({ label, count, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
      isActive
        ? "bg-purple-600 text-white"
        : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
    }`}
  >
    {label}{" "}
    <span
      className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
        isActive
          ? "bg-white text-purple-600"
          : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-200"
      }`}
    >
      {count}
    </span>
  </button>
);

const SavedItems = ({ setViewingCourse, setApplyingForJob }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const getFilteredItems = () => {
    switch (activeFilter) {
      case "Posts":
        return savedItemsData.posts;
      case "Jobs":
        return savedItemsData.jobs;
      case "Courses":
        return savedItemsData.courses;
      case "All":
      default:
        return allItems;
    }
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="space-y-6">
      <div className="card p-4">
        <h2 className="text-xl font-bold">Saved Items</h2>
      </div>

      <div className="card p-2 flex items-center space-x-2">
        <FilterButton
          label="All"
          count={allItems.length}
          isActive={activeFilter === "All"}
          onClick={() => setActiveFilter("All")}
        />
        <FilterButton
          label="Posts"
          count={savedItemsData.posts.length}
          isActive={activeFilter === "Posts"}
          onClick={() => setActiveFilter("Posts")}
        />
        <FilterButton
          label="Jobs"
          count={savedItemsData.jobs.length}
          isActive={activeFilter === "Jobs"}
          onClick={() => setActiveFilter("Jobs")}
        />
        <FilterButton
          label="Courses"
          count={savedItemsData.courses.length}
          isActive={activeFilter === "Courses"}
          onClick={() => setActiveFilter("Courses")}
        />
      </div>

      {filteredItems.length > 0 ? (
        filteredItems.map((item, index) => {
          switch (item.type) {
            case "post":
              return <Post key={`post-${item.id}`} {...item} />;
            case "course":
              return (
                <CourseCard
                  key={`course-${index}`}
                  {...item}
                  onStartLearning={setViewingCourse}
                />
              );
            case "job":
              return (
                <JobCard
                  key={`job-${index}`}
                  {...item}
                  onApplyNow={setApplyingForJob}
                />
              );
            default:
              return null;
          }
        })
      ) : (
        <div className="card p-8 text-center text-gray-500 dark:text-gray-400">
          You have no saved items in this category.
        </div>
      )}
    </div>
  );
};

export default SavedItems;
