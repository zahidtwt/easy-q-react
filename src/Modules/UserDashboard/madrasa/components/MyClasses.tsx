import { useState } from "react";
import BoardCard from "./BoardCard";
import SelectItemsForBoardCard from "./SelectItemsForBoardCard";
import { useGetClassList } from "@/hooks/useClass";
import { Skeleton } from "@/components/ui/skeleton";

const BoardCardSkeleton = () => {
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

const MyClasses = () => {
  const title = "Classes";

  const [open, setOpen] = useState(false);
  const modalToggoler = () => {
    setOpen(true);
  };

  const { isLoading, data: classList } = useGetClassList({});

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-4">
        <BoardCardSkeleton />
        <BoardCardSkeleton />
        <BoardCardSkeleton />
        <BoardCardSkeleton />
      </div>
    );
  }

  return (
    <>
      <BoardCard
        name={"Class"}
        title={title}
        addNewFunc={modalToggoler}
        list={(classList && classList) || []}
      />

      {open && (
        <SelectItemsForBoardCard
          title={"Classes"}
          open={open}
          setOpen={setOpen}
          itemList={(classList && classList) || []}
        />
      )}
    </>
  );
};

export default MyClasses;
