import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import LeftSidebar from "./components/layout/LeftSidebar";
import RightSidebar from "./components/layout/RightSidebar";
import AIAssistantFab from "./components/common/AIAssistantFab";

// Import page components
import HomeFeed from "./components/pages/HomeFeed";
import MyNetwork from "./components/pages/MyNetwork";
import Jobs from "./components/pages/Jobs";
import Roadmaps from "./components/pages/Roadmaps";
import Messaging from "./components/pages/Messaging";
import Notifications from "./components/pages/Notifications";
import Profile from "./components/pages/Profile";
import Settings from "./components/pages/Settings";
import ResumeBuilder from "./components/pages/ResumeBuilder";
import SavedItems from "./components/pages/SavedItems";
import CoursePage from "./components/pages/CoursePage";
import JobApplicationPage from "./components/pages/JobApplicationPage";
import RoadmapDetailPage from "./components/pages/RoadmapDetailPage";
import Premium from "./components/pages/Premium";
import Login from "./components/pages/LoginCompact";
import Register from "./components/pages/Register";
import { useModal } from "./components/contexts/ModalContext";

const App = () => {
  const [activePage, setActivePage] = useState("Home");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { openModal } = useModal();

  // State for immersive page views
  const [viewingCourse, setViewingCourse] = useState(null);
  const [applyingForJob, setApplyingForJob] = useState(null);
  const [viewingRoadmap, setViewingRoadmap] = useState(null);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleSetPage = (page) => {
    if (page === "Logout") {
      openModal("logout");
    } else {
      // Close any immersive views when changing main pages
      setViewingCourse(null);
      setApplyingForJob(null);
      setViewingRoadmap(null);
      setActivePage(page);
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return (
          <HomeFeed
            setViewingCourse={setViewingCourse}
            setApplyingForJob={setApplyingForJob}
          />
        );
      case "My Network":
        return <MyNetwork />;
      case "Jobs":
        return <Jobs setApplyingForJob={setApplyingForJob} />;
      case "Roadmaps":
        return <Roadmaps setViewingRoadmap={setViewingRoadmap} />;
      case "Messaging":
        return <Messaging />;
      case "Notifications":
        return <Notifications />;
      case "Profile":
        return <Profile />;
      case "Login":
        return <Login setActivePage={handleSetPage} />;
      case "Register":
        return <Register setActivePage={handleSetPage} />;
      case "Settings":
        return <Settings theme={theme} setTheme={setTheme} />;
      case "Saved Items":
        return (
          <SavedItems
            setViewingCourse={setViewingCourse}
            setApplyingForJob={setApplyingForJob}
          />
        );
      default:
        return (
          <HomeFeed
            setViewingCourse={setViewingCourse}
            setApplyingForJob={setApplyingForJob}
          />
        );
    }
  };

  const renderMainContent = () => {
    if (activePage === "Premium") {
      return <Premium setActivePage={handleSetPage} />;
    }
    if (viewingCourse) {
      return (
        <CoursePage
          course={viewingCourse}
          onClose={() => setViewingCourse(null)}
        />
      );
    }
    if (applyingForJob) {
      return (
        <JobApplicationPage
          job={applyingForJob}
          onClose={() => setApplyingForJob(null)}
        />
      );
    }
    if (viewingRoadmap) {
      return (
        <RoadmapDetailPage
          roadmap={viewingRoadmap}
          onClose={() => setViewingRoadmap(null)}
          setApplyingForJob={setApplyingForJob}
        />
      );
    }
    if (activePage === "Resume Builder") {
      return <ResumeBuilder />;
    }
    return (
      <main className="w-full px-4 py-6 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-[22%_56%_22%] gap-4">
          <aside className="hidden md:block">
            <LeftSidebar setActivePage={handleSetPage} />
          </aside>
          <div className="col-span-1">{renderPage()}</div>
          <aside className="hidden md:block">
            <RightSidebar
              setActivePage={handleSetPage}
              setViewingRoadmap={setViewingRoadmap}
            />
          </aside>
        </div>
      </main>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 antialiased min-h-screen flex flex-col">
      <Header activePage={activePage} setActivePage={handleSetPage} />

      {renderMainContent()}

      <AIAssistantFab />
    </div>
  );
};

export default App;
