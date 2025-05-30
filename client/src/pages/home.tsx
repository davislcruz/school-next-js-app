import { useState } from "react";
import { Bell, ArrowLeft } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { useChatContext } from "@/context/ChatContext";
import { BottomNavbar } from "@/components/navigation/BottomNavbar";
import { TOTAL_UNREAD_COUNT } from "@/lib/constants";

export default function Home() {
  const { isMobile, isTablet, isDesktop } = useMobile();
  const { user } = useChatContext();

  return (
    <div className="h-[100dvh] flex flex-col">
      {/* Header - same as MessagingLayout */}
      <header className="bg-white border-b border-gray-200 py-2 px-4 flex items-center justify-between shadow-sm z-20 relative">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold mr-4">
            {user?.name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U'}
          </div>
        </div>
        <div className="font-semibold text-lg">Messenger</div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <Bell className="h-5 w-5" />
            </button>
            {TOTAL_UNREAD_COUNT > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-semibold">
                {TOTAL_UNREAD_COUNT > 99 ? '99' : TOTAL_UNREAD_COUNT > 9 ? '9' : TOTAL_UNREAD_COUNT}
              </div>
            )}
          </div>
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200">
            UPGRADE
          </button>
        </div>
      </header>

      {/* Blank content area */}
      <div className="flex-1 bg-gray-50">
        {/* Intentionally blank */}
      </div>

      {/* Bottom Navigation - only show on mobile/tablet */}
      {(isMobile || isTablet) && <BottomNavbar />}
    </div>
  );
}
