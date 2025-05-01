import { useState, useRef, useEffect } from "react";
import { Paperclip, Smile, Send } from "lucide-react";
import { useChatContext } from "@/context/ChatContext";

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
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-end">
        <div className="flex-1 mr-3">
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
          className="bg-primary-500 hover:bg-primary-600 text-white rounded-full py-3 px-5 md:px-6 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors flex items-center justify-center shadow-lg transform hover:scale-105 active:scale-95 pulse-button"
          aria-label="Send message"
        >
          <Send className="h-7 w-7" />
          <span className="ml-2 font-medium hidden sm:inline">Send</span>
        </button>
      </div>
      {/* Send button tooltip for mobile */}
      <div className="mt-1 text-center md:hidden">
        <span className="text-xs text-gray-500">Tap the blue button to send</span>
      </div>
    </div>
  );
}

export default MessageInput;
