'use client'

import { useState } from 'react'
import { AppHeader } from '@/components/layout/AppHeader'
import { BottomNavbar } from '@/components/navigation/BottomNavbar'
import { SideNavbar } from '@/components/navigation/SideNavbar'
import { useMobile } from '@/hooks/use-mobile'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

export default function EventsPage() {
  const { isMobile, isTablet } = useMobile()

  const academicEvents = [
    {
      id: 1,
      title: "Parent-Teacher Conferences",
      date: "March 15-16, 2024",
      time: "3:00 PM - 8:00 PM",
      location: "All Classrooms",
      description: "Individual meetings to discuss student progress and academic goals.",
      attendees: "Parents & Teachers",
      type: "academic"
    },
    {
      id: 2,
      title: "Report Card Distribution",
      date: "March 22, 2024",
      time: "End of School Day",
      location: "Homeroom Classes",
      description: "Quarterly report cards will be sent home with students.",
      attendees: "All Students",
      type: "academic"
    },
    {
      id: 3,
      title: "State Testing Week",
      date: "April 8-12, 2024",
      time: "9:00 AM - 12:00 PM",
      location: "Testing Center",
      description: "Annual state assessments for grades 3-5.",
      attendees: "Grades 3-5",
      type: "academic"
    }
  ]

  const activityEvents = [
    {
      id: 4,
      title: "Spring Science Fair",
      date: "March 20, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Gymnasium",
      description: "Student science projects showcase and awards ceremony.",
      attendees: "All Families",
      type: "activity"
    },
    {
      id: 5,
      title: "Book Fair Week",
      date: "April 1-5, 2024",
      time: "8:00 AM - 3:30 PM",
      location: "Library",
      description: "Annual book fair featuring age-appropriate reading materials.",
      attendees: "Students & Families",
      type: "activity"
    },
    {
      id: 6,
      title: "Spring Field Trip",
      date: "April 18, 2024",
      time: "9:00 AM - 3:00 PM",
      location: "Natural History Museum",
      description: "Educational field trip to the Natural History Museum.",
      attendees: "Grade 2 Students",
      type: "activity"
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
            <AppHeader title="Events" />

            <div className="p-4 pb-20 md:pb-4">
              <Tabs defaultValue="academic" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="academic">Academic</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                </TabsList>

                <TabsContent value="academic" className="space-y-4">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Academic Events</h2>
                    <p className="text-gray-600">School operations, academic progress, and classroom activities</p>
                  </div>
                  
                  {academicEvents.map((event) => (
                    <Card key={event.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <Badge variant="outline">Academic</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-gray-700">{event.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            {event.date}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            {event.time}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-2" />
                            {event.attendees}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="activities" className="space-y-4">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Activity Events</h2>
                    <p className="text-gray-600">Clubs, field trips, fundraisers, and family-friendly school events</p>
                  </div>
                  
                  {activityEvents.map((event) => (
                    <Card key={event.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <Badge variant="secondary">Activity</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-gray-700">{event.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            {event.date}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            {event.time}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-2" />
                            {event.attendees}
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