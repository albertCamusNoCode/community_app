import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventListSkeleton() {
  return (
    <div className="space-y-4" data-oid="ayyg4pw">
      <div className="flex justify-end" data-oid="0t.epuf">
        <Skeleton className="h-10 w-[200px]" data-oid="0f1-u7w" />
      </div>
      <div className="space-y-6" data-oid="n13tvmr">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2" data-oid="qq_yr4d">
            <Skeleton className="h-6 w-48" data-oid="9aqte:d" />
            <Card data-oid="iajpagb">
              <CardHeader className="pb-2" data-oid="swobb03">
                <Skeleton className="h-5 w-3/4" data-oid="16nv2wr" />
              </CardHeader>
              <CardContent data-oid=":5-v3oy">
                <div className="space-y-2" data-oid="5dm6tuk">
                  <Skeleton className="h-4 w-full" data-oid="2l-3h76" />
                  <Skeleton className="h-4 w-full" data-oid="u3mrzz:" />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
