import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const Page = {
  Home: "Home",
  Network: "Network",
  Jobs: "Jobs",
  Roadmap: "Roadmap",
  Messages: "Messages",
  Notifications: "Notifications",
  Profile: "Profile",
};

export default function MindMile() {
  const [activePage, setActivePage] = useState(Page.Home);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="flex justify-around items-center bg-white shadow p-4 sticky top-0 z-50">
        {Object.values(Page).map((page) => (
          <button
            key={page}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              activePage === page
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActivePage(page)}
          >
            {page}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <div className="max-w-3xl mx-auto p-6">
        {activePage === Page.Home && (
          <div className="space-y-4">
            {/* Post Card */}
            <Card className="rounded-2xl shadow">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold">Welcome to MindMile 🚀</h2>
                <p className="text-sm text-gray-600 mt-1">
                  This is your educational social platform. Connect, share, and
                  grow together!
                </p>
                <Button
                  className="mt-3 rounded-xl"
                  onClick={() => setShowModal(true)}
                >
                  Create Post
                </Button>
              </CardContent>
            </Card>

            {/* Example Post */}
            <Card className="rounded-2xl shadow">
              <CardContent className="p-4">
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-sm text-gray-700 mt-2">
                  Just finished learning DSA in Java 🚀 #Learning #Coding
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Modal for creating posts */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg rounded-2xl shadow-lg">
            <CardContent className="p-6 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
              <textarea
                placeholder="What's on your mind?"
                className="w-full p-3 border rounded-xl resize-none focus:ring focus:ring-blue-200"
                rows={4}
              />
              <Button className="mt-4 rounded-xl w-full">Post</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
