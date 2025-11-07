import React, { useState, useEffect } from "react";
import CreatePost from "../feed/CreatePost";
import Post from "../feed/Post";
import CourseCard from "../feed/CourseCard";
import JobCard from "../feed/JobCard";
import QuestionPostCard from "../feed/QuestionPostCard";
import ProjectPostCard from "../feed/ProjectPostCard";
import ArticlePostCard from "../feed/ArticlePostCard";
import { useModal } from "../contexts/ModalContext";
import { useAuth } from "../contexts/AuthContext";

// --- Initial Feed Items ---
const initialFeedItems = [
  {
    id: 1,
    type: "post",
    author: "Rohan Verma",
    title: "M.Tech Student | Data Science Enthusiast",
    avatarUrl: "https://picsum.photos/seed/rohan/100/100",
    time: "2h",
    content:
      "Just finished a deep dive into Large Language Models! The architecture behind models like Gemini is fascinating. It's amazing how far we've come with natural language understanding. Anyone working on projects in this space? Would love to connect and share insights! #AI #LLM #DataScience",
    likes: 125,
    comments: 18,
  },
  {
    type: "job",
    role: "Frontend Developer Intern",
    company: "Google",
    location: "Bengaluru, India (Remote)",
    logoUrl: "https://picsum.photos/seed/googlelogo/100/100",
  },
  {
    type: "course",
    title: "Advanced React Patterns",
    source: "MindMile Originals",
    duration: "4h 20m",
    thumbnailUrl: "https://picsum.photos/seed/react/600/300",
  },
  {
    id: 2,
    type: "post",
    author: "Anjali Gupta",
    title: "12th Grade Student | Future Innovator",
    avatarUrl: "https://picsum.photos/seed/anjali/100/100",
    time: "3d",
    content:
      "Thrilled to share that I won the first prize at the National Science Fair for my project on sustainable urban farming! 🌿 It's been an incredible learning journey. Thanks to MindMile for the resources that helped me structure my research. On to the next challenge! #ScienceFair #Innovation #STEM",
    likes: 450,
    comments: 72,
  },
];

const FilterButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
      isActive
        ? "bg-purple-600 text-white"
        : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
    }`}
  >
    {label}
  </button>
);

const HomeFeed = ({ setViewingCourse, setApplyingForJob }) => {
  const [feedItems, setFeedItems] = useState(initialFeedItems);
  const [activeFilter, setActiveFilter] = useState("All");
  const { setModalProps } = useModal();

  // prefer authenticated user from context when available
  const { user: authUser } = useAuth();

  const currentUser = authUser || {
    name: "Guest",
    avatarUrl: "https://picsum.photos/seed/user/100/100",
  };

  // --- Add new items to feed ---
  const addContentToFeed = (newItem) => {
    setFeedItems((prevItems) => [newItem, ...prevItems]);
  };

  // Fetch posts from backend (public)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.posts && !cancelled) {
          const mapped = data.posts.map((p) => ({
            id: p._id,
            type: "post",
            author: p.authorName || p.authorId?.name || "Unknown",
            // keep the raw author id to allow client-side ownership checks
            authorId: p.authorId?._id || p.authorId || null,
            title: p.title || "",
            avatarUrl: `https://picsum.photos/seed/${
              p.authorId?._id || Date.now()
            }/100/100`,
            time: new Date(p.createdAt).toLocaleString(),
            content: p.body || "",
            media: p.media || [],
            likes: 0,
          }));
          setFeedItems((prev) => [...mapped, ...prev]);
        }
      } catch (e) {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Set modal props correctly
  useEffect(() => {
    setModalProps({
      onPostQuestion: (data) => {
        const newQuestion = {
          id: Date.now(),
          type: "question",
          author: currentUser.name,
          avatarUrl: currentUser.avatarUrl,
          time: "Just now",
          question: data.question,
          details: data.details,
          tags: data.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        };
        addContentToFeed(newQuestion);
      },
      onShareProject: (data) => {
        const newProject = {
          id: Date.now(),
          type: "project",
          author: currentUser.name,
          avatarUrl: currentUser.avatarUrl,
          time: "Just now",
          projectTitle: data.title,
          description: data.description,
          projectLink: data.link,
          imageUrl: `https://picsum.photos/seed/${Date.now()}/600/300`,
        };
        addContentToFeed(newProject);
      },
      onWriteArticle: (data) => {
        const newArticle = {
          id: Date.now(),
          type: "article",
          author: currentUser.name,
          avatarUrl: currentUser.avatarUrl,
          time: "Just now",
          articleTitle: data.title,
          content: data.content,
        };
        addContentToFeed(newArticle);
      },
      onCreated: (post) => {
        // Map backend post to a feed item
        const newPost = {
          id: post._id || Date.now(),
          type: "post",
          author: post.authorName || post.authorId?.name || currentUser.name,
          // preserve authorId returned from backend when possible
          authorId: post.authorId?._id || post.authorId || null,
          title: post.title || "",
          avatarUrl: currentUser.avatarUrl,
          time: "Just now",
          content: post.body || "",
          media: post.media || [],
          likes: 0,
        };
        addContentToFeed(newPost);
      },
    });
  }, [setModalProps, currentUser.name, currentUser.avatarUrl]);

  const filteredFeed = feedItems.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Courses") return item.type === "course";
    if (activeFilter === "Jobs") return item.type === "job";
    if (activeFilter === "Community")
      return ["post", "question", "project", "article"].includes(item.type);
    return false;
  });

  return (
    <div className="space-y-6">
      <div className="w-full px-2">
        <CreatePost />

        <div className="card p-2 flex items-center space-x-2">
          <FilterButton
            label="All"
            isActive={activeFilter === "All"}
            onClick={() => setActiveFilter("All")}
          />
          <FilterButton
            label="Courses"
            isActive={activeFilter === "Courses"}
            onClick={() => setActiveFilter("Courses")}
          />
          <FilterButton
            label="Jobs"
            isActive={activeFilter === "Jobs"}
            onClick={() => setActiveFilter("Jobs")}
          />
          <FilterButton
            label="Community"
            isActive={activeFilter === "Community"}
            onClick={() => setActiveFilter("Community")}
          />
        </div>
      </div>

      <div className="w-full px-2">
        {filteredFeed.map((item, index) => {
          switch (item.type) {
            case "post":
              return (
                <Post
                  key={`post-${item.id}`}
                  {...item}
                  onDelete={(id) =>
                    setFeedItems((prev) => prev.filter((it) => it.id !== id))
                  }
                />
              );
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
            case "question":
              return <QuestionPostCard key={`question-${item.id}`} {...item} />;
            case "project":
              return <ProjectPostCard key={`project-${item.id}`} {...item} />;
            case "article":
              return <ArticlePostCard key={`article-${item.id}`} {...item} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default HomeFeed;
