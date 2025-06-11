'use client'

import { Metadata } from 'next'
import { AppHeader } from '@/components/layout/AppHeader'
import { BottomNavbar } from '@/components/navigation/BottomNavbar'
import { SideNavbar } from '@/components/navigation/SideNavbar'
import { useMobile } from '@/hooks/use-mobile'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Share2, Calendar, Star, Trophy, Users } from 'lucide-react'

export default function HomePage() {
  const { isMobile, isTablet } = useMobile()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          {/* Desktop Sidebar */}
          {!isMobile && !isTablet && (
            <div className="w-64 flex-shrink-0">
              <SideNavbar />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <AppHeader title="Newsfeed" />

            {/* Content */}
            <div className="p-4 pb-20 md:pb-4">
              {/* Welcome Section */}
              <div className="mb-6">
                <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-2">Welcome to EduConnect!</h2>
                    <p className="text-purple-100">Stay connected with your school community</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">1,247</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">15</div>
                    <div className="text-sm text-gray-600">Events This Month</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">42</div>
                    <div className="text-sm text-gray-600">Achievements</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">4.8</div>
                    <div className="text-sm text-gray-600">School Rating</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Posts */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Recent Updates</h3>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-semibold">SB</span>
                        </div>
                        <div>
                          <CardTitle className="text-sm">Springfield Elementary</CardTitle>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <Badge variant="secondary">School News</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">🎉 Great news! Our school science fair winners have been announced. Congratulations to all participants for their amazing projects!</p>
                    <div className="flex items-center space-x-4 text-gray-500">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        24
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        8
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold">MJ</span>
                        </div>
                        <div>
                          <CardTitle className="text-sm">Ms. Johnson - 3rd Grade</CardTitle>
                          <p className="text-xs text-gray-500">4 hours ago</p>
                        </div>
                      </div>
                      <Badge variant="outline">Classroom</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">📚 Reminder: Reading homework is due tomorrow. Don't forget to log your reading minutes in your reading journal!</p>
                    <div className="flex items-center space-x-4 text-gray-500">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        12
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        3
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">PT</span>
                        </div>
                        <div>
                          <CardTitle className="text-sm">Parent-Teacher Association</CardTitle>
                          <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                      </div>
                      <Badge variant="default">Event</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">🎪 Spring Carnival planning meeting this Friday at 7 PM in the library. We need volunteers for games and food booths!</p>
                    <div className="flex items-center space-x-4 text-gray-500">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        18
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        6
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation - only show on mobile/tablet */}
        {(isMobile || isTablet) && <BottomNavbar />}
      </div>
    </div>
  )
}