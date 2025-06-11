"use client";

import { MessageSquare, Newspaper, Baby, Calendar } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useChatContext } from "@/context/ChatContext";
import { TOTAL_UNREAD_COUNT } from "@/lib/constants";
import AvatarWithInitials from "@/components/ui/avatar-with-initials";

export function SideNavbar() {
  const pathname = usePathname();
  const { user } = useChatContext();

  const navItems = [
    { href: "/", icon: Newspaper, label: "Newsfeed" },
    { href: "/events", icon: Calendar, label: "Events" },
    { href: "/messages", icon: MessageSquare, label: "Messages", hasNotification: true },
    { href: "/children", icon: Baby, label: "Children" },
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200 h-full">
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-gray-700 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5 mr-3" />
                {item.hasNotification && (
                  <div className="absolute -top-1 right-2 bg-red-500 rounded-full h-2 w-2"></div>
                )}
              </div>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}