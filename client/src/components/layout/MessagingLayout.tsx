import { useState } from "react";
import { Menu, MessageSquare, Home, Settings, User } from "lucide-react";
import { ChatSidebar } from "../chat/ChatSidebar";
import { ChatWindow } from "../chat/ChatWindow";
import { useMobile } from "@/hooks/use-mobile";
import { useChatContext } from "@/context/ChatContext";

export function MessagingLayout() {
  const { isMobile } = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { user } = useChatContext();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-[100dvh] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-2 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="md:hidden mr-4 p-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="font-semibold text-lg">Messenger</div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
          <div
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold"
          >
            {user?.name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U'}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Overlay for mobile */}
        {isMobile && sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          ></div>
        )}

        {/* Chat Sidebar */}
        <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Chat Window */}
        <div className="flex-1">
          <ChatWindow />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-2 px-4 md:hidden">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center p-2 rounded-md text-gray-500 hover:text-primary-500 focus:outline-none focus:text-primary-500">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          <button 
            onClick={toggleSidebar}
            className={`flex flex-col items-center p-2 rounded-md hover:text-primary-500 focus:outline-none focus:text-primary-500 ${
              sidebarOpen ? "text-primary-500" : "text-gray-500"
            }`}
          >
            <MessageSquare className="h-6 w-6" />
            <span className="text-xs mt-1">Messages</span>
          </button>
          
          <button className="flex flex-col items-center p-2 rounded-md text-gray-500 hover:text-primary-500 focus:outline-none focus:text-primary-500">
            <Settings className="h-6 w-6" />
            <span className="text-xs mt-1">Settings</span>
          </button>
          
          <button className="flex flex-col items-center p-2 rounded-md text-gray-500 hover:text-primary-500 focus:outline-none focus:text-primary-500">
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default MessagingLayout;
