import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ClassSkeleton from "../ClassList/Components/ClassSkeleton";
import { useParams } from "react-router-dom";
import { useGetClassDetail } from "@/hooks/useClass";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
// import ClassDetailFormModal from "./Components/SubjectDetailFormModal";
import SubjectCard from "../Subjects/Components/SubjectCard";
import AddSubjectInClassModal from "./Components/AddSubjectInClassModal";
import { ISubject } from "@/interfaces/subject.interface";
import { IClassRes } from "@/interfaces/class.interface";

const ClassDetail = () => {
  const { id } = useParams();
  let selectedSubject: string[] = [];
  // let filterData = {
  //   query: {},
  //   sortField: "name",
  //   sortOrder: 1,
  // };

  // if (id) {
  //   filterData = { ...filterData, query: { class: id } };
  // }
  const dataDecorator = (data: IClassRes) => {
    const tempData: string[] = [];

    data.subjectList.map((subject: ISubject) => {
      tempData.push(subject._id);
    });

    selectedSubject = [...tempData];
    return data;
  };

  const { data: classDetail, isLoading: classDetailLoading } = useGetClassDetail({ dataDecorator, id: id });

  // const { data: subjectList, isLoading: subjectListLoading } = useGetSubjectList({
  //   filterData,
  // });

  const [open, setOpen] = useState(false);

  //   console.log(subjectList, classDetail);
  return (
    <div>
      <div className="container mt-8">
        <Card x-chunk="dashboard-06-chunk-0">
          <div className="flex justify-between items-center">
            <CardHeader>
              <CardTitle> {classDetail?.name} Subject List</CardTitle>
            </CardHeader>

            <div className="ml-auto flex items-center gap-2 p-3">
              <Button
                onClick={() => setOpen(true)}
                size="sm"
                className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Subject</span>
              </Button>
            </div>
          </div>

          <CardContent>
            <CardContent>
              <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10 py-5">
                {classDetailLoading && (
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
                {classDetail?.subjectList?.map((subject) => (
                  <SubjectCard
                    key={subject._id}
                    subject={subject}
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter></CardFooter>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>

      {id && (
        <AddSubjectInClassModal
          open={open}
          setOpen={setOpen}
          chosenSubject={selectedSubject}
          classId={id}
        />
      )}
    </div>
  );
};

export default ClassDetail;
