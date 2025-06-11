'use client'

import { AppHeader } from '@/components/layout/AppHeader'
import { BottomNavbar } from '@/components/navigation/BottomNavbar'
import { SideNavbar } from '@/components/navigation/SideNavbar'
import { useMobile } from '@/hooks/use-mobile'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import AvatarWithInitials from '@/components/ui/avatar-with-initials'
import { Star, Trophy, BookOpen, Target, Calendar, Clock } from 'lucide-react'

export default function ChildrenPage() {
  const { isMobile, isTablet } = useMobile()

  const students = [
    {
      id: 1,
      name: "Emma Thompson",
      grade: "3rd Grade",
      teacher: "Ms. Johnson",
      avatar: "ET",
      achievements: ["Math Star", "Reading Champion"],
      progress: {
        reading: 85,
        math: 92,
        science: 78,
        socialStudies: 88
      }
    },
    {
      id: 2, 
      name: "Liam Rodriguez",
      grade: "5th Grade",
      teacher: "Mr. Davis",
      avatar: "LR",
      achievements: ["Science Fair Winner", "Perfect Attendance"],
      progress: {
        reading: 90,
        math: 87,
        science: 95,
        socialStudies: 83
      }
    },
    {
      id: 3,
      name: "Sophia Chen",
      grade: "2nd Grade", 
      teacher: "Mrs. Williams",
      avatar: "SC",
      achievements: ["Art Excellence", "Helper of the Month"],
      progress: {
        reading: 88,
        math: 85,
        science: 82,
        socialStudies: 91
      }
    }
  ]

  const activities = [
    {
      id: 1,
      title: "Math Olympics Practice",
      date: "Today, 3:30 PM",
      participants: ["Emma Thompson", "Liam Rodriguez"],
      type: "Academic",
      location: "Room 205"
    },
    {
      id: 2,
      title: "Art Club Meeting",
      date: "Tomorrow, 3:45 PM", 
      participants: ["Sophia Chen"],
      type: "Creative",
      location: "Art Room"
    },
    {
      id: 3,
      title: "Reading Buddy Session",
      date: "Friday, 2:00 PM",
      participants: ["Emma Thompson", "Sophia Chen"],
      type: "Academic",
      location: "Library"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          {!isMobile && !isTablet && (
            <div className="w-64 flex-shrink-0">
              <SideNavbar />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <AppHeader title="Children" />

            <div className="p-4 pb-20 md:pb-4">
              <Tabs defaultValue="students" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="students">Our Students</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                </TabsList>

                <TabsContent value="students" className="space-y-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Student Profiles</h2>
                    <p className="text-gray-600">Track progress and achievements for each student</p>
                  </div>

                  {students.map((student) => (
                    <Card key={student.id}>
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <AvatarWithInitials name={student.name} size="lg" />
                          <div className="flex-1">
                            <CardTitle className="text-lg">{student.name}</CardTitle>
                            <p className="text-gray-600">{student.grade} • {student.teacher}</p>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {student.achievements.map((achievement, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                <Trophy className="h-3 w-3 mr-1" />
                                {achievement}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Reading</span>
                              <span>{student.progress.reading}%</span>
                            </div>
                            <Progress value={student.progress.reading} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Math</span>
                              <span>{student.progress.math}%</span>
                            </div>
                            <Progress value={student.progress.math} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Science</span>
                              <span>{student.progress.science}%</span>
                            </div>
                            <Progress value={student.progress.science} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Social Studies</span>
                              <span>{student.progress.socialStudies}%</span>
                            </div>
                            <Progress value={student.progress.socialStudies} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="activities" className="space-y-4">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Upcoming Activities</h2>
                    <p className="text-gray-600">Extracurricular activities and special programs</p>
                  </div>

                  {activities.map((activity) => (
                    <Card key={activity.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{activity.title}</CardTitle>
                          <Badge variant={activity.type === 'Academic' ? 'default' : 'secondary'}>
                            {activity.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            {activity.date}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Target className="h-4 w-4 mr-2" />
                            {activity.location}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Star className="h-4 w-4 mr-2" />
                            {activity.participants.length} Students
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Participants:</p>
                          <div className="flex flex-wrap gap-2">
                            {activity.participants.map((participant, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {participant}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {(isMobile || isTablet) && <BottomNavbar />}
      </div>
    </div>
  )
}