import { MessageSquare, Baby, Bell, User } from "lucide-react";
import { Link, useLocation } from "wouter";
import { TOTAL_UNREAD_COUNT } from "@/lib/constants";

export function BottomNavbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", icon: Baby, label: "Kids" },
    { href: "/alerts", icon: Bell, label: "Alerts", hasNotification: TOTAL_UNREAD_COUNT > 0 },
    { href: "/messages", icon: MessageSquare, label: "Messages" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 py-2 px-4 lg:hidden z-20 relative w-full max-w-full">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          
          return (
            <div key={item.href} className="flex-1 text-center">
              <Link 
                href={item.href}
                className={`flex flex-col items-center p-2 rounded-md transition-colors ${
                  isActive 
                    ? "text-primary" 
                    : "text-gray-500 hover:text-primary"
                }`}
              >
                <div className="relative">
                  <Icon className="h-6 w-6" />
                  {item.hasNotification && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs font-semibold">
                      {TOTAL_UNREAD_COUNT > 9 ? '9+' : TOTAL_UNREAD_COUNT}
                    </div>
                  )}
                </div>
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </footer>
  );
}