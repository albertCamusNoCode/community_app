import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 text-center" data-oid="igsp9p2">
      <h1 className="text-4xl font-bold mb-4" data-oid="emx84jk">
        404 - Not Found
      </h1>
      <p className="text-xl mb-8" data-oid="4wx-3rj">
        The invite you're looking for doesn't exist or has expired.
      </p>
      <Button asChild data-oid="wu8kzw:">
        <Link href="/" data-oid="j7c9p:t">
          Return to Home
        </Link>
      </Button>
    </div>
  );
}
