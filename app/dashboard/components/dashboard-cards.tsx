import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface DashboardCard {
  title: string;
  href: string;
  buttonText: string;
}

const dashboardCards: DashboardCard[] = [
  {
    title: "My Communities",
    href: "/dashboard/my-communities",
    buttonText: "View Communities",
  },
  {
    title: "Events",
    href: "/dashboard/events",
    buttonText: "View Events",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    buttonText: "View Profile",
  },
];

export function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardCards.map((card) => (
        <Card key={card.title}>
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href={card.href}>{card.buttonText}</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
