import React, { useContext } from "react";
import Post from "../feed/Post";
import { EditIcon, AnalyticsIcon } from "../icons/PageIcons";
import { useModal } from "../contexts/ModalContext";
import { useAuth } from "../contexts/AuthContext";

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
  const { user, loading } = useAuth();

  // When loading show a placeholder
  if (loading) return <div>Loading...</div>;

  // Use authenticated user where available; otherwise use minimal placeholders
  const defaultUser = {
    name: "Guest",
    title: "",
    avatarUrl: "https://picsum.photos/seed/user/100/100",
    coverUrl: "https://picsum.photos/seed/cover/800/200",
    about: "",
    skills: [],
    experience: [],
    education: [],
  };

  // Merge actual user over minimal defaults
  const mergedUser = { ...defaultUser, ...(user || {}) };
  const userPosts = [
    {
      id: 101,
      type: "post",
      author: mergedUser.name,
      // include authorId so Post can decide owner-only actions
      authorId: user?._id || user?.id || null,
      title: mergedUser.title,
      avatarUrl: mergedUser.avatarUrl,
      time: "1d",
      content:
        'Excited to start the new "Advanced React Patterns" course on MindMile. Time to level up my frontend skills! #ReactJS #NeverStopLearning',
      likes: 42,
      comments: 5,
    },
    {
      id: 102,
      type: "post",
      author: mergedUser.name,
      authorId: user?._id || user?.id || null,
      title: mergedUser.title,
      avatarUrl: mergedUser.avatarUrl,
      time: "5d",
      content:
        "Wrote a new blog post on implementing a simple neural network with TensorFlow. Check it out and let me know your thoughts! Link in comments. #MachineLearning #TensorFlow",
      likes: 156,
      comments: 23,
    },
  ];

  // If authenticated, fetch the user's posts
  const [fetchedPosts, setFetchedPosts] = React.useState(null);
  // maintain localPosts so deletes update the UI regardless of whether we're showing
  // mocked userPosts or fetched posts from the server
  const [localPosts, setLocalPosts] = React.useState(userPosts);

  React.useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!user) return;
      try {
        const res = await fetch("/api/posts/me", {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("mm_token") ||
              localStorage.getItem("authToken")
            }`,
          },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data && data.posts) {
          const mapped = data.posts.map((p) => ({
            id: p._id,
            type: "post",
            // include authorId so Post knows the owner
            authorId: p.authorId?._id || p.authorId || user?._id || user?.id,
            author: user.name,
            title: p.title || "",
            avatarUrl: user.avatarUrl,
            time: new Date(p.createdAt).toLocaleString(),
            content: p.body || "",
            media: p.media || [],
          }));
          setFetchedPosts(mapped);
          setLocalPosts(mapped);
        }
      } catch (e) {
        // ignore
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  // keep localPosts in sync with fetchedPosts or fall back to static userPosts
  React.useEffect(() => {
    if (fetchedPosts) setLocalPosts(fetchedPosts);
    else setLocalPosts(userPosts);
  }, [fetchedPosts]);

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="card overflow-hidden">
        <div className="relative">
          <img
            src={mergedUser.coverUrl}
            alt="Cover"
            className="w-full h-48 object-cover"
          />
          <img
            src={mergedUser.avatarUrl}
            alt={mergedUser.name}
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
            {user?.name || mergedUser.name}
            {user && (
              <span className="ml-3 inline-block text-sm font-medium text-green-600 dark:text-green-400">
                (you)
              </span>
            )}
          </h2>
          <p className="text-md text-gray-600 dark:text-gray-300">
            {/* prefer showing email for authenticated user, fallback to title */}
            {user?.email || mergedUser.title}
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
          {mergedUser.about}
        </p>
      </div>

      {/* Experience Card */}
      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Experience
        </h3>
        <div className="space-y-6">
          {mergedUser.experience.map((exp, i) => (
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
          {mergedUser.education.map((edu, i) => (
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
          {mergedUser.skills.map((skill) => (
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
          {localPosts.map((post) => (
            <div
              key={post.id}
              className="border-t dark:border-gray-700 first:border-t-0"
            >
              <Post
                {...post}
                onDelete={(id) =>
                  setLocalPosts((prev) => prev.filter((p) => p.id !== id))
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
