import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ClassSkeleton from "../ClassList/Components/ClassSkeleton";
import { useParams } from "react-router-dom";
import { useGetClassDetail } from "@/hooks/useClass";
import { useGetSubjectList } from "@/hooks/useSubject";

// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import ClassDetailFormModal from "./Components/SubjectDetailFormModal";
import SubjectDetailCard from "./Components/SubjectDetailCard";

const ClassDetail = () => {
  const { id } = useParams();
  let filterData = {
    query: {},
    sortField: "name",
    sortOrder: 1,
  };

  if (id) {
    filterData = { ...filterData, query: { class: id } };
  }

  const { data: classDetail } = useGetClassDetail({ id: id });
  const { data: subjectList, isLoading: subjectListLoading } = useGetSubjectList({
    filterData,
  });

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

            {/* <div className="px-10">
              {!subjectListLoading && (
                <Accordion
                  type="single"
                  collapsible>
                  {subjectList &&
                    subjectList.length &&
                    subjectList?.map((subject) => (
                      <AccordionItem
                        key={subject._id}
                        value={subject._id}>
                        <AccordionTrigger className="uppercase">{subject.name}</AccordionTrigger>
                        <AccordionContent>
                          <div>
                            <p className="text-sm font-medium leading-none mb-3">
                              Code
                              {<p className="text-sm text-muted-foreground">{subject?.code ? subject?.code : "###"}</p>}
                            </p>

                            <p className="text-sm font-medium leading-none mb-3">
                              Status {<p className="text-sm text-muted-foreground">{subject.active}</p>}
                            </p>

                            <div>
                              <p className="text-sm font-medium leading-none mb-2">Question Category:</p>
                              <div>
                                <Badge variant="outline">{"accountStatus"}</Badge>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              )}
            </div> */}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>

      {id && (
        <ClassDetailFormModal
          classId={id}
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default ClassDetail;
