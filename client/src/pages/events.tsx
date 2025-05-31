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
    title: "Parent-Teacher Conferences",
    date: "February 10-11, 2025",
    time: "3:00 PM - 8:00 PM",
    location: "Individual Classrooms",
    attendees: 150,
    description: "Individual meetings to discuss student progress and academic goals.",
    category: "Academic"
  },
  {
    id: 2,
    title: "Report Card Distribution",
    date: "February 14, 2025",
    time: "3:00 PM - 4:00 PM",
    location: "Main Office",
    attendees: 200,
    description: "First semester report cards available for pickup and review.",
    category: "Academic"
  },
  {
    id: 3,
    title: "Spring Testing Week",
    date: "March 3-7, 2025",
    time: "8:00 AM - 12:00 PM",
    location: "Testing Center",
    attendees: 180,
    description: "Standardized testing for all grade levels. Please ensure students are well-rested.",
    category: "Academic"
  },
  {
    id: 4,
    title: "Back-to-School Night",
    date: "August 28, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "School Auditorium",
    attendees: 120,
    description: "Meet teachers, learn about curriculum, and tour classrooms for the new school year.",
    category: "Academic"
  },
  {
    id: 5,
    title: "Open House",
    date: "March 15, 2025",
    time: "10:00 AM - 2:00 PM",
    location: "Entire Campus",
    attendees: 250,
    description: "Explore our school, meet staff, and see student work displays throughout the building.",
    category: "Academic"
  },
  {
    id: 6,
    title: "School Picture Day",
    date: "September 15, 2025",
    time: "9:00 AM - 3:00 PM",
    location: "Gymnasium",
    attendees: 300,
    description: "Individual and class photos. Picture order forms sent home in advance.",
    category: "Academic"
  },
  {
    id: 7,
    title: "Math Curriculum Night",
    date: "October 12, 2025",
    time: "7:00 PM - 8:30 PM",
    location: "Math Classroom",
    attendees: 45,
    description: "Learn about our math curriculum and how to support learning at home.",
    category: "Academic"
  },
  {
    id: 8,
    title: "Student Projects Showcase",
    date: "May 20, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "Multi-Purpose Room",
    attendees: 200,
    description: "Students present their year-end projects across all subject areas.",
    category: "Academic"
  }
];

const activityEvents = [
  {
    id: 9,
    title: "STEM Club Registration",
    date: "September 5, 2024",
    time: "3:00 PM - 4:00 PM",
    location: "Science Lab",
    attendees: 25,
    description: "Sign up for after-school STEM club. Hands-on experiments and robotics projects.",
    category: "Activity"
  },
  {
    id: 10,
    title: "Basketball Practice Schedule",
    date: "October 1-November 15, 2024",
    time: "3:30 PM - 5:00 PM",
    location: "Gymnasium",
    attendees: 20,
    description: "Tuesdays and Thursdays basketball practice for 4th-6th grade students.",
    category: "Activity"
  },
  {
    id: 11,
    title: "Museum Field Trip",
    date: "October 18, 2024",
    time: "9:00 AM - 3:00 PM",
    location: "Natural History Museum",
    attendees: 60,
    description: "3rd grade field trip to explore dinosaur exhibits. Permission slips required.",
    category: "Activity"
  },
  {
    id: 12,
    title: "Fall Book Fair",
    date: "November 4-8, 2024",
    time: "8:00 AM - 4:00 PM",
    location: "Library",
    attendees: 320,
    description: "Browse and purchase books. Volunteers needed for setup and cashier duties.",
    category: "Activity"
  },
  {
    id: 13,
    title: "Halloween Dance",
    date: "October 31, 2024",
    time: "6:00 PM - 8:00 PM",
    location: "Multi-Purpose Room",
    attendees: 150,
    description: "Costume dance party for K-5 students. Snacks and music provided.",
    category: "Activity"
  },
  {
    id: 14,
    title: "Spirit Week",
    date: "February 24-28, 2025",
    time: "All Day",
    location: "School-wide",
    attendees: 350,
    description: "Daily themed dress-up days: Pajama Day, Crazy Hair Day, Sports Day, Twin Day, School Colors Day.",
    category: "Activity"
  },
  {
    id: 15,
    title: "Bake Sale Fundraiser",
    date: "March 7, 2025",
    time: "7:30 AM - 2:00 PM",
    location: "Main Hallway",
    attendees: 200,
    description: "Support our playground fund! Volunteers needed to donate baked goods and help with sales.",
    category: "Activity"
  },
  {
    id: 16,
    title: "Winter Holiday Concert",
    date: "December 18, 2024",
    time: "7:00 PM - 8:30 PM",
    location: "School Auditorium",
    attendees: 250,
    description: "Choir and band students perform seasonal music. Reception to follow.",
    category: "Activity"
  },
  {
    id: 17,
    title: "Talent Show",
    date: "April 25, 2025",
    time: "6:30 PM - 8:00 PM",
    location: "School Auditorium",
    attendees: 300,
    description: "Student talent showcase. Auditions required. Sign-up sheets available in main office.",
    category: "Activity"
  },
  {
    id: 18,
    title: "Library Volunteer Training",
    date: "September 12, 2024",
    time: "9:00 AM - 10:30 AM",
    location: "School Library",
    attendees: 15,
    description: "Learn how to help with book shelving, reading to students, and library events.",
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
                      ? 'School operations, academic progress, and classroom activities'
                      : 'Enrichment, fun, and community-building events where parents may sign up kids or participate'
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