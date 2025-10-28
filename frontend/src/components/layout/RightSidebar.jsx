import React from "react";
import PremiumPromoCard from "../common/PremiumPromoCard";

const roadmaps = [
  {
    id: 1,
    title: "Full-Stack Web Dev",
    description: "Master the MERN stack",
    imageUrl: "https://picsum.photos/seed/fullstack/400/200",
    category: "Web Development",
  },
  {
    id: 4,
    title: "AI/ML Engineer",
    description: "Build intelligent systems",
    imageUrl: "https://picsum.photos/seed/aiml/400/200",
    category: "AI & Machine Learning",
  },
];

const events = [
  { title: "InnovateAI Hackathon", date: "Dec 15-17, 2024" },
  { title: "Web3 Conclave 2024", date: "Jan 10, 2025" },
];

const RoadmapItem = ({ roadmap, onView }) => (
  <button
    onClick={onView}
    className="w-full flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg text-left"
  >
    <img
      src={roadmap.imageUrl}
      alt={roadmap.title}
      className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
    />
    <div>
      <p className="font-bold text-sm text-gray-800 dark:text-gray-100">
        {roadmap.title}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">View Roadmap</p>
    </div>
  </button>
);

const EventItem = ({ event }) => (
  <a
    href="#"
    className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg"
  >
    <div className="w-14 h-14 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex flex-col items-center justify-center font-bold text-purple-600 dark:text-purple-300">
      <span className="text-xs">{event.date.split(" ")[0].toUpperCase()}</span>
      <span className="text-xl">
        {event.date.split(" ")[1].replace(",", "")}
      </span>
    </div>
    <div>
      <p className="font-bold text-sm text-gray-800 dark:text-gray-100">
        {event.title}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">View Event</p>
    </div>
  </a>
);

const RightSidebar = ({ setActivePage, setViewingRoadmap }) => {
  return (
    <aside className="space-y-6 sticky top-24">
      <PremiumPromoCard setActivePage={setActivePage} />

      <div className="card p-4">
        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
          Recommended Roadmaps
        </h3>
        <ul className="space-y-2">
          {roadmaps.map((roadmap) => (
            <li key={roadmap.id}>
              <RoadmapItem
                roadmap={roadmap}
                onView={() => setViewingRoadmap(roadmap)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="card p-4">
        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
          Upcoming Events
        </h3>
        <ul className="space-y-2">
          {events.map((event) => (
            <li key={event.title}>
              <EventItem event={event} />
            </li>
          ))}
        </ul>
      </div>

      <div className="card p-4">
        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">
          Trending Skills
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">
            #GenerativeAI
          </li>
          <li className="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">
            #PromptEngineering
          </li>
          <li className="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">
            #SystemDesign
          </li>
          <li className="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">
            #NextJS14
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default RightSidebar;
