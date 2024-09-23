import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SubjectModal from "./Components/SubjectModal";
import ClassSkeleton from "../ClassList/Components/ClassSkeleton";
import SubjectDetailCard from "./Components/SubjectCard";
import { useGetSubjectList } from "@/hooks/useSubject";
import SubjectDetailFormModal from "./Components/SubjectDetailFormModal";

const Subjects = () => {
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  let filterData = {
    query: {},
    sortField: "createdAt",
    sortOrder: 1,
  };

  // make this conditional
  filterData = { ...filterData, query: {} };

  const { data: subjectList, isLoading: subjectListLoading } = useGetSubjectList({
    filterData,
  });

  return (
    <div className="container mt-8">
      <Card x-chunk="dashboard-06-chunk-0">
        <div className="flex justify-between items-center">
          <CardHeader>
            <CardTitle>Subject List</CardTitle>
          </CardHeader>

          <div className="ml-auto flex items-center gap-2 p-3">
            <Button
              onClick={() => setOpen(true)}
              size="sm"
              className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Create Subject</span>
            </Button>
          </div>
        </div>

        <CardContent>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10 py-5">
            {subjectListLoading && (
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
            {subjectList?.map((classItem) => (
              <SubjectDetailCard
                key={classItem._id}
                subject={classItem}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

      {open && (
        <SubjectDetailFormModal
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default Subjects;
