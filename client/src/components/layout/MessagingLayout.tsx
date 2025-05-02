import { useState } from "react";
import { Menu, MessageSquare, Home, Settings, User, Bell } from "lucide-react";
import { ChatSidebar } from "../chat/ChatSidebar";
import { ChatWindow } from "../chat/ChatWindow";
import { useMobile } from "@/hooks/use-mobile";
import { useChatContext } from "@/context/ChatContext";
import { Link } from "wouter";
import { TOTAL_UNREAD_COUNT } from "@/lib/constants";

export function MessagingLayout() {
  const { isMobile } = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { user, conversations } = useChatContext();
  
  // Calculate total unread messages from all conversations
  const unreadCount = conversations.reduce((total, conversation) => {
    return total + (conversation.unreadCount || 0);
  }, 0);

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
          <div className="relative">
            <button className="p-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <Bell className="h-5 w-5" />
            </button>
            {TOTAL_UNREAD_COUNT > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-semibold">
                {TOTAL_UNREAD_COUNT > 99 ? '99+' : TOTAL_UNREAD_COUNT > 9 ? '9+' : TOTAL_UNREAD_COUNT}
              </div>
            )}
          </div>
          <div
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold"
          >
            {user?.name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U'}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Overlay for mobile */}
        {isMobile && sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          ></div>
        )}

        {/* Chat Sidebar */}
        <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Chat Window */}
        <ChatWindow />
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-2 px-4 md:hidden">
        <div className="flex justify-around items-center">
          <div className="flex-1 text-center">
            <Link href="/" className="flex flex-col items-center p-2 rounded-md text-gray-500 hover:text-primary-500 focus:outline-none focus:text-primary-500">
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
          </div>
          
          <div className="flex-1 text-center">
            <Link href="/messages" className="flex flex-col items-center p-2 rounded-md text-gray-500 hover:text-primary-500 focus:outline-none focus:text-primary-500">
              <MessageSquare className="h-6 w-6" />
              <span className="text-xs mt-1">Messages</span>
            </Link>
          </div>
          
          <div className="flex-1 text-center">
            <div className="flex flex-col items-center p-2 rounded-md text-gray-500 hover:text-primary-500 focus:outline-none focus:text-primary-500">
              <div className="relative">
                <Bell className="h-6 w-6" />
                {TOTAL_UNREAD_COUNT > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs font-semibold">
                    {TOTAL_UNREAD_COUNT > 9 ? '9+' : TOTAL_UNREAD_COUNT}
                  </div>
                )}
              </div>
              <span className="text-xs mt-1">Alerts</span>
            </div>
          </div>
          
          <div className="flex-1 text-center">
            <div className="flex flex-col items-center p-2 rounded-md text-gray-500 hover:text-primary-500 focus:outline-none focus:text-primary-500">
              <User className="h-6 w-6" />
              <span className="text-xs mt-1">Profile</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MessagingLayout;
