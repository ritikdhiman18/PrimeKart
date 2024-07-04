import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3 w-36 lg:w-[240px]">
            <Skeleton className="rounded-xl mx-2 w-full h-24 lg:h-[200px]" />
            <div className="space-y-2 mx-2">
                <Skeleton className="h-4 w-36lg:w-[220px]" />
                <Skeleton className="h-4 w-24 lg:w-[200px]" />
            </div>
        </div>
    )
}
