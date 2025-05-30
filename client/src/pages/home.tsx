import { useState } from "react";
import { Bell, ArrowLeft, ChevronRight, ChevronDown, Heart, MessageCircle } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { useChatContext } from "@/context/ChatContext";
import { BottomNavbar } from "@/components/navigation/BottomNavbar";
import { SideNavbar } from "@/components/navigation/SideNavbar";
import { Card, CardContent } from "@/components/ui/card";
import { TOTAL_UNREAD_COUNT } from "@/lib/constants";

// Mock data for the home page
const mockEvent = {
  date: "DECEMBER 15, 2024",
  title: "Winter Festival",
  time: "2:00 PM - 6:00 PM"
};

const stories = [
  {
    id: 1,
    user: "Sarah Johnson",
    initials: "SJ",
    avatarGradient: "from-purple-400 to-pink-400",
    location: "Central Park",
    timeAgo: "2h ago",
    content: "Amazing day at the park with the kids! The weather was perfect for our picnic.",
    hasImage: true,
    likes: 24,
    liked: true,
    comments: 8
  },
  {
    id: 2,
    user: "Mike Chen",
    initials: "MC",
    avatarGradient: "from-blue-400 to-green-400",
    location: "Downtown",
    timeAgo: "4h ago",
    content: "Just finished the community cleanup project. So proud of our neighborhood coming together!",
    hasImage: false,
    likes: 18,
    liked: false,
    comments: 5
  }
];

