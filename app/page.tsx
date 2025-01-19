import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-6 text-center" data-oid="ypcc.ew">
      <h1 className="text-4xl font-bold" data-oid="j2:ka6_">
        Welcome to Community App
      </h1>
      <p className="text-xl" data-oid="vkwvz-f">
        Connect, share, and grow with your community
      </p>
      <div className="flex justify-center" data-oid="kjkbfbw">
        <Button variant="outline" asChild data-oid="3a19ffr">
          <Link href="/create-community" data-oid="nd4zlfh">
            Create a Community
          </Link>
        </Button>
      </div>
    </div>
  );
}
