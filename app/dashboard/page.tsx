import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-6" data-oid="pgdj8y3">
      <h1 className="text-3xl font-bold" data-oid="m2aq:pk">
        Dashboard
      </h1>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        data-oid="oxr-0xm"
      >
        <Card data-oid="2v5j7m0">
          <CardHeader data-oid="2i-3_66">
            <CardTitle data-oid="azvowmz">My Communities</CardTitle>
          </CardHeader>
          <CardContent data-oid="-532tpk">
            <Button asChild data-oid="xyv3got">
              <Link href="/dashboard/my-communities" data-oid="u7e._9l">
                View Communities
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card data-oid=".zh2fiy">
          <CardHeader data-oid="prr-7ow">
            <CardTitle data-oid="4ee:350">Events</CardTitle>
          </CardHeader>
          <CardContent data-oid="amsurve">
            <Button asChild data-oid="hwxr:d.">
              <Link href="/dashboard/events" data-oid="98bshmj">
                View Events
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card data-oid="c1exzgv">
          <CardHeader data-oid="0790583">
            <CardTitle data-oid="fzttsl0">Profile</CardTitle>
          </CardHeader>
          <CardContent data-oid="bquhcky">
            <Button asChild data-oid="u2cxygi">
              <Link href="/dashboard/profile" data-oid="l7p_xez">
                View Profile
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
