import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  User, 
  Conversation, 
  Message, 
  ConversationWithLastMessage, 
  MessageWithSender 
} from "@shared/schema";
import { mockUsers, mockConversations, mockMessages } from "@/lib/mock-data";
import { format } from "date-fns";

interface ChatContextValue {
  user: User | null;
  users: User[];
  conversations: ConversationWithLastMessage[];
  messages: MessageWithSender[];
  activeConversationId: number | null;
  activeConversation: ConversationWithLastMessage | null;
  typing: number | null;
  totalUnreadCount: number; // Add total unread count for headers
  setActiveConversationId: (id: number) => void;
  sendMessage: (content: string) => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [rawConversations, setRawConversations] = useState<Conversation[]>([]);
  const [rawMessages, setRawMessages] = useState<Message[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [typing, setTyping] = useState<number | null>(null);

  // Load mock data on mount
  useEffect(() => {
    // Set current user (first user in the mock data)
    setUser(mockUsers[0]);
    setUsers(mockUsers);
    setRawConversations(mockConversations);
    setRawMessages(mockMessages);
    
    // If no active conversation, set the first one as active
    if (mockConversations.length > 0) {
      setActiveConversationId(mockConversations[0].id);
    }
  }, []);

  // Process messages for current conversation
  const messages = rawMessages.filter(
    (message) => message.conversation_id === activeConversationId
  );

  // Show typing indicator occasionally
  useEffect(() => {
    if (activeConversationId && users.length > 1) {
      const typingInterval = setInterval(() => {
        // Randomly decide if someone is typing
        if (Math.random() > 0.7) {
          // Pick a random user that is not the current user
          const otherUsers = users.filter(u => u.id !== user?.id);
          const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
          setTyping(randomUser.id);
          
          // Clear typing after a short delay
          setTimeout(() => {
            setTyping(null);
          }, 3000);
        } else {
          setTyping(null);
        }
      }, 10000);
      
      return () => clearInterval(typingInterval);
    }
  }, [activeConversationId, users, user]);

  // Process conversations with last message info
  const conversations: ConversationWithLastMessage[] = rawConversations.map((conversation) => {
    // Find all messages for this conversation
    const conversationMessages = rawMessages.filter(
      (msg) => msg.conversation_id === conversation.id
    );
    
    // Sort by created_at to get the latest message
    const sortedMessages = [...conversationMessages].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    
    const lastMessage = sortedMessages[0];
    
    // Set fixed unread count for conversations (for consistent notification display)
    let unreadCount = 0;
    if (conversation.id === 2) unreadCount = 2;  // Sarah Miller - 2 unread
    if (conversation.id === 3) unreadCount = 1;  // Marketing Project - 1 unread
    if (conversation.id === 5) unreadCount = 1;  // Client Support - 1 unread
    
    return {
      ...conversation,
      lastMessage: lastMessage?.content || "No messages yet",
      lastMessageTime: lastMessage 
        ? format(new Date(lastMessage.created_at), 
            isToday(new Date(lastMessage.created_at)) 
              ? "h:mm a" 
              : "MM/dd/yyyy")
        : "",
      unreadCount: conversation.id === activeConversationId ? 0 : unreadCount,
    };
  });

  // Find active conversation
  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId
  ) || null;
  
  // Calculate total unread count for headers - use fixed value to keep it consistent
  const totalUnreadCount = 16; // This value will be shown in all headers
  
  // Send a new message
  const sendMessage = (content: string) => {
    if (!activeConversationId || !user) return;
    
    const newMessage: Message = {
      id: Date.now(),
      conversation_id: activeConversationId,
      sender_id: user.id,
      content,
      created_at: new Date().toISOString(), // This is actually a string in our schema
    };
    
    setRawMessages((prev) => [...prev, newMessage]);
  };

  return (
    <ChatContext.Provider
      value={{
        user,
        users,
        conversations,
        messages,
        activeConversationId,
        activeConversation,
        typing,
        totalUnreadCount,
        setActiveConversationId,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}

// Helper function to check if a date is today
function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
