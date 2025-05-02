import { useEffect, useRef } from "react";
import { Phone, Video, MoreVertical } from "lucide-react";
import { useChatContext } from "@/context/ChatContext";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import AvatarWithInitials from "../ui/avatar-with-initials";
import { useMobile } from "@/hooks/use-mobile";

export function ChatWindow() {
  const { 
    activeConversation, 
    messages, 
    users,
    typing
  } = useChatContext();
  const { isMobile } = useMobile();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <p className="mb-2">Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  // Group messages by date
  const messageGroups: { [key: string]: typeof messages } = {};
  messages.forEach(message => {
    const date = new Date(message.created_at).toLocaleDateString();
    if (!messageGroups[date]) {
      messageGroups[date] = [];
    }
    messageGroups[date].push(message);
  });

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center">
        <div className="flex items-center flex-1">
          <AvatarWithInitials
            name={activeConversation.title}
            size="md"
            className="bg-primary-400 mr-3"
          />
          <div>
            <h2 className="font-semibold">{activeConversation.title}</h2>
            <div className="flex items-center text-xs text-gray-500">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              <span>
                {activeConversation.type === "group"
                  ? `${activeConversation.members.length} members`
                  : "Online"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <Phone className="h-5 w-5 text-gray-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <Video className="h-5 w-5 text-gray-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <MoreVertical className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-1 p-4 pb-[80px] overflow-y-auto bg-gray-50 scrollbar-hide">
        {Object.entries(messageGroups).map(([date, dateMessages]) => (
          <div key={date}>
            {/* Date separator */}
            <div className="flex items-center justify-center my-4">
              <div className="bg-gray-200 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                {date === new Date().toLocaleDateString() ? "Today" : date}
              </div>
            </div>

            {/* Messages for this date */}
            {dateMessages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                sender={users.find(u => u.id === message.sender_id)}
              />
            ))}
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="flex items-start mb-4">
            <AvatarWithInitials
              name={users.find(u => u.id === typing)?.name || ""}
              size="sm"
              className="mr-2 mt-1"
            />
            <div className="message-bubble receiver-bubble py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message input - using MessageInput component with built-in mobile padding */}
      <MessageInput />
    </div>
  );
}

export default ChatWindow;
