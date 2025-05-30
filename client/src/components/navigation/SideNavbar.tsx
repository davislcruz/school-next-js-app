import { MessageSquare, Home, Bell, User, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useChatContext } from "@/context/ChatContext";
import { TOTAL_UNREAD_COUNT } from "@/lib/constants";
import AvatarWithInitials from "@/components/ui/avatar-with-initials";

export function SideNavbar() {
  const [location] = useLocation();
  const { user } = useChatContext();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/messages", icon: MessageSquare, label: "Messages", hasNotification: true },
    { href: "/alerts", icon: Bell, label: "Alerts", hasNotification: TOTAL_UNREAD_COUNT > 0 },
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200 h-full">
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          
          return (
            <Link key={item.href} href={item.href}>
              <a
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="relative">
                  <Icon className="h-5 w-5 mr-3" />
                  {item.hasNotification && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-3 w-3 flex items-center justify-center text-xs font-semibold">
                      {item.href === "/alerts" && TOTAL_UNREAD_COUNT > 9 ? "9+" : ""}
                    </div>
                  )}
                </div>
                {item.label}
              </a>
            </Link>
          );
        })}
      </nav>
      
      <div className="border-t border-gray-200 px-4 py-[17px] flex items-center">
        <AvatarWithInitials
          name={user?.name || 'User'}
          size="md"
          className="w-12 h-12 !bg-blue-600"
        />
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