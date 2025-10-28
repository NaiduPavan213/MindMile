import React, { useState } from 'react';
import { AcceptIcon, DeclineIcon, ConnectIcon } from '../icons/PageIcons';

const ConnectionCard = ({ connection, isInvitation = false, isSuggestion = false, onAccept, onDecline, onConnect, connectionStatus }) => (
    <div className="card card-hover text-center p-4">
        <img
            src={connection.avatarUrl}
            alt={connection.name}
            className="w-20 h-20 rounded-full mx-auto border-2 border-purple-200"
        />
        <h4 className="font-bold text-gray-900 dark:text-white mt-3">{connection.name}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 h-8">{connection.title}</p>
        {isInvitation && (
            <div className="flex justify-center space-x-2">
                <button
                    onClick={() => onAccept?.(connection.id)}
                    className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900"
                >
                    <AcceptIcon />
                </button>
                <button
                    onClick={() => onDecline?.(connection.id)}
                    className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900"
                >
                    <DeclineIcon />
                </button>
            </div>
        )}
        {isSuggestion && (
            <button
                onClick={() => onConnect?.(connection.id)}
                disabled={connectionStatus === 'pending'}
                className="btn w-full flex items-center justify-center space-x-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:hover:bg-purple-900"
            >
                {connectionStatus === 'pending' ? (
                    'Pending'
                ) : (
                    <>
                        <ConnectIcon />
                        <span>Connect</span>
                    </>
                )}
            </button>
        )}
        {!isInvitation && !isSuggestion && (
            <button
                onClick={() => console.log(`Message ${connection.name}`)}
                className="btn btn-secondary w-full"
            >
                Message
            </button>
        )}
    </div>
);

const TabButton = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-semibold rounded-t-lg border-b-2 transition-colors duration-200 focus:outline-none ${
            isActive
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
        }`}
    >
        {label}
    </button>
);

const MyNetwork = () => {
    const [activeTab, setActiveTab] = useState('Connections');

    const [connections, setConnections] = useState(
        Array.from({ length: 8 }, (_, i) => ({
            id: i,
            name: `Rohan Verma ${i + 1}`,
            title: 'Data Science Enthusiast',
            avatarUrl: `https://picsum.photos/seed/rohan${i}/100/100`,
        }))
    );

    const [invitations, setInvitations] = useState(
        Array.from({ length: 2 }, (_, i) => ({
            id: i,
            name: `Anjali Gupta ${i + 1}`,
            title: '12th Grade Student',
            avatarUrl: `https://picsum.photos/seed/anjali${i}/100/100`,
        }))
    );

    const [suggestions, setSuggestions] = useState({
        0: 'connect',
        1: 'connect',
        2: 'connect',
        3: 'connect',
    });

    const handleInvitation = (id, action) => {
        const invitation = invitations.find((inv) => inv.id === id);
        if (action === 'accept' && invitation) {
            setConnections((prev) => [...prev, invitation]);
        }
        setInvitations((prev) => prev.filter((inv) => inv.id !== id));
    };

    const handleConnect = (id) => {
        setSuggestions((prev) => ({ ...prev, [id]: 'pending' }));
    };

    const suggestionUsers = Array.from({ length: 4 }, (_, i) => ({
        id: i,
        name: `New Colleague ${i + 1}`,
        title: 'AI Researcher at OpenAI',
        avatarUrl: `https://picsum.photos/seed/colleague${i}/100/100`,
    }));

    return (
        <div className="space-y-6">
            <div className="card">
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex space-x-2 px-4">
                        <TabButton
                            label={`Connections (${connections.length})`}
                            isActive={activeTab === 'Connections'}
                            onClick={() => setActiveTab('Connections')}
                        />
                        <TabButton
                            label={`Invitations (${invitations.length})`}
                            isActive={activeTab === 'Invitations'}
                            onClick={() => setActiveTab('Invitations')}
                        />
                        <TabButton
                            label="Suggestions"
                            isActive={activeTab === 'Suggestions'}
                            onClick={() => setActiveTab('Suggestions')}
                        />
                    </nav>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {activeTab === 'Connections' &&
                            connections.map((c) => <ConnectionCard key={c.id} connection={c} />)}

                        {activeTab === 'Invitations' &&
                            invitations.map((c) => (
                                <ConnectionCard
                                    key={c.id}
                                    connection={c}
                                    isInvitation
                                    onAccept={() => handleInvitation(c.id, 'accept')}
                                    onDecline={() => handleInvitation(c.id, 'decline')}
                                />
                            ))}

                        {activeTab === 'Suggestions' &&
                            suggestionUsers.map((c) => (
                                <ConnectionCard
                                    key={c.id}
                                    connection={c}
                                    isSuggestion
                                    onConnect={() => handleConnect(c.id)}
                                    connectionStatus={suggestions[c.id]}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyNetwork;
