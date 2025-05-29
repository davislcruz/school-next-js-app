import { useState } from "react";
import { Search } from "lucide-react";
import { useChatContext } from "@/context/ChatContext";
import ConversationItem from "./ConversationItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  layoutMode?: 'mobile' | 'tablet' | 'desktop';
}

export function ChatSidebar({ isOpen, onClose, layoutMode = 'mobile' }: ChatSidebarProps) {
  const { conversations, activeConversationId, setActiveConversationId } = useChatContext();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredConversations = conversations.filter((conversation) =>
    conversation.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationClick = (id: number) => {
    setActiveConversationId(id);
    onClose(); // Close sidebar on mobile after selection
  };

  const getLayoutClasses = () => {
    if (layoutMode === 'tablet') {
      return 'bg-white w-full h-full flex flex-col relative border-r border-gray-200';
    }
    if (layoutMode === 'desktop') {
      return 'bg-white w-80 border-r border-gray-200 flex flex-col relative h-full';
    }
    // Mobile layout (default)
    return `bg-white w-80 border-r border-gray-200 flex flex-col transform ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-300 ease-in-out fixed top-0 bottom-0 left-0 z-50 h-full pb-16`;
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

      <div className="p-4 border-t border-gray-200">
        <Button className="w-full" size="sm">
          <PlusIcon className="h-5 w-5 mr-2" />
          New Conversation
        </Button>
      </div>
    </div>
  );
}

export default ChatSidebar;
