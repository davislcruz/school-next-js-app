import { useState } from "react";
import { Search } from "lucide-react";
import { useLocation } from "wouter";
import { useChatContext } from "@/context/ChatContext";
import ConversationItem from "./ConversationItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  layoutMode?: 'mobile' | 'tablet' | 'desktop';
  onConversationSelect?: () => void;
}

export function ChatSidebar({ isOpen, onClose, layoutMode = 'mobile', onConversationSelect }: ChatSidebarProps) {
  const { conversations, activeConversationId, setActiveConversationId } = useChatContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredConversations = conversations.filter((conversation) =>
    conversation.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationClick = (id: number) => {
    setActiveConversationId(id);
    if (layoutMode === 'mobile' && onConversationSelect) {
      // Trigger mobile chat view
      onConversationSelect();
    }
    onClose(); // Close sidebar on mobile after selection
  };

  const getLayoutClasses = () => {
    if (layoutMode === 'tablet') {
      return 'bg-white h-full w-full flex flex-col border-r border-gray-200 overflow-hidden';
    }
    if (layoutMode === 'desktop') {
      return 'bg-white w-80 border-r border-gray-200 flex flex-col relative h-full flex-shrink-0';
    }
    // Mobile layout - fullscreen
    return 'bg-white w-full h-full flex flex-col overflow-hidden';
  };

  return (
    <div className={getLayoutClasses()}>
      <div className="p-4 border-b border-gray-200">
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

      <div className="px-4 py-[17px] border-t border-gray-200 flex items-center">
        <Button className="w-full h-12 text-sm">
          <PlusIcon className="h-5 w-5 mr-2" />
          New Conversation
        </Button>
      </div>
    </div>
  );
}

export default ChatSidebar;
