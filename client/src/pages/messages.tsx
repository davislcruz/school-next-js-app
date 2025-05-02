import { ChatWindow } from "@/components/chat/ChatWindow";
import { useState, useEffect, useRef } from "react";
import { useMobile } from "@/hooks/use-mobile";
import { useChatContext } from "@/context/ChatContext";
import { Home, User, Bell, MessageSquare, Search, PlusIcon, Phone, Video, MoreVertical } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ConversationItem from "@/components/chat/ConversationItem";
import AvatarWithInitials from "@/components/ui/avatar-with-initials";
import { MessageInput } from "@/components/chat/MessageInput";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { TOTAL_UNREAD_COUNT } from "@/lib/constants";

export default function Messages() {
  const { isMobile } = useMobile();
  const [, setLocation] = useLocation();
  const { 
    user, 
    conversations, 
    activeConversationId, 
    setActiveConversationId,
    messages
  } = useChatContext();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(true);
  const [isTabletView, setIsTabletView] = useState(false);
  
  // Create a ref for the message container to auto-scroll to bottom
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Define our breakpoints
  // Mobile: < 540px (smaller than Surface Duo)
  // Tablet: >= 540px and < 768px (Surface Duo size)
  // Desktop: >= 768px
  useEffect(() => {
    const checkScreenWidth = () => {
      const width = window.innerWidth;
      setIsMobileView(width < 540);
      setIsTabletView(width >= 540 && width < 768);
    };
    
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);
  
  // Calculate total unread messages from all conversations
  const unreadCount = conversations.reduce((total, conversation) => {
    return total + (conversation.unreadCount || 0);
  }, 0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredConversations = conversations.filter((conversation) =>
    conversation.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationClick = (id: number) => {
    setActiveConversationId(id);
    if (isMobileView) {
      setLocation("/conversation");
    }
  };

  // Find active conversation
  const activeConversation = conversations.find(c => c.id === activeConversationId);
  
  // Auto-scroll to bottom of messages when messages change
  useEffect(() => {
    if (messagesEndRef.current && messages.length > 0) {
      // Use a setTimeout to delay scrolling slightly
      const timer = setTimeout(() => {
        const container = messagesEndRef.current?.parentElement;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [messages]);

  return (
    <div className="h-[100dvh] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-2 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <div className="font-semibold text-lg">Messages</div>
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
        {/* Conversations List */}
        <div className={`bg-white border-r border-gray-200 ${
          isMobileView 
            ? 'w-full z-30' 
            : isTabletView 
              ? 'w-2/5 max-w-[200px]' 
              : 'w-1/3 min-w-[280px]'
        } flex flex-col h-[calc(100dvh-57px)] ${isMobileView ? 'pb-[60px]' : 'pb-0'}`}>
          <div className="p-4 border-b border-gray-200 bg-white relative z-30">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search conversations"
                className="pl-10"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isActive={activeConversationId === conversation.id}
                onClick={() => handleConversationClick(conversation.id)}
              />
            ))}
            {filteredConversations.length === 0 && (
              <div className="p-4 text-center text-gray-500">No conversations found</div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0 z-30">
            <Button className="w-full" size="sm">
              <PlusIcon className="h-5 w-5 mr-2" />
              New Conversation
            </Button>
          </div>
        </div>

        {/* Conversation Detail (Only visible on larger screens) */}
        {!isMobileView && activeConversation && (
          <div className="flex-1 flex flex-col h-[calc(100dvh-57px)]">
            {/* Conversation Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <AvatarWithInitials name={activeConversation.title} size="md" />
                <div className="ml-3">
                  <div className="font-medium text-gray-900">{activeConversation.title}</div>
                  {activeConversation.participants && (
                    <div className="text-xs text-gray-500">
                      {activeConversation.participants.length} members
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Phone className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Video className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 pb-[80px]">
              {messages.map((message) => (
                <MessageBubble 
                  key={message.id} 
                  message={message} 
                  sender={message.sender_id === user?.id ? user : message.sender}
                />
              ))}
              {/* Invisible element for auto-scrolling to bottom */}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input - removed container to use the one in MessageInput component */}
            <MessageInput />
          </div>
        )}

        {/* Empty State when no conversation is selected */}
        {!isMobileView && !activeConversation && (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center p-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No conversation selected</h3>
              <p className="text-gray-500">Choose a conversation from the list to start chatting</p>
            </div>
          </div>
        )}
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