import React from 'react';
import { PlayIcon } from '../icons/CardIcons';
import { CourseIcon, ProjectIcon, QuizIcon } from '../icons/PageIcons';

const CoursePage = ({ course, onClose }) => {
  const curriculum = [
    { type: 'video', title: 'Introduction to Advanced React', duration: '15:30' },
    { type: 'video', title: 'Understanding Render Props', duration: '25:10' },
    { type: 'article', title: 'Deep Dive: Higher-Order Components', duration: '20 min read' },
    { type: 'quiz', title: 'Knowledge Check: HOCs vs Render Props', duration: '10 Questions' },
    { type: 'project', title: 'Project: Build a Reusable Modal Component', duration: '2 hours' },
  ];

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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Course Details */}
          <div className="lg:col-span-2">
            <div className="card overflow-hidden">
              <div className="relative">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <PlayIcon />
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  {course.source}
                </p>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {course.title}
                </h1>
                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Take your React skills to the next level with this advanced course on modern React patterns. We'll explore Render Props, Higher-Order Components (HOCs), and custom Hooks to build more reusable, maintainable, and scalable applications.
                </p>
                <div className="mt-6 border-t dark:border-gray-700 pt-4 flex items-center space-x-4">
                  <img
                    src="https://picsum.photos/seed/instructor/100/100"
                    alt="Instructor"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Raj Singh</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Lead Frontend Engineer at Google
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Curriculum & Enrollment */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Course Curriculum</h2>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2 space-x-4">
                  <span className="flex items-center">
                    <CourseIcon /> {curriculum.length} Lessons
                  </span>
                  <span className="flex items-center">
                    <QuizIcon /> 1 Quiz
                  </span>
                  <span className="flex items-center">
                    <ProjectIcon /> 1 Project
                  </span>
                </div>
                <button className="btn btn-primary w-full mt-6 text-lg py-3">Enroll Now</button>
              </div>
              <div className="border-t dark:border-gray-700 max-h-96 overflow-y-auto">
                <ul className="divide-y dark:divide-gray-700">
                  {curriculum.map((item, index) => (
                    <li
                      key={index}
                      className="p-4 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <div className="text-gray-400 dark:text-gray-500">
                        {item.type === 'video' ? (
                          <CourseIcon />
                        ) : item.type === 'quiz' ? (
                          <QuizIcon />
                        ) : (
                          <ProjectIcon />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.duration}</p>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CoursePage;
