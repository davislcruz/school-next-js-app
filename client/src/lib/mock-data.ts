import { User, Conversation, Message } from "@shared/schema";

// Mock users
export const mockUsers: User[] = [
  {
    id: 1,
    username: "john_smith",
    password: "password123", // In a real app, this would be hashed
    name: "John Smith",
    email: "john@example.com",
    profile_picture: null,
  },
  {
    id: 2,
    username: "alex_lee",
    password: "password123",
    name: "Alex Lee",
    email: "alex@example.com",
    profile_picture: null,
  },
  {
    id: 3,
    username: "emma_wilson",
    password: "password123",
    name: "Emma Wilson",
    email: "emma@example.com",
    profile_picture: null,
  },
  {
    id: 4,
    username: "sarah_miller",
    password: "password123",
    name: "Sarah Miller",
    email: "sarah@example.com",
    profile_picture: null,
  },
  {
    id: 5,
    username: "michael_davis",
    password: "password123",
    name: "Michael Davis",
    email: "michael@example.com",
    profile_picture: null,
  },
];

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: 1,
    title: "Tech Team",
    type: "group",
    members: [1, 2, 3],
    created_at: "2023-04-12T08:00:00Z",
    updated_at: "2023-04-12T08:00:00Z",
  },
  {
    id: 2,
    title: "Sarah Miller",
    type: "direct",
    members: [1, 4],
    created_at: "2023-04-10T10:30:00Z",
    updated_at: "2023-04-10T10:30:00Z",
  },
  {
    id: 3,
    title: "Marketing Project",
    type: "group",
    members: [1, 3, 4, 5],
    created_at: "2023-04-05T14:20:00Z",
    updated_at: "2023-04-05T14:20:00Z",
  },
  {
    id: 4,
    title: "Michael Davis",
    type: "direct",
    members: [1, 5],
    created_at: "2023-04-01T09:45:00Z",
    updated_at: "2023-04-01T09:45:00Z",
  },
  {
    id: 5,
    title: "Client Support",
    type: "group",
    members: [1, 2, 4],
    created_at: "2023-03-28T11:15:00Z",
    updated_at: "2023-03-28T11:15:00Z",
  },
];

// Generate a date from hours ago
const hoursAgo = (hours: number) => {
  const date = new Date();
  date.setHours(date.getHours() - hours);
  return date.toISOString();
};

// Mock messages
export const mockMessages: Message[] = [
  // Tech Team conversation
  {
    id: 1,
    conversation_id: 1,
    sender_id: 2,
    content: "Hey team, I've created a new design mockup for the chat interface. What do you think?",
    created_at: hoursAgo(3),
  },
  {
    id: 2,
    conversation_id: 1,
    sender_id: 2,
    content: "Let me know your thoughts on this!",
    created_at: hoursAgo(2.9),
  },
  {
    id: 3,
    conversation_id: 1,
    sender_id: 3,
    content: "Looks great! I like the color palette and the overall layout. Very clean and intuitive.",
    created_at: hoursAgo(2.7),
  },
  {
    id: 4,
    conversation_id: 1,
    sender_id: 1,
    content: "I agree! The design is looking good. What about the mobile responsiveness?",
    created_at: hoursAgo(2.5),
  },
  {
    id: 5,
    conversation_id: 1,
    sender_id: 2,
    content: "It's fully responsive! I've tested it on various screen sizes. The sidebar collapses into a drawer on mobile.",
    created_at: hoursAgo(2.3),
  },
  {
    id: 6,
    conversation_id: 1,
    sender_id: 1,
    content: "Perfect! Let's implement it then. I'll start working on the front-end part.",
    created_at: hoursAgo(2),
  },
  {
    id: 7,
    conversation_id: 1,
    sender_id: 3,
    content: "Great! I'll help with the integration part. We should use React hooks for state management and Tailwind CSS for styling.",
    created_at: hoursAgo(1.8),
  },
  {
    id: 8,
    conversation_id: 1,
    sender_id: 2,
    content: "Also, don't forget about the real-time functionality. We'll need to integrate with Ably for that.",
    created_at: hoursAgo(1.5),
  },
  {
    id: 9,
    conversation_id: 1,
    sender_id: 1,
    content: "Let's discuss the new feature implementation during our next meeting. I want to make sure we're all on the same page.",
    created_at: hoursAgo(1),
  },
  
  // Sarah Miller conversation
  {
    id: 10,
    conversation_id: 2,
    sender_id: 4,
    content: "Hi John, did you review the designs I sent?",
    created_at: hoursAgo(24),
  },
  {
    id: 11,
    conversation_id: 2,
    sender_id: 1,
    content: "Yes, they look great! I have a few minor suggestions though.",
    created_at: hoursAgo(23),
  },
  {
    id: 12,
    conversation_id: 2,
    sender_id: 4,
    content: "What are your suggestions?",
    created_at: hoursAgo(22),
  },
  
  // Marketing Project conversation
  {
    id: 13,
    conversation_id: 3,
    sender_id: 5,
    content: "The campaign is scheduled for next month. We need to finalize the materials by next week.",
    created_at: hoursAgo(72),
  },
  {
    id: 14,
    conversation_id: 3,
    sender_id: 1,
    content: "I'll have the copy ready by Friday.",
    created_at: hoursAgo(70),
  },
  
  // Michael Davis conversation
  {
    id: 15,
    conversation_id: 4,
    sender_id: 5,
    content: "Hey, are you available for a call tomorrow?",
    created_at: hoursAgo(120),
  },
  {
    id: 16,
    conversation_id: 4,
    sender_id: 1,
    content: "Sure, what time works for you?",
    created_at: hoursAgo(119),
  },
  
  // Client Support conversation
  {
    id: 17,
    conversation_id: 5,
    sender_id: 4,
    content: "The client requested additional information about the project timeline.",
    created_at: hoursAgo(168),
  },
  {
    id: 18,
    conversation_id: 5,
    sender_id: 2,
    content: "I'll prepare a detailed timeline document and send it over.",
    created_at: hoursAgo(167),
  },
  {
    id: 19,
    conversation_id: 5,
    sender_id: 1,
    content: "Thanks Alex. Let me know if you need any input from my side.",
    created_at: hoursAgo(166),
  },
];
