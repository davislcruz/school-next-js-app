import { useState, useRef, useEffect } from "react";
import { Paperclip, Smile } from "lucide-react";
import { useChatContext } from "@/context/ChatContext";
import { FaPaperPlane } from "react-icons/fa";

export function MessageInput() {
  const [message, setMessage] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage } = useChatContext();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = scrollHeight <= 150 ? scrollHeight + "px" : "150px";
      setTextareaHeight(newHeight);
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
      setTextareaHeight("auto");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4 mb-0 sticky bottom-0 z-20">
      <div className="flex items-end">
        <div className="flex-1 mr-2">
          <div className="relative bg-gray-100 rounded-lg">
            <textarea
              ref={textareaRef}
              style={{ height: textareaHeight, maxHeight: "150px" }}
              className="w-full bg-transparent border-0 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg resize-none scrollbar-hide"
              placeholder="Type a message..."
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute right-2 bottom-2 flex space-x-1">
              <button className="p-1 rounded-full hover:bg-gray-200 focus:outline-none">
                <Paperclip className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-1 rounded-full hover:bg-gray-200 focus:outline-none">
                <Smile className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-primary text-white rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors shadow-md border-2 border-primary-300 flex items-center justify-center"
          aria-label="Send message"
        >
          <FaPaperPlane size={22} className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
