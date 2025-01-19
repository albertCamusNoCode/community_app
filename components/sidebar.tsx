"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  Calendar,
  GraduationCap,
  Users,
  Menu,
  PlayCircle,
} from "lucide-react";

const navigationItems = [
  {
    items: [
      { title: "Home", icon: Home, href: "/home" },
      { title: "Events", icon: Calendar, href: "/events" },
      { title: "Courses", icon: GraduationCap, href: "/courses" },
      { title: "Members", icon: Users, href: "/members" },
    ],
  },
  {
    title: "Get started",
    items: [
      {
        title: "Start here",
        icon: PlayCircle,
        href: "/start",
        indicator: "purple",
      },
      {
        title: "Introductions",
        icon: Users,
        href: "/introductions",
        indicator: "purple",
      },
    ],
  },
];

function NavigationItems() {
  const pathname = usePathname();

  return (
    <div className="space-y-6" data-oid="1dw3_yv">
      {navigationItems.map((section, i) => (
        <div key={i} className="space-y-2" data-oid="yd7hfzt">
          {section.title && (
            <h4 className="text-sm font-semibold px-2" data-oid="3yc139w">
              {section.title}
            </h4>
          )}
          <div className="space-y-1" data-oid="5nwpm7n">
            {section.items.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                asChild
                className={cn(
                  "w-full justify-start h-11 rounded-none px-4",
                  pathname === item.href && "bg-gray-100",
                  "hover:bg-gray-100",
                )}
                data-oid="ygn08ti"
              >
                <Link
                  href={item.href}
                  className="flex items-center"
                  data-oid="wq0v97l"
                >
                  <item.icon
                    className="mr-3 h-5 w-5 text-gray-600"
                    data-oid="1n4z:mb"
                  />

                  <span
                    className="text-base font-medium text-gray-900"
                    data-oid="b-.0:a1"
                  >
                    {item.title}
                  </span>
                  {item.indicator && (
                    <span
                      className="ml-3 h-2 w-2 rounded-full bg-purple-500"
                      data-oid="wk9o64o"
                    />
                  )}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Sidebar() {
  return (
    <>
      {/* Mobile Navigation */}
      <Sheet data-oid="wz3jzf7">
        <SheetTrigger asChild data-oid="5smfgln">
          <Button
            variant="ghost"
            className="lg:hidden fixed top-4 left-4 z-50"
            size="icon"
            data-oid="0hxhzcu"
          >
            <Menu className="h-6 w-6" data-oid="iax4y7i" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] p-0" data-oid="lf3xa0s">
          <div className="border-b p-4" data-oid="1xkh0qw">
            <Link href="/" className="flex items-center" data-oid="t7497u4">
              <span className="text-xl font-semibold" data-oid="uyztcdw">
                ModernMind™
              </span>
            </Link>
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)]" data-oid="gceche0">
            <NavigationItems data-oid="7n7swid" />
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div
        className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50 bg-white border-r h-full"
        data-oid="m7mlsx7"
      >
        <div
          className="flex flex-col flex-grow pt-5 overflow-y-auto h-full"
          data-oid="2zt9mk9"
        >
          <div className="px-4 mb-4" data-oid="98sp8z7">
            <Link href="/" className="flex items-center" data-oid="y8c80gp">
              <span className="text-xl font-semibold" data-oid="34p.fq7">
                ModernMind™
              </span>
            </Link>
          </div>
          <ScrollArea
            className="flex-1 h-[calc(100vh-8rem)]"
            data-oid="kzln4fe"
          >
            <NavigationItems data-oid="4e6v63_" />
          </ScrollArea>
          <div className="p-4 border-t" data-oid="kjdosyb">
            <div className="flex items-center" data-oid="00y7yk3">
              <div
                className="flex-shrink-0 w-2 h-2 rounded-full bg-green-400"
                data-oid="we_aev."
              />

              <span className="ml-2 text-sm text-gray-600" data-oid="j7.g4y_">
                420 members online
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
