'use client'

import { AppHeader } from '@/components/layout/AppHeader'
import { BottomNavbar } from '@/components/navigation/BottomNavbar'
import { SideNavbar } from '@/components/navigation/SideNavbar'
import { useMobile } from '@/hooks/use-mobile'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Share2, Calendar, ChevronRight } from 'lucide-react'

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
            <div className="p-6 pb-20 md:pb-4 max-w-2xl mx-auto">
              {/* This year section */}
              <div className="mb-8">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
                    <span className="text-gray-600 text-sm">This year</span>
                  </div>
                </div>

                {/* Next Event Card */}
                <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-100 mb-8">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-gray-800">Next Event</CardTitle>
                      <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                        View all <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        DECEMBER 15, 2024
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">Winter Festival</h3>
                      <p className="text-sm text-gray-600">2:00 PM - 6:00 PM</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Stories Section */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Stories</h2>
                  
                  {/* Story Post */}
                  <Card className="mb-6">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">SJ</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                          <p className="text-xs text-gray-500">Central Park • 2h ago</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-700 mb-4">
                        Amazing day at the park with the kids! The weather was perfect for our picnic.
                      </p>
                      
                      {/* Story Image */}
                      <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-300 h-48 mb-4">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-6xl select-none">🎪</div>
                        </div>
                        <div className="absolute top-4 right-4 w-2 h-2 bg-pink-400 rounded-full"></div>
                        <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full"></div>
                        <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        <div className="absolute bottom-12 right-12 w-1 h-1 bg-pink-300 rounded-full"></div>
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center space-x-6 text-gray-500">
                        <button className="flex items-center space-x-1 text-pink-500 hover:text-pink-600">
                          <Heart className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium">14 likes</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-gray-700">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">8 comments</span>
                        </button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Story Post */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">MC</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Mike Chen</h4>
                          <p className="text-xs text-gray-500">Springfield Elementary • 4h ago</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-700 mb-4">
                        Great soccer practice today! The kids are really improving their teamwork skills.
                      </p>

                      {/* Post Actions */}
                      <div className="flex items-center space-x-6 text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-pink-600">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">12 likes</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-gray-700">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">3 comments</span>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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