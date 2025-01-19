'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Home, Calendar, GraduationCap, Users, Menu, PlayCircle } from 'lucide-react'

const navigationItems = [
  {
    items: [
      { title: 'Home', icon: Home, href: '/home' },
      { title: 'Events', icon: Calendar, href: '/events' },
      { title: 'Courses', icon: GraduationCap, href: '/courses' },
      { title: 'Members', icon: Users, href: '/members' },
    ],
  },
  {
    title: 'Get started',
    items: [
      { 
        title: 'Start here', 
        icon: PlayCircle, 
        href: '/start',
        indicator: 'purple'
      },
      { 
        title: 'Introductions', 
        icon: Users, 
        href: '/introductions',
        indicator: 'purple'
      },
    ],
  },
]

function NavigationItems() {
  const pathname = usePathname()

  return (
    <div className="space-y-6">
      {navigationItems.map((section, i) => (
        <div key={i} className="space-y-2">
          {section.title && (
            <h4 className="text-sm font-semibold px-2">{section.title}</h4>
          )}
          <div className="space-y-1">
            {section.items.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                asChild
                className={cn(
                  'w-full justify-start h-11 rounded-none px-4',
                  pathname === item.href && 'bg-gray-100',
                  'hover:bg-gray-100'
                )}
              >
                <Link href={item.href} className="flex items-center">
                  <item.icon className="mr-3 h-5 w-5 text-gray-600" />
                  <span className="text-base font-medium text-gray-900">
                    {item.title}
                  </span>
                  {item.indicator && (
                    <span className="ml-3 h-2 w-2 rounded-full bg-purple-500" />
                  )}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function Sidebar() {
  return (
    <>
      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="lg:hidden fixed top-4 left-4 z-40"
            size="icon"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] p-0">
          <div className="border-b p-4">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-semibold">ModernMind™</span>
            </Link>
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <NavigationItems />
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto border-r">
          <div className="px-4 mb-4">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-semibold">ModernMind™</span>
            </Link>
          </div>
          <ScrollArea className="flex-1">
            <NavigationItems />
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-400" />
              <span className="ml-2 text-sm text-gray-600">420 members online</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

