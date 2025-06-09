import { useChatContext } from "@/context/ChatContext";
import { MessageWithSender, User } from "@shared/schema";
import AvatarWithInitials from "../ui/avatar-with-initials";
import { format } from "date-fns";

interface MessageBubbleProps {
  message: MessageWithSender;
  sender?: User;
}

export function MessageBubble({ message, sender }: MessageBubbleProps) {
  const { user } = useChatContext();
  const isSelf = message.sender_id === user?.id;
  const time = format(new Date(message.created_at), "h:mm a");

  if (isSelf) {
    return (
      <div className="flex justify-end mb-4">
        <div>
          <div className="flex items-center justify-end mb-1">
            <span className="text-xs text-gray-500">{time}</span>
          </div>
          <div className="message-bubble sender-bubble">{message.content}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start mb-4">
      <AvatarWithInitials
        name={sender?.name || "Unknown"}
        size="sm"
        className="mr-2 mt-1"
      />
      <div>
        <div className="flex items-center mb-1">
          <span className="text-xs font-semibold text-gray-900 mr-2">
            {sender?.name || "Unknown"}
          </span>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <div className="message-bubble receiver-bubble bg-purple-500">
          {message.content}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
