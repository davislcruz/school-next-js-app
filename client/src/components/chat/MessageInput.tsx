import { useState, useRef, useEffect } from "react";
import { Paperclip, Smile } from "lucide-react";
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
          className="bg-primary-500 hover:bg-primary-600 text-white rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors shadow-md border-2 border-primary-300 flex items-center justify-center"
          aria-label="Send message"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            className="text-white"
          >
            <path 
              d="M22 2L11 13" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M22 2L15 22L11 13L2 9L22 2Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
