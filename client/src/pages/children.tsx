import { useState } from "react";
import { Star, Trophy, BookOpen, Palette, Music, Gamepad2, Heart, Users } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { BottomNavbar } from "@/components/navigation/BottomNavbar";
import { SideNavbar } from "@/components/navigation/SideNavbar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/card";

// Student/Achievement data
const students = [
  {
    id: 1,
    name: "Emma Johnson",
    grade: "3rd Grade",
    initials: "EJ",
    gradient: "from-pink-400 to-purple-500",
    points: 850,
    achievements: ["Reading Champion", "Math Star", "Helper Award"],
    recentActivity: "Completed Art Project",
    level: "Advanced Reader"
  },
  {
    id: 2,
    name: "Alex Chen",
    grade: "2nd Grade", 
    initials: "AC",
    gradient: "from-blue-400 to-green-500",
    points: 720,
    achievements: ["Science Explorer", "Team Player"],
    recentActivity: "Won Spelling Bee",
    level: "Growing Reader"
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    grade: "4th Grade",
    initials: "SR", 
    gradient: "from-yellow-400 to-orange-500",
    points: 950,
    achievements: ["Leadership Badge", "Creative Writer", "Math Wizard"],
    recentActivity: "Led group project",
    level: "Super Reader"
  },
  {
    id: 4,
    name: "Jordan Williams",
    grade: "1st Grade",
    initials: "JW",
    gradient: "from-green-400 to-teal-500", 
    points: 480,
    achievements: ["First Book", "Kind Friend"],
    recentActivity: "Shared toys with classmate",
    level: "New Reader"
  }
];

const activities = [
  {
    id: 1,
    title: "Reading Time",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
    description: "Daily reading sessions",
    participants: 15
  },
  {
    id: 2,
    title: "Art & Crafts",
    icon: Palette,
    color: "bg-purple-100 text-purple-600", 
    description: "Creative expression time",
    participants: 12
  },
  {
    id: 3,
    title: "Music Class",
    icon: Music,
    color: "bg-green-100 text-green-600",
    description: "Learning songs and rhythms", 
    participants: 18
  },
  {
    id: 4,
    title: "Game Time",
    icon: Gamepad2,
    color: "bg-orange-100 text-orange-600",
    description: "Educational games and puzzles",
    participants: 10
  }
];

const achievements = [
  { name: "Reading Champion", icon: BookOpen, count: 8 },
  { name: "Math Star", icon: Star, count: 5 },
  { name: "Helper Award", icon: Heart, count: 12 },
  { name: "Team Player", icon: Users, count: 7 }
];

export default function Children() {
  const { isMobile, isTablet, isDesktop } = useMobile();
  const [selectedTab, setSelectedTab] = useState<'students' | 'activities'>('students');

  const handleStudentClick = (studentId: number) => {
    console.log('Student clicked:', studentId);
  };

  const handleActivityClick = (activityId: number) => {
    console.log('Activity clicked:', activityId);
  };

  return (
    <div className="h-[100dvh] flex flex-col">
      <AppHeader title="Children" titleClassName="font-semibold text-lg" />

      {/* Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Side Navigation */}
        {isDesktop && <SideNavbar />}

        {/* Main Content Area */}
        <div className="flex flex-col flex-1">
          {/* Main Content */}
          <div className="flex-1 bg-gradient-to-br from-blue-50 to-purple-50 overflow-y-auto">
            {/* Tab Navigation */}
            <div className="bg-white border-b border-gray-100 px-4 md:px-8 lg:px-8">
              <div className="grid grid-cols-2 max-w-7xl mx-auto">
                <button
                  onClick={() => setSelectedTab('students')}
                  className={`py-4 font-semibold transition-colors text-sm md:text-base lg:text-base ${
                    selectedTab === 'students'
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Our Students
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

            <div className="max-w-4xl mx-auto px-8 py-6 md:px-12 md:py-8 lg:px-16 lg:py-10">
              {/* Students Tab */}
              {selectedTab === 'students' && (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-800 mb-2">
                      🌟 Amazing Students 🌟
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base lg:text-base">
                      Celebrating our wonderful learners and their achievements
                    </p>
                  </div>

                  {/* Achievement Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {achievements.map((achievement) => {
                      const Icon = achievement.icon;
                      return (
                        <Card key={achievement.name} className="rounded-xl border-0 bg-white shadow-sm">
                          <CardContent className="p-4 text-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="text-lg font-bold text-gray-800">{achievement.count}</div>
                            <div className="text-xs text-gray-600">{achievement.name}</div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Students Grid */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                    {students.map((student) => (
                      <Card 
                        key={student.id}
                        className="rounded-2xl border-0 bg-white shadow-md hover:shadow-lg transition-all cursor-pointer"
                        onClick={() => handleStudentClick(student.id)}
                      >
                        <CardContent className="p-6">
                          {/* Student Header */}
                          <div className="flex items-start space-x-4 mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-br ${student.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                              {student.initials}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-800">{student.name}</h3>
                              <p className="text-sm text-gray-600">{student.grade} • {student.level}</p>
                              <div className="flex items-center mt-1">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="text-sm font-semibold text-gray-700">{student.points} points</span>
                              </div>
                            </div>
                          </div>

                          {/* Recent Activity */}
                          <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">Recent Activity:</p>
                            <p className="text-sm font-medium text-purple-600">{student.recentActivity}</p>
                          </div>

                          {/* Achievements */}
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Achievements:</p>
                            <div className="flex flex-wrap gap-2">
                              {student.achievements.map((achievement, index) => (
                                <span 
                                  key={index}
                                  className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-medium"
                                >
                                  {achievement}
                                </span>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Activities Tab */}
              {selectedTab === 'activities' && (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-800 mb-2">
                      🎨 Fun Activities 🎵
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base lg:text-base">
                      Exciting learning activities for our students
                    </p>
                  </div>

                  {/* Activities Grid */}
                  <div className="grid gap-6 md:grid-cols-2">
                    {activities.map((activity) => {
                      const Icon = activity.icon;
                      return (
                        <Card 
                          key={activity.id}
                          className="rounded-2xl border-0 bg-white shadow-md hover:shadow-lg transition-all cursor-pointer"
                          onClick={() => handleActivityClick(activity.id)}
                        >
                          <CardContent className="p-6 text-center">
                            <div className={`w-16 h-16 ${activity.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                              <Icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{activity.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                            <div className="flex items-center justify-center text-sm text-gray-500">
                              <Users className="h-4 w-4 mr-1" />
                              {activity.participants} students
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Quick Stats */}
                  <Card className="rounded-2xl border-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-bold mb-2">Today's Fun Facts</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-2xl font-bold">24</div>
                          <div className="text-sm opacity-90">Books Read</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">18</div>
                          <div className="text-sm opacity-90">Art Projects</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">12</div>
                          <div className="text-sm opacity-90">Songs Learned</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">36</div>
                          <div className="text-sm opacity-90">Smiles Shared</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Navigation - only show on mobile/tablet */}
          {(isMobile || isTablet) && <BottomNavbar />}
        </div>
      </div>
    </div>
  );
}