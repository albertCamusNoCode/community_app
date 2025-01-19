'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Home, Calendar, GraduationCap, Users, PlayCircle, MessageCircle, UserPlus, CalendarIcon } from 'lucide-react'

const navigationItems = [
  {
    title: '',
    items: [
      { title: 'Home', icon: Home, href: '/' },
      { title: 'Events', icon: Calendar, href: '/events' },
      { title: 'Members', icon: Users, href: '/members' },
    ],
  },
  {
    title: 'Get started',
    items: [
      { title: 'Start here', icon: PlayCircle, href: '/start' },
      { title: 'Introductions', icon: MessageCircle, href: '/introductions' },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
        <div className="px-4 mb-4">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-semibold">ModernMind™</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-8">
            {navigationItems.map((section) => (
              <div key={section.title} className="space-y-2">
                {section.title && (
                  <h4 className="text-sm font-semibold px-2 text-gray-500">{section.title}</h4>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      asChild
                      className={cn(
                        'w-full justify-start',
                        pathname === item.href && 'bg-gray-100 text-black'
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-400" />
            <span className="ml-2 text-sm text-gray-600">420 members online</span>
          </div>
        </div>
      </div>
    </div>
  )
}

