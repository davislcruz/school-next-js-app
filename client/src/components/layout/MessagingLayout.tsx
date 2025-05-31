import { useState } from "react";
import { ChatSidebar } from "../chat/ChatSidebar";
import { ChatWindow } from "../chat/ChatWindow";
import { SideNavbar } from "../navigation/SideNavbar";
import { BottomNavbar } from "../navigation/BottomNavbar";
import { AppHeader } from "./AppHeader";
import { useMobile } from "@/hooks/use-mobile";
import { useChatContext } from "@/context/ChatContext";

export function MessagingLayout() {
  const { isMobile, isTablet, isDesktop } = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile && !isTablet);
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const { user, conversations, activeConversationId } = useChatContext();
  
  // Calculate total unread messages from all conversations
  const unreadCount = conversations.reduce((total, conversation) => {
    return total + (conversation.unreadCount || 0);
  }, 0);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-[100dvh] flex flex-col max-w-full overflow-hidden">
      <AppHeader 
        showBackButton={isMobile && showChatOnMobile}
        onBackClick={() => setShowChatOnMobile(false)}
        title="Messages"
      />

      {/* Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden min-w-0">
        {/* Desktop Side Navigation */}
        {isDesktop && <SideNavbar />}

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Chat Content Area */}
          <div className={`flex-1 overflow-hidden relative ${
            isTablet ? 'grid grid-cols-3' : 'flex'
          }`}>


            {/* Tablet Layout - Grid columns */}
            {isTablet && (
              <>
                <div className="col-span-1 overflow-hidden">
                  <ChatSidebar isOpen={true} onClose={() => {}} layoutMode="tablet" />
                </div>
                <div className="col-span-2 overflow-hidden">
                  <ChatWindow />
                </div>
              </>
            )}

            {/* Desktop Layout */}
            {isDesktop && (
              <>
                <ChatSidebar isOpen={true} onClose={() => {}} layoutMode="desktop" />
                <div className="flex-1 min-w-0">
                  <ChatWindow />
                </div>
              </>
            )}



            {/* Main Content for mobile only - toggle between conversation list and chat */}
            {isMobile && (
              <div className="flex-1 min-w-0">
                {showChatOnMobile ? (
                  <ChatWindow />
                ) : (
                  <ChatSidebar 
                    isOpen={true} 
                    onClose={() => {}} 
                    layoutMode="mobile" 
                    onConversationSelect={() => setShowChatOnMobile(true)}
                  />
                )}
              </div>
            )}
          </div>

          {/* Bottom Navigation - only show on mobile/tablet */}
          {(isMobile || isTablet) && <BottomNavbar />}
        </div>
      </div>
    </div>
  );
}

export default MessagingLayout;
