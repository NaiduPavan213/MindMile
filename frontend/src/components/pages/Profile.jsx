import React from "react";
import Post from "../feed/Post";
import { EditIcon, AnalyticsIcon } from "../icons/PageIcons";
import { useModal } from "../contexts/ModalContext";

const ExperienceItem = ({ title, company, duration, description, logoUrl }) => (
  <div className="flex space-x-4">
    <img src={logoUrl} alt={company} className="w-12 h-12 rounded-md mt-1" />
    <div>
      <h4 className="font-bold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {company}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{duration}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
        {description}
      </p>
    </div>
  </div>
);

const Profile = () => {
  const { openModal } = useModal(); // ✅ hook from context

  // ✅ Define user first
  const user = {
    name: "Priya Sharma",
    title: "B.Tech Student @ RGUKT | Aspiring AI/ML Engineer",
    avatarUrl: "https://picsum.photos/seed/user/100/100",
    coverUrl: "https://picsum.photos/seed/cover/800/200",
    about:
      "Passionate about leveraging artificial intelligence and machine learning to solve real-world problems. Currently honing my skills in Python, TensorFlow, and React. I am actively seeking internship opportunities in the AI/ML space where I can contribute and grow. Let's connect and build the future!",
    skills: [
      "Python",
      "Machine Learning",
      "Data Analysis",
      "React.js",
      "Node.js",
      "TensorFlow",
      "SQL",
      "Git",
    ],
    experience: [
      {
        title: "Summer Intern",
        company: "Tech Solutions Inc.",
        duration: "May 2023 - Aug 2023",
        description:
          "Developed a sentiment analysis model for customer feedback using Python and TensorFlow, improving response accuracy by 15%.",
        logoUrl: "https://picsum.photos/seed/techinc/100/100",
      },
    ],
    education: [
      {
        title: "B.Tech, Computer Science",
        company: "Rajiv Gandhi University of Knowledge Technologies",
        duration: "2021 - 2025",
        description:
          "CGPA: 8.9/10. Relevant coursework: Data Structures, Algorithms, AI & Machine Learning, Database Management Systems.",
        logoUrl: "https://picsum.photos/seed/rgukt/100/100",
      },
    ],
  };

  // ✅ Now user can be referenced safely
  const userPosts = [
    {
      id: 101,
      type: "post",
      author: "Priya Sharma",
      title: user.title,
      avatarUrl: user.avatarUrl,
      time: "1d",
      content:
        'Excited to start the new "Advanced React Patterns" course on MindMile. Time to level up my frontend skills! #ReactJS #NeverStopLearning',
      likes: 42,
      comments: 5,
    },
    {
      id: 102,
      type: "post",
      author: "Priya Sharma",
      title: user.title,
      avatarUrl: user.avatarUrl,
      time: "5d",
      content:
        "Wrote a new blog post on implementing a simple neural network with TensorFlow. Check it out and let me know your thoughts! Link in comments. #MachineLearning #TensorFlow",
      likes: 156,
      comments: 23,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="card overflow-hidden">
        <div className="relative">
          <img
            src={user.coverUrl}
            alt="Cover"
            className="w-full h-48 object-cover"
          />
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="absolute bottom-0 left-6 transform translate-y-1/2 w-28 h-28 rounded-full border-4 border-white dark:border-gray-800"
          />

          {/* ✅ Use openModal here */}
          <button
            onClick={() => openModal("logout")}
            className="absolute top-4 right-4 bg-white/80 dark:bg-gray-900/50 p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 transition"
          >
            <EditIcon />
          </button>
        </div>
        <div className="pt-20 px-6 pb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user.name}
          </h2>
          <p className="text-md text-gray-600 dark:text-gray-300">
            {user.title}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Ongole, Andhra Pradesh, India
          </p>
          <div className="mt-4 flex space-x-2">
            <button className="btn btn-primary flex-1">Connect</button>
            <button className="btn btn-secondary flex-1">Message</button>
          </div>
        </div>
      </div>

      {/* Analytics Card */}
      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Private to you
        </p>
        <div className="flex space-x-8 mt-4">
          <div className="flex items-center space-x-2">
            <AnalyticsIcon />
            <div>
              <p className="font-bold text-gray-800 dark:text-gray-100">
                125 Profile Views
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Discover who's viewed your profile.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Card */}
      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          About
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {user.about}
        </p>
      </div>

      {/* Experience Card */}
      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Experience
        </h3>
        <div className="space-y-6">
          {user.experience.map((exp, i) => (
            <ExperienceItem key={i} {...exp} />
          ))}
        </div>
      </div>

      {/* Education Card */}
      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Education
        </h3>
        <div className="space-y-6">
          {user.education.map((edu, i) => (
            <ExperienceItem key={i} {...edu} />
          ))}
        </div>
      </div>

      {/* Skills Card */}
      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill) => (
            <span
              key={skill}
              className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 text-sm font-semibold px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Activity Card */}
      <div className="card">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Activity
          </h3>
        </div>
        <div className="space-y-0">
          {userPosts.map((post) => (
            <div
              key={post.id}
              className="border-t dark:border-gray-700 first:border-t-0"
            >
              <Post {...post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
