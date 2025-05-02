import { ChatWindow } from "@/components/chat/ChatWindow";
import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useMobile } from "@/hooks/use-mobile";
import { useChatContext } from "@/context/ChatContext";
import { ArrowLeft, Home, User, Bell, MessageSquare } from "lucide-react";

export default function Conversation() {
  const { isMobile } = useMobile();
  const [location, setLocation] = useLocation();
  const { user, conversations, activeConversationId } = useChatContext();
  
  // Calculate total unread messages from all conversations
  const unreadCount = conversations.reduce((total, conversation) => {
    return total + (conversation.unreadCount || 0);
  }, 0);

  // Find active conversation
  const activeConversation = conversations.find(c => c.id === activeConversationId);

  return (
    <div className="h-[100dvh] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-2 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <button
            onClick={() => setLocation("/messages")}
            className="mr-4 p-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="font-semibold text-lg">
            {activeConversation ? activeConversation.title : "Conversation"}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <Bell className="h-5 w-5" />
            </button>
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-semibold">
                {unreadCount > 99 ? '99+' : unreadCount}
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
        {/* Chat Window - Full Width */}
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
            <Link href="/messages" className="flex flex-col items-center p-2 rounded-md text-primary-500 hover:text-primary-500 focus:outline-none focus:text-primary-500">
              <MessageSquare className="h-6 w-6" />
              <span className="text-xs mt-1">Messages</span>
            </Link>
          </div>
          
          <div className="flex-1 text-center">
            <div className="flex flex-col items-center p-2 rounded-md text-gray-500 hover:text-primary-500 focus:outline-none focus:text-primary-500">
              <div className="relative">
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs font-semibold">
                    {unreadCount > 9 ? '9+' : unreadCount}
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