export default function Home() {
  const { isMobile, isTablet, isDesktop } = useMobile();
  const { user } = useChatContext();
  const [selectedTab, setSelectedTab] = useState<'thisYear' | 'memories'>('thisYear');
  const [activeNavTab, setActiveNavTab] = useState<string>('story');
  const [storiesState, setStoriesState] = useState(stories);

  const handleViewAllEvents = () => {
    // Navigate to events page
    console.log("View all events clicked");
  };

  const handleLikeStory = (storyId: number) => {
    setStoriesState(prev => 
      prev.map(story => 
        story.id === storyId 
          ? { 
              ...story, 
              liked: !story.liked,
              likes: story.liked ? story.likes - 1 : story.likes + 1
            }
          : story
      )
    );
  };

  return (
    <div className="h-[100dvh] flex flex-col">
      {/* Header - same as MessagingLayout */}
      <header className="bg-white border-b border-gray-200 py-2 px-4 flex items-center justify-between shadow-sm z-20 relative">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold mr-2">
            {user?.name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U'}
          </div>
          <ChevronDown className="h-4 w-4 text-gray-600 mr-2" />
        </div>
        <div className="font-semibold text-lg">Messenger</div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <Bell className="h-5 w-5" />
            </button>
            {TOTAL_UNREAD_COUNT > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-semibold">
                {TOTAL_UNREAD_COUNT > 99 ? '99' : TOTAL_UNREAD_COUNT > 9 ? '9' : TOTAL_UNREAD_COUNT}
              </div>
            )}
          </div>
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200">
            UPGRADE
          </button>
        </div>
      </header>



      {/* Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Side Navigation */}
        {isDesktop && <SideNavbar />}

        {/* Main Content Area */}
        <div className="flex flex-col flex-1">
          {/* Main Content */}
          <div className="flex-1 bg-white overflow-y-auto">
            {/* Tab Navigation */}
            <div className="border-b border-gray-100 px-4 md:px-8 lg:px-8">
              <div className="grid grid-cols-2 max-w-7xl mx-auto">
                <button
                  onClick={() => setSelectedTab('thisYear')}
                  className={`py-3 font-semibold transition-colors text-sm md:text-base lg:text-base ${
                    selectedTab === 'thisYear'
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  This year
                </button>
                <button
                  onClick={() => setSelectedTab('memories')}
                  className={`py-3 font-semibold transition-colors text-sm md:text-base lg:text-base ${
                    selectedTab === 'memories'
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Memories
                </button>
              </div>
            </div>
            <div className="max-w-4xl mx-auto p-4">
              <div className="lg:col-span-8 lg:col-start-3 space-y-6">
                {/* Next Event Section */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg md:text-xl lg:text-xl font-bold text-gray-800">Next Event</h2>
                    <button
                      onClick={handleViewAllEvents}
                      className="text-purple-500 text-sm md:text-base lg:text-base font-semibold flex items-center hover:text-purple-600 transition-colors"
                    >
                      View all
                      <ChevronRight className="ml-1 w-3 h-3 md:w-4 md:h-4 lg:w-4 lg:h-4" />
                    </button>
                  </div>
                  
                  <Card className="rounded-2xl shadow-md border border-gray-100">
                    <CardContent className="p-4 md:p-5 lg:p-6">
                      <div className="text-xs md:text-sm lg:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        {mockEvent.date}
                      </div>
                      <h3 className="text-lg md:text-xl lg:text-xl font-bold text-gray-800 mb-1">
                        {mockEvent.title}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base lg:text-base">
                        {mockEvent.time}
                      </p>
                    </CardContent>
                  </Card>
                </section>

                {/* Stories Section */}
                <section>
                  <h2 className="text-lg md:text-xl lg:text-xl font-bold text-gray-800 mb-4">Stories</h2>
                  
                  <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-1 lg:space-y-4">
                    {storiesState.map((story) => (
                      <Card key={story.id} className="rounded-2xl shadow-md border border-gray-100">
                        <CardContent className="p-4 md:p-5 lg:p-6">
                          {/* Story Header */}
                          <div className="flex items-start space-x-3 mb-3">
                            <div className={`w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-gradient-to-br ${story.avatarGradient} rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base lg:text-base flex-shrink-0`}>
                              {story.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-800 text-sm md:text-base lg:text-base">{story.user}</h4>
                              <p className="text-xs md:text-sm lg:text-sm text-gray-500">
                                {story.location} • {story.timeAgo}
                              </p>
                            </div>
                          </div>
                          
                          {/* Story Content */}
                          {story.content && (
                            <div className="mb-4">
                              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base lg:text-base">
                                {story.content}
                              </p>
                            </div>
                          )}
                          
                          {/* Story Image Content */}
                          {story.hasImage && (
                            <div className="mb-4 rounded-xl overflow-hidden">
                              {/* Colorful celebration background with confetti */}
                              <div className="h-48 md:h-56 lg:h-64 bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-300 relative flex items-center justify-center">
                                {/* Confetti elements */}
                                <div className="absolute inset-0 overflow-hidden">
                                  <div className="absolute top-4 left-8 w-2 h-2 bg-red-400 rounded transform rotate-45"></div>
                                  <div className="absolute top-12 right-12 w-2 h-2 bg-blue-400 rounded"></div>
                                  <div className="absolute top-8 right-6 w-1 h-4 bg-green-400 rounded"></div>
                                  <div className="absolute bottom-12 left-12 w-2 h-2 bg-yellow-400 rounded transform rotate-45"></div>
                                  <div className="absolute bottom-8 right-16 w-2 h-2 bg-pink-400 rounded"></div>
                                  <div className="absolute top-16 left-1/3 w-1 h-3 bg-purple-400 rounded"></div>
                                  <div className="absolute bottom-16 right-1/4 w-2 h-2 bg-orange-400 rounded"></div>
                                </div>
                                <div className="text-4xl md:text-5xl lg:text-5xl">🎉</div>
                              </div>
                            </div>
                          )}
                          
                          {/* Story Actions */}
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleLikeStory(story.id)}
                              className={`flex items-center space-x-2 transition-colors ${
                                story.liked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'
                              }`}
                            >
                              <Heart className={`w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 ${story.liked ? 'fill-current' : ''}`} />
                              <span className="font-semibold text-sm md:text-base lg:text-base">{story.likes} likes</span>
                            </button>
                            <button
                              className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <MessageCircle className="w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6" />
                              <span className="font-semibold text-sm md:text-base lg:text-base">{story.comments} comments</span>
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Bottom Navigation - only show on mobile/tablet */}
          {(isMobile || isTablet) && <BottomNavbar />}
        </div>
      </div>
    </div>
  );
}
