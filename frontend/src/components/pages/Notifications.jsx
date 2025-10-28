import React, { useState } from 'react';
import { LikeIcon, CommentIcon, ConnectionRequestIcon } from '../icons/PageIcons';

const NotificationItem = ({ notification, onClick }) => (
  <button
    onClick={() => onClick(notification.id)}
    className={`w-full flex items-start space-x-4 p-4 text-left ${
      notification.isNew ? 'bg-purple-50 dark:bg-purple-900/20' : ''
    } hover:bg-gray-100 dark:hover:bg-gray-700/50`}
  >
    <div className="relative">
      <img
        src={notification.avatarUrl}
        alt="User"
        className="w-12 h-12 rounded-full"
      />
      <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-0.5">
        {notification.icon}
      </div>
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-800 dark:text-gray-200">
        {notification.message}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {notification.time}
      </p>
    </div>
    {notification.isNew && (
      <div className="w-2.5 h-2.5 rounded-full bg-purple-500 self-center"></div>
    )}
  </button>
);

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      avatarUrl: 'https://picsum.photos/seed/rohan/100/100',
      message: (
        <p>
          <b>Rohan Verma</b> liked your post: "Thrilled to share that I won..."
        </p>
      ),
      time: '5 minutes ago',
      icon: <LikeIcon />,
      isNew: true,
    },
    {
      id: 2,
      avatarUrl: 'https://picsum.photos/seed/anjali/100/100',
      message: (
        <p>
          <b>Anjali Gupta</b> sent you a connection request.
        </p>
      ),
      time: '1 hour ago',
      icon: <ConnectionRequestIcon />,
      isNew: true,
    },
    {
      id: 3,
      avatarUrl: 'https://picsum.photos/seed/mentor/100/100',
      message: (
        <p>
          <b>Raj Singh</b> commented on your post: "Great insights on LLMs! Have
          you read..."
        </p>
      ),
      time: 'Yesterday',
      icon: <CommentIcon />,
    },
    {
      id: 4,
      avatarUrl: 'https://picsum.photos/seed/jobalert/100/100',
      message: (
        <p>
          A new job matching your profile was posted:{' '}
          <b>Frontend Developer at Google</b>
        </p>
      ),
      time: '3 days ago',
      icon: (
        <svg
          className="h-5 w-5 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.182 0-6.134-.59-8.67-1.605a23.934 23.934 0 01-1.13-1.605-2.062 2.062 0 01-.412-1.353V6.255a2.062 2.062 0 01.412-1.353m17.5 8.106a2.062 2.062 0 00.412-1.353V6.255a2.062 2.062 0 00-.412-1.353m-17.5 0a2.062 2.062 0 01.412-1.353M12 21c3.182 0 6.134-.59 8.67-1.605M12 21c-3.182 0-6.134-.59-8.67-1.605m17.34-16.14a2.062 2.062 0 00-.412-1.353m-1.13 1.605c-1.131.39-2.314.698-3.535.925M5.67 5.055A23.931 23.931 0 0112 3c3.182 0 6.134.59 8.67 1.605"
          />
        </svg>
      ),
    },
  ]);

  const handleNotificationClick = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, isNew: false } : n
      )
    );
  };

  const newNotifications = notifications.filter((n) => n.isNew);
  const earlierNotifications = notifications.filter((n) => !n.isNew);

  return (
    <div className="card overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-lg">Notifications</h3>
      </div>
      <div>
        {newNotifications.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 px-4 py-2 bg-gray-50 dark:bg-gray-900/50">
              New
            </h4>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {newNotifications.map((n) => (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  onClick={handleNotificationClick}
                />
              ))}
            </div>
          </div>
        )}

        {earlierNotifications.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 px-4 py-2 bg-gray-50 dark:bg-gray-900/50">
              Earlier
            </h4>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {earlierNotifications.map((n) => (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  onClick={handleNotificationClick}
                />
              ))}
            </div>
          </div>
        )}

        {notifications.length === 0 && (
          <p className="text-center text-gray-500 py-16">
            No new notifications.
          </p>
        )}
      </div>
    </div>
  );
};

export default Notifications;