import React, { useState } from "react";
import Logo from "./Logo";
import {
  HomeIcon,
  NetworkIcon,
  JobsIcon,
  MessageIcon,
  NotificationIcon,
  RoadmapIcon,
} from "./icons/HeaderIcons";
import { useModal } from "./contexts/ModalContext";

const UserProfileIcon = () => (
  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
    <img
      src="https://picsum.photos/seed/user/100/100"
      alt="User"
      className="w-full h-full object-cover"
    />
  </div>
);

const Header = ({ activePage, setActivePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const { openModal } = useModal();

  const navLinks = [
    { name: "Home", icon: <HomeIcon /> },
    { name: "My Network", icon: <NetworkIcon /> },
    { name: "Jobs", icon: <JobsIcon /> },
    { name: "Roadmaps", icon: <RoadmapIcon /> },
    { name: "Messaging", icon: <MessageIcon /> },
    { name: "Notifications", icon: <NotificationIcon /> },
  ];

  const handleNavClick = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
    setProfileOpen(false);
  };

  const handleProfileMenuClick = (page) => {
    if (page === "Logout") {
      openModal("logout");
    } else {
      setActivePage(page);
    }
    setProfileOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 flex-1">
            <button
              onClick={() => handleNavClick("Home")}
              className="cursor-pointer focus:outline-none"
            >
              <Logo className="h-8 w-auto" />
            </button>
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 border border-transparent rounded-md pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:bg-white dark:focus:bg-gray-600"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400 dark:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1 ml-auto">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.name)}
                className={`flex flex-col items-center justify-center w-20 h-16 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 relative group focus:outline-none ${
                  activePage === link.name
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                aria-label={`Go to ${link.name}`}
              >
                {link.icon}
                <span className="text-xs font-medium">{link.name}</span>
                {activePage === link.name && (
                  <span className="absolute bottom-0 h-0.5 w-full bg-purple-600 dark:bg-purple-400"></span>
                )}
              </button>
            ))}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!isProfileOpen)}
                className="relative flex flex-col items-center justify-center w-20 h-16 text-gray-600 dark:text-gray-300 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <UserProfileIcon />
                <span className="text-xs font-medium">Me ▼</span>
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20 border dark:border-gray-700">
                  <button
                    onClick={() => handleProfileMenuClick("Profile")}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleProfileMenuClick("Settings")}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => handleProfileMenuClick("Logout")}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 dark:text-gray-200 focus:outline-none"
              aria-label="Open mobile menu"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.name)}
                className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {link.icon}
                <span className="ml-3 font-medium">{link.name}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
