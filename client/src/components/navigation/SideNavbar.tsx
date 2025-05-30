import { MessageSquare, Newspaper, Baby, Calendar, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useChatContext } from "@/context/ChatContext";
import { TOTAL_UNREAD_COUNT } from "@/lib/constants";
import AvatarWithInitials from "@/components/ui/avatar-with-initials";

export function SideNavbar() {
  const [location] = useLocation();
  const { user } = useChatContext();

  const navItems = [
    { href: "/", icon: Newspaper, label: "Story" },
    { href: "/profile", icon: Calendar, label: "Events" },
    { href: "/messages", icon: MessageSquare, label: "Messages", hasNotification: true },
    { href: "/alerts", icon: Baby, label: "Children", hasNotification: TOTAL_UNREAD_COUNT > 0 },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200 h-full">
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5 mr-3" />
                {item.hasNotification && (
                  <div className="absolute -top-1 -right-1 bg-red-500 rounded-full h-2 w-2"></div>
                )}
              </div>
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="border-t border-gray-200 px-4 py-[17px] flex items-center">
        <div 
          className="sidebar-avatar"
          style={{ 
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '600',
            position: 'relative',
            zIndex: 50
          }}
        >
          {user?.name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U'}
        </div>
        <div className="ml-3">
          <div className="text-sm font-medium text-gray-900">
            {user?.name || 'User'}
          </div>
          <div className="text-xs text-gray-500">Online</div>
        </div>
      </div>
    </aside>
  );
}