import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ClassSkeleton from "./Components/ClassSkeleton";
import { useGetClassList } from "@/hooks/useClass";
import { IClass } from "@/interfaces/class";
import ClassCard from "./Components/ClassCard";
import ClassFormModal from "./Components/ClassFormModal";

const ClassList = () => {
  const { isLoading, data: classList } = useGetClassList({});

  const [open, setOpen] = useState(false);

  return (
    <div className="container mt-8">
      <Card x-chunk="dashboard-06-chunk-0">
        <div className="flex justify-between items-center">
          <CardHeader>
            <CardTitle>Class List</CardTitle>
          </CardHeader>

          <div className="ml-auto flex items-center gap-2 p-3">
            <Button
              onClick={() => setOpen(true)}
              size="sm"
              className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Class</span>
            </Button>
          </div>
        </div>

        <CardContent>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10 py-5">
            {isLoading && (
              <>
                <ClassSkeleton />
                <ClassSkeleton />
                <ClassSkeleton />
                <ClassSkeleton />
                <ClassSkeleton />
                <ClassSkeleton />
                <ClassSkeleton />
                <ClassSkeleton />
              </>
            )}
            {classList?.map((classItem: IClass) => (
              <ClassCard
                key={classItem._id}
                classItem={classItem}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

      {open && (
        <ClassFormModal
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default ClassList;
