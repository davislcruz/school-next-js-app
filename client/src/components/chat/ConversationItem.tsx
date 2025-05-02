import { ConversationWithLastMessage } from "@shared/schema";
import AvatarWithInitials from "../ui/avatar-with-initials";

interface ConversationItemProps {
  conversation: ConversationWithLastMessage;
  isActive: boolean;
  onClick: () => void;
}

export function ConversationItem({ conversation, isActive, onClick }: ConversationItemProps) {
  const bgColor = isActive ? "bg-gray-100" : "";

  return (
    <div
      onClick={onClick}
      className={`p-4 flex items-center hover:bg-gray-100 cursor-pointer border-b border-gray-100 transition-colors ${bgColor}`}
    >
      <AvatarWithInitials
        name={conversation.title}
        size="ms"
        className="mr-3"
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold truncate">{conversation.title}</h3>
          <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
          {conversation.unreadCount && conversation.unreadCount > 0 ? (
            <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-medium">
              {conversation.unreadCount}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ConversationItem;
