import { PlusCircle } from "lucide-react";
// import TotalCountCardList from "../../Components/TotalCountCardList/TotalCountCardList";
// import CustomTable from "../../Components/CustomTable/CustomTable";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetEducationBoardList } from "../../../../hooks/useEducationBoard";
import { Skeleton } from "@/components/ui/skeleton";
import { EducationBoard } from "@/interfaces/education-board";
import { useState } from "react";
import AddBoardModal from "./Components/AddBoardModal";
import BoardCard from "./Components/BoardCard";

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

const BoardList = () => {
  const {
    isLoading,
    data: eduBoardList,
    // error: edBoardList,
    // refetch: getAgainBoardList,
  } = useGetEducationBoardList({});

  const [open, setOpen] = useState(false);

  //   {
  //     title: "Total Education Board",
  //     count: "64",
  //     icon: <UserCircle />,
  //   },
  //   {
  //     title: "Total Institution",
  //     count: "452",
  //     icon: <UserCircle />,
  //   },
  //   {
  //     title: "Total Classes",
  //     count: "12",
  //     icon: <UserCircle />,
  //   },
  //   {
  //     title: "Total Question Set",
  //     count: "400+",
  //     icon: <UserCircle />,
  //   },
  // ];
  return (
    <div className="container mt-8">
      {/* <TotalCountCardList totalCountData={totalCountData} />
      <CustomTable /> */}

      <Card x-chunk="dashboard-06-chunk-0">
        <div className="flex justify-between items-center">
          <CardHeader>
            <CardTitle>Education Board List</CardTitle>
          </CardHeader>

          <div className="ml-auto flex items-center gap-2 p-3">
            <Button
              onClick={() => setOpen(true)}
              size="sm"
              className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
            </Button>
          </div>
        </div>

        <CardContent>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10 py-5">
            {isLoading && (
              <>
                <BoardCardSkeleton />
                <BoardCardSkeleton />
                <BoardCardSkeleton />
                <BoardCardSkeleton />
                <BoardCardSkeleton />
                <BoardCardSkeleton />
                <BoardCardSkeleton />
                <BoardCardSkeleton />
              </>
            )}
            {eduBoardList?.map((board: EducationBoard) => (
              <BoardCard
                key={board.id}
                board={board}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

      {open && (
        <AddBoardModal
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default BoardList;
