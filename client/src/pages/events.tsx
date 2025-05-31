import { useState } from "react";
import { Calendar, MapPin, Clock, Users, ChevronRight } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { BottomNavbar } from "@/components/navigation/BottomNavbar";
import { SideNavbar } from "@/components/navigation/SideNavbar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/card";

// Event data
const academicEvents = [
  {
    id: 1,
    title: "Science Fair 2025",
    date: "February 15, 2025",
    time: "9:00 AM - 3:00 PM",
    location: "School Auditorium",
    attendees: 85,
    description: "Annual science fair showcasing student projects and innovative experiments.",
    category: "Academic"
  },
  {
    id: 2,
    title: "Math Olympics",
    date: "February 22, 2025",
    time: "10:00 AM - 2:00 PM",
    location: "Mathematics Building",
    attendees: 45,
    description: "Competitive mathematics competition for students of all grade levels.",
    category: "Academic"
  },
  {
    id: 3,
    title: "Reading Championship",
    date: "March 5, 2025",
    time: "1:00 PM - 4:00 PM",
    location: "Library",
    attendees: 32,
    description: "Reading comprehension and presentation competition with exciting prizes.",
    category: "Academic"
  },
  {
    id: 4,
    title: "History Project Exhibition",
    date: "March 12, 2025",
    time: "11:00 AM - 3:00 PM",
    location: "History Hall",
    attendees: 28,
    description: "Students present their historical research projects and timelines.",
    category: "Academic"
  }
];

const activityEvents = [
  {
    id: 5,
    title: "Winter Festival",
    date: "December 15, 2024",
    time: "2:00 PM - 6:00 PM",
    location: "Community Center",
    attendees: 45,
    description: "Join us for a magical winter celebration with activities for the whole family.",
    category: "Activity"
  },
  {
    id: 6,
    title: "Holiday Craft Workshop",
    date: "December 18, 2024",
    time: "10:00 AM - 12:00 PM",
    location: "Art Studio",
    attendees: 12,
    description: "Create beautiful holiday decorations and gifts in this hands-on workshop.",
    category: "Activity"
  },
  {
    id: 7,
    title: "New Year's Family Party",
    date: "December 31, 2024",
    time: "7:00 PM - 11:00 PM",
    location: "Main Hall",
    attendees: 78,
    description: "Ring in the new year with games, music, and celebration for all ages.",
    category: "Activity"
  },
  {
    id: 8,
    title: "Winter Sports Day",
    date: "January 5, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Sports Complex",
    attendees: 32,
    description: "Indoor sports activities and competitions for children and families.",
    category: "Activity"
  }
];

export default function Events() {
  const { isMobile, isTablet, isDesktop } = useMobile();
  const [selectedTab, setSelectedTab] = useState<'academic' | 'activities'>('academic');

  const currentEvents = selectedTab === 'academic' ? academicEvents : activityEvents;

  const handleEventClick = (eventId: number) => {
    console.log('Event clicked:', eventId);
  };

  return (
    <div className="h-[100dvh] flex flex-col">
      <AppHeader />

      {/* Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Side Navigation */}
        {isDesktop && <SideNavbar />}

        {/* Main Content Area */}
        <div className="flex flex-col flex-1">
          {/* Tab Navigation */}
          <div className="bg-white border-b border-gray-100 px-4 md:px-8 lg:px-8">
            <div className="grid grid-cols-2 max-w-7xl mx-auto">
              <button
                onClick={() => setSelectedTab('academic')}
                className={`py-4 font-semibold transition-colors text-sm md:text-base lg:text-base ${
                  selectedTab === 'academic'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Academic
              </button>
              <button
                onClick={() => setSelectedTab('activities')}
                className={`py-4 font-semibold transition-colors text-sm md:text-base lg:text-base ${
                  selectedTab === 'activities'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Activities
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gradient-to-br from-blue-50 to-purple-50 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-8 py-6 md:px-12 md:py-8 lg:px-16 lg:py-10">
              <div className="space-y-6">
                {/* Header Section */}
                <header className="text-center mb-8">
                  <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-800 mb-2">
                    {selectedTab === 'academic' ? 'Academic Events' : 'Activity Events'}
                  </h1>
                  <p className="text-gray-600 text-sm md:text-base lg:text-base">
                    {selectedTab === 'academic' 
                      ? 'Educational competitions and academic celebrations'
                      : 'Fun activities and community celebrations'
                    }
                  </p>
                </header>

                {/* Events Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                  {currentEvents.map((event) => (
                    <Card 
                      key={event.id} 
                      className="rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handleEventClick(event.id)}
                    >
                      <CardContent className="p-6">
                        {/* Event Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                event.category === 'Academic' ? 'bg-blue-100 text-blue-700' :
                                'bg-purple-100 text-purple-700'
                              }`}>
                                {event.category}
                              </span>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                              {event.title}
                            </h3>
                            <p className="text-gray-600 text-sm md:text-base mb-4">
                              {event.description}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 ml-4" />
                        </div>

                        {/* Event Details */}
                        <div className="space-y-3">
                          <div className="flex items-center text-gray-600 text-sm md:text-base">
                            <Calendar className="h-4 w-4 mr-3 text-gray-500" />
                            {event.date}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm md:text-base">
                            <Clock className="h-4 w-4 mr-3 text-gray-500" />
                            {event.time}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm md:text-base">
                            <MapPin className="h-4 w-4 mr-3 text-gray-500" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm md:text-base">
                            <Users className="h-4 w-4 mr-3 text-gray-500" />
                            {event.attendees} attendees
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Empty State */}
                {currentEvents.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                    <p className="text-gray-500">
                      No events available for this category at the moment.
                    </p>
                  </div>
                )}
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