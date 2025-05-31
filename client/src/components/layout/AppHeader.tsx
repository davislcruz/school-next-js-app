import { Bell, ChevronDown, ArrowLeft } from "lucide-react";
import { useChatContext } from "@/context/ChatContext";
import { TOTAL_UNREAD_COUNT } from "@/lib/constants";

interface AppHeaderProps {
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export function AppHeader({ showBackButton = false, onBackClick }: AppHeaderProps) {
  const { user } = useChatContext();

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center shadow-sm z-20 relative">
      <div className="flex items-center">
        {showBackButton ? (
          <button
            onClick={onBackClick}
            className="p-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 mr-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold mr-2">
              {user?.name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U'}
            </div>
            <ChevronDown className="h-4 w-4 text-gray-600 mr-2" />
            <div className="relative mr-2">
              <button className="p-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <Bell className="h-5 w-5" />
              </button>
              {TOTAL_UNREAD_COUNT > 0 && (
                <div className="absolute top-0 right-0 bg-red-500 rounded-full h-2.5 w-2.5 ring-2 ring-white"></div>
              )}
            </div>
          </>
        )}
      </div>
      <div className="flex-1 flex justify-center">
        <div className="font-semibold text-lg ml-2 md:ml-2 lg:ml-60">Messenger</div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200">
          UPGRADE
        </button>
      </div>
    </header>
  );
}