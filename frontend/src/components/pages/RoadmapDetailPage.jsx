import React, { useState, useMemo, useEffect, useRef } from "react";
import JobCard from "../feed/JobCard";
import {
  CourseIcon,
  ProjectIcon,
  QuizIcon,
  ArticleIcon,
  CheckmarkCircleIcon,
} from "../icons/PageIcons";

// Custom hook to detect when an element is on screen
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};

const roadmapDetailsData = {
  "Full-Stack Web Dev": {
    skills: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JavaScript",
      "HTML/CSS",
      "API Design",
    ],
    stages: [
      {
        name: "Stage 1: Frontend Fundamentals",
        items: [
          {
            id: 1,
            type: "course",
            title: "HTML, CSS, & JavaScript for Beginners",
            duration: "8h",
          },
          {
            id: 2,
            type: "course",
            title: "Introduction to React & JSX",
            duration: "12h",
          },
          {
            id: 3,
            type: "project",
            title: "Build a Personal Portfolio Website",
            duration: "10h",
          },
        ],
      },
      {
        name: "Stage 2: Backend Development",
        items: [
          {
            id: 4,
            type: "course",
            title: "Node.js and Express Deep Dive",
            duration: "15h",
          },
          {
            id: 5,
            type: "article",
            title: "Understanding RESTful APIs",
            duration: "1h read",
          },
          {
            id: 6,
            type: "course",
            title: "MongoDB for Beginners",
            duration: "6h",
          },
          {
            id: 7,
            type: "project",
            title: "Create a To-Do List API",
            duration: "12h",
          },
        ],
      },
    ],
    jobs: [
      {
        type: "job",
        role: "Junior Web Developer",
        company: "Creative Solutions",
        location: "Remote",
        logoUrl: "https://picsum.photos/seed/creative/100/100",
      },
    ],
    mentors: [
      {
        name: "Raj Singh",
        title: "Lead Frontend Engineer",
        avatarUrl: "https://picsum.photos/seed/mentor/100/100",
      },
    ],
  },
  "AI/ML Engineer": {
    skills: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Deep Learning",
    ],
    stages: [
      {
        name: "Stage 1: Python for Data Science",
        items: [
          {
            id: 8,
            type: "course",
            title: "Complete Python Bootcamp",
            duration: "20h",
          },
          {
            id: 9,
            type: "course",
            title: "Data Analysis with Pandas",
            duration: "10h",
          },
        ],
      },
      {
        name: "Stage 2: Machine Learning Foundations",
        items: [
          {
            id: 10,
            type: "course",
            title: "Machine Learning A-Z",
            duration: "40h",
          },
          {
            id: 11,
            type: "project",
            title: "Predict House Prices with Linear Regression",
            duration: "15h",
          },
          {
            id: 12,
            type: "quiz",
            title: "ML Concepts Quiz",
            duration: "25 Questions",
          },
        ],
      },
    ],
    jobs: [
      {
        type: "job",
        role: "AI/ML Research Intern",
        company: "Microsoft",
        location: "Hyderabad, India",
        logoUrl: "https://picsum.photos/seed/mslogo/100/100",
      },
    ],
    mentors: [
      {
        name: "Rohan Verma",
        title: "Data Science Enthusiast",
        avatarUrl: "https://picsum.photos/seed/rohan/100/100",
      },
    ],
  },
};

const AnimatedRoadmapItem = ({ item, onToggle, isCompleted }) => {
  const [ref, isVisible] = useOnScreen({
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
  });

  const getIcon = (type) => {
    switch (type) {
      case "course":
        return <CourseIcon />;
      case "project":
        return <ProjectIcon />;
      case "quiz":
        return <QuizIcon />;
      case "article":
        return <ArticleIcon />;
      default:
        return <CourseIcon />;
    }
  };

  return (
    <div
      ref={ref}
      className={`relative pl-10 transform transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <div className="absolute top-1 -left-1.5 w-6 h-6 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
      <div className="card p-4 flex items-center space-x-4 hover:shadow-xl transition-shadow duration-300">
        <div className="text-gray-400 dark:text-gray-500">
          {getIcon(item.type)}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-800 dark:text-gray-100">
            {item.title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {item.duration}
          </p>
        </div>
        <button
          onClick={() => onToggle(item.id)}
          className="focus:outline-none transition-transform duration-300 ease-in-out transform hover:scale-110"
        >
          {isCompleted ? (
            <CheckmarkCircleIcon />
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 transition-colors"></div>
          )}
        </button>
      </div>
    </div>
  );
};

const RoadmapDetailPage = ({ roadmap, onClose, setApplyingForJob }) => {
  const details =
    roadmapDetailsData[roadmap.title] ||
    roadmapDetailsData["Full-Stack Web Dev"];

  const allItems = useMemo(
    () => details.stages.flatMap((stage) => stage.items),
    [details.stages]
  );
  const [completedItems, setCompletedItems] = useState(new Set());

  const progress = useMemo(() => {
    if (allItems.length === 0) return 0;
    return Math.round((completedItems.size / allItems.length) * 100);
  }, [completedItems, allItems]);

  const handleToggleComplete = (itemId) => {
    setCompletedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) newSet.delete(itemId);
      else newSet.add(itemId);
      return newSet;
    });
  };

  return (
    <main className="flex-grow w-full bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onClose}
          className="flex items-center text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 mb-6"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Roadmaps
        </button>

        <div className="card p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {roadmap.title}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {roadmap.description}
          </p>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Overall Progress
              </span>
              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                {progress}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Animated Curriculum */}
          <div className="lg:col-span-2">
            <div className="relative pl-4">
              <div
                className="absolute left-4 top-2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                aria-hidden="true"
              ></div>
              {details.stages.map((stage, stageIndex) => (
                <div key={stageIndex} className="mb-12">
                  <div className="relative pl-10">
                    <div className="absolute top-1 -left-1.5 w-6 h-6 rounded-full bg-purple-500 ring-8 ring-gray-50 dark:ring-gray-900/50 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        {stageIndex + 1}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      {stage.name}
                    </h2>
                    <div className="space-y-6">
                      {stage.items.map((item) => (
                        <AnimatedRoadmapItem
                          key={item.id}
                          item={item}
                          onToggle={handleToggleComplete}
                          isCompleted={completedItems.has(item.id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              <div className="card p-4">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">
                  Skills You'll Gain
                </h3>
                <div className="flex flex-wrap gap-2">
                  {details.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="card p-4">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">
                  Related Job Openings
                </h3>
                <div className="space-y-4">
                  {details.jobs.map((job, i) => (
                    <JobCard key={i} {...job} onApplyNow={setApplyingForJob} />
                  ))}
                </div>
              </div>
              <div className="card p-4">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">
                  Find a Mentor
                </h3>
                {details.mentors.map((mentor, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer"
                  >
                    <img
                      src={mentor.avatarUrl}
                      alt={mentor.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-bold text-sm text-gray-800 dark:text-gray-100">
                        {mentor.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {mentor.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RoadmapDetailPage;
