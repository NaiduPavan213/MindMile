import React, { useState } from 'react';

const conversationsData = [
  {
    id: 1,
    name: "Rohan Verma",
    lastMessage: "Sure, I can send you the research paper.",
    time: "2:45 PM",
    avatarUrl: "https://picsum.photos/seed/rohan/100/100",
    messages: [
      { text: "Hey! I saw your post on LLMs. Really interesting stuff.", sender: "other" },
      { text: "Thanks! I'm really passionate about it. Are you working on any AI projects?", sender: "me" },
      { text: "Yeah, I'm trying to build a small recommendation engine. Could you share any resources you found helpful?", sender: "other" },
      { text: "Sure, I can send you the research paper.", sender: "me" },
    ],
  },
  {
    id: 2,
    name: "Anjali Gupta",
    lastMessage: "That's awesome, congratulations!",
    time: "Yesterday",
    avatarUrl: "https://picsum.photos/seed/anjali/100/100",
    messages: [
      { text: "Your science fair project looked amazing!", sender: "me" },
      { text: "That's awesome, congratulations!", sender: "other" },
    ],
  },
  {
    id: 3,
    name: "AI/ML Study Group",
    lastMessage: "Let's meet at 5 PM tomorrow.",
    time: "3d ago",
    avatarUrl: "https://picsum.photos/seed/group/100/100",
    messages: [
      { text: "Hey everyone, reminder about our project deadline.", sender: "other" },
      { text: "Let's meet at 5 PM tomorrow.", sender: "me" },
    ],
  },
];

const ConversationItem = ({ conversation, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-start space-x-3 p-3 rounded-lg cursor-pointer text-left ${
      active
        ? "bg-purple-100 dark:bg-purple-900/50"
        : "hover:bg-gray-100 dark:hover:bg-gray-700/50"
    }`}
  >
    <img
      src={conversation.avatarUrl}
      alt={conversation.name}
      className="w-12 h-12 rounded-full"
    />
    <div className="flex-1 overflow-hidden">
      <div className="flex justify-between items-center">
        <p className="font-bold text-gray-800 dark:text-white">
          {conversation.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {conversation.time}
        </p>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
        {conversation.lastMessage}
      </p>
    </div>
  </button>
);

const ChatBubble = ({ message, isSender }) => (
  <div className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
    <div
      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
        isSender
          ? "bg-purple-600 text-white rounded-br-none"
          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none"
      }`}
    >
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

const Messaging = () => {
  const [conversations, setConversations] = useState(conversationsData);
  const [activeConversationId, setActiveConversationId] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, { text: newMessage, sender: "me" }],
      lastMessage: newMessage,
      time: "Now",
    };

    setConversations(
      conversations.map((c) =>
        c.id === activeConversationId ? updatedConversation : c
      )
    );
    setNewMessage("");
  };

  return (
    <div className="card flex h-[75vh] overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-lg">Messages</h3>
        </div>
        <div className="flex-grow overflow-y-auto p-2 space-y-1">
          {conversations.map((conv) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              active={conv.id === activeConversationId}
              onClick={() => setActiveConversationId(conv.id)}
            />
          ))}
        </div>
      </div>

      {/* Chat Window */}
      {activeConversation ? (
        <div className="w-2/3 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3">
            <img
              src={activeConversation.avatarUrl}
              alt={activeConversation.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-bold">{activeConversation.name}</p>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {activeConversation.messages.map((msg, i) => (
              <ChatBubble
                key={i}
                message={msg.text}
                isSender={msg.sender === "me"}
              />
            ))}
          </div>
          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="relative">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="w-full pl-4 pr-12 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
              />
              <button
                onClick={handleSendMessage}
                className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full text-white bg-purple-600 rounded-full transform scale-90 hover:bg-purple-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-2/3 flex items-center justify-center text-gray-500 dark:text-gray-400">
          <p>Select a conversation to start chatting.</p>
        </div>
      )}
    </div>
  );
};

export default Messaging;
