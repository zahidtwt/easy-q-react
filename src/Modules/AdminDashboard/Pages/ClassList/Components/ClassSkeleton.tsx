import { Skeleton } from "@/components/ui/skeleton";

const ClassSkeleton = () => {
  return (
    <div className="flex flex-col items-center space-y-4 border border-gray-200 rounded-md p-2">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default ClassSkeleton;
