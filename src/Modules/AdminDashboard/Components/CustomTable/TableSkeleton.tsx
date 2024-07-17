import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="w-[full]">
      <Skeleton className="h-12 w-full mt-2 rounded-full" />
      <Skeleton className="h-12 w-full mt-2 rounded-full" />
      <Skeleton className="h-12 w-full mt-2 rounded-full" />
      <Skeleton className="h-12 w-full mt-2 rounded-full" />
      <Skeleton className="h-12 w-full mt-2 rounded-full" />
      <Skeleton className="h-12 w-full mt-2 rounded-full" />
      <Skeleton className="h-12 w-full mt-2 rounded-full" />
      <Skeleton className="h-12 w-full mt-2 rounded-full" />
      <Skeleton className="h-12 w-full mt-2 rounded-full" />
    </div>
  );
};

export default TableSkeleton;
