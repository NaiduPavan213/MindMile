import React, { useState } from 'react';

const TabButton = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-semibold rounded-lg focus:outline-none transition-colors ${
            isActive
                ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
    >
        {label}
    </button>
);

const ToggleSwitch = ({ label, description, enabled, setEnabled }) => (
    <div className="flex justify-between items-center py-3">
        <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">{label}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-purple-500 ${
                enabled ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-600'
            }`}
        >
            <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    </div>
);

const Settings = ({ theme, setTheme }) => {
    const [activeTab, setActiveTab] = useState('Account');

    const [notifications, setNotifications] = useState({
        newConnection: true,
        postLike: true,
        postComment: true,
        jobAlerts: true,
        roadmapUpdates: false,
    });

    const [privacy, setPrivacy] = useState({
        showProfileToPublic: true,
        showSkills: true,
        allowMessages: 'connections',
        showConnections: 'connections',
    });

    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Account':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>
                            <input type="text" defaultValue="Priya Sharma" className="input-field" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Email Address
                            </label>
                            <input type="email" defaultValue="priya.sharma@example.com" className="input-field" />
                        </div>
                        <div className="border-t dark:border-gray-700 pt-6">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Change Password
                            </label>
                            <input type="password" placeholder="Current Password" className="input-field" />
                            <input type="password" placeholder="New Password" className="input-field mt-2" />
                        </div>
                        <div className="flex justify-between items-center border-t dark:border-gray-700 pt-6">
                            <div>
                                <h4 className="font-semibold text-red-600 dark:text-red-400">Deactivate Account</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    This will permanently delete your account.
                                </p>
                            </div>
                            <button className="btn border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                                Deactivate
                            </button>
                        </div>
                    </div>
                );
            case 'Privacy':
                return (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <ToggleSwitch
                            label="Public Profile"
                            description="Allow anyone to view your profile"
                            enabled={privacy.showProfileToPublic}
                            setEnabled={val => setPrivacy(p => ({ ...p, showProfileToPublic: val }))}
                        />
                        <div className="py-3">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Who can see your connections?
                            </label>
                            <select
                                value={privacy.showConnections}
                                onChange={e => setPrivacy(p => ({ ...p, showConnections: e.target.value }))}
                                className="input-field"
                            >
                                <option value="everyone">Everyone</option>
                                <option value="connections">Connections Only</option>
                            </select>
                        </div>
                        <div className="py-3">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Who can message you?
                            </label>
                            <select
                                value={privacy.allowMessages}
                                onChange={e => setPrivacy(p => ({ ...p, allowMessages: e.target.value }))}
                                className="input-field"
                            >
                                <option value="everyone">Everyone</option>
                                <option value="connections">Connections Only</option>
                                <option value="none">No one</option>
                            </select>
                        </div>
                    </div>
                );
            case 'Notifications':
                return (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <ToggleSwitch
                            label="New Connection Request"
                            description="Notify me when someone wants to connect"
                            enabled={notifications.newConnection}
                            setEnabled={val => setNotifications(n => ({ ...n, newConnection: val }))}
                        />
                        <ToggleSwitch
                            label="Post Likes"
                            description="Notify me when someone likes my post"
                            enabled={notifications.postLike}
                            setEnabled={val => setNotifications(n => ({ ...n, postLike: val }))}
                        />
                        <ToggleSwitch
                            label="Post Comments"
                            description="Notify me when someone comments on my post"
                            enabled={notifications.postComment}
                            setEnabled={val => setNotifications(n => ({ ...n, postComment: val }))}
                        />
                        <ToggleSwitch
                            label="Job Alerts"
                            description="Send me relevant job opportunities"
                            enabled={notifications.jobAlerts}
                            setEnabled={val => setNotifications(n => ({ ...n, jobAlerts: val }))}
                        />
                        <ToggleSwitch
                            label="Roadmap Updates"
                            description="Notify me about progress in my roadmaps"
                            enabled={notifications.roadmapUpdates}
                            setEnabled={val => setNotifications(n => ({ ...n, roadmapUpdates: val }))}
                        />
                    </div>
                );
            case 'Display':
                return (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <ToggleSwitch
                            label="Dark Mode"
                            description="Reduce eye strain in low-light environments"
                            enabled={theme === 'dark'}
                            setEnabled={handleThemeChange}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="card">
            <div className="p-4 border-b dark:border-gray-700">
                <h2 className="text-xl font-bold">Settings</h2>
            </div>
            <div className="flex p-4 space-x-2 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <TabButton label="Account" isActive={activeTab === 'Account'} onClick={() => setActiveTab('Account')} />
                <TabButton label="Privacy" isActive={activeTab === 'Privacy'} onClick={() => setActiveTab('Privacy')} />
                <TabButton label="Notifications" isActive={activeTab === 'Notifications'} onClick={() => setActiveTab('Notifications')} />
                <TabButton label="Display" isActive={activeTab === 'Display'} onClick={() => setActiveTab('Display')} />
            </div>
            <div className="p-6">{renderContent()}</div>
            <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
                <button className="btn btn-primary px-6">Save Changes</button>
            </div>
        </div>
    );
};

export default Settings;
