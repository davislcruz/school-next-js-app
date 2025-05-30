import { useState } from "react";
import { Menu, Bell } from "lucide-react";
import { ChatSidebar } from "../chat/ChatSidebar";
import { ChatWindow } from "../chat/ChatWindow";
import { SideNavbar } from "../navigation/SideNavbar";
import { BottomNavbar } from "../navigation/BottomNavbar";
import { useMobile } from "@/hooks/use-mobile";
import { useChatContext } from "@/context/ChatContext";
import { TOTAL_UNREAD_COUNT } from "@/lib/constants";

export function MessagingLayout() {
  const { isMobile, isTablet, isDesktop } = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile && !isTablet);
  const { user, conversations } = useChatContext();
  
  // Calculate total unread messages from all conversations
  const unreadCount = conversations.reduce((total, conversation) => {
    return total + (conversation.unreadCount || 0);
  }, 0);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-[100dvh] flex">
      {/* Desktop Side Navigation */}
      {isDesktop && <SideNavbar />}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header - only show on mobile/tablet */}
        {(isMobile || isTablet) && (
          <header className="bg-white border-b border-gray-200 py-2 px-4 flex items-center justify-between shadow-sm z-20 relative">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="mr-4 p-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                {user?.name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U'}
              </div>
            </div>
          </header>
        )}

        {/* Chat Content Area */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Mobile Chat Sidebar - overlay style */}
          {isMobile && (
            <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} layoutMode="mobile" />
          )}

          {/* Tablet Layout - Grid approach */}
          {isTablet && (
            <>
              <div className="w-1/3 max-w-none overflow-hidden">
                <ChatSidebar isOpen={true} onClose={() => {}} layoutMode="tablet" />
              </div>
              <div className="w-2/3 max-w-none overflow-hidden">
                <ChatWindow />
              </div>
            </>
          )}

          {/* Desktop Chat Sidebar - always visible */}
          {isDesktop && (
            <>
              <ChatSidebar isOpen={true} onClose={() => {}} layoutMode="desktop" />
              <div className="flex-1 min-w-0">
                <ChatWindow />
              </div>
            </>
          )}

          {/* Overlay for mobile only */}
          {isMobile && sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-30 h-[100dvh] w-full"
            ></div>
          )}

          {/* Main Chat Window for mobile only */}
          {isMobile && (
            <div className="flex-1 min-w-0">
              <ChatWindow />
            </div>
          )}
        </div>

        {/* Bottom Navigation - only show on mobile/tablet */}
        {(isMobile || isTablet) && <BottomNavbar />}
      </div>
    </div>
  );
}

export default MessagingLayout;
