import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useGetClassList } from "@/hooks/useClass";
import { useGetSubjectList } from "@/hooks/useSubject";
// import { IClass } from "@/interfaces/class";
import { ISubject } from "@/interfaces/subject.interface";
import { ListFilter, PlusCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useGetQuestionList } from "@/hooks/useQuestions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import QuestionFormModal from "./Components/QuestionFormModal";
import { IClassRes } from "@/interfaces/class.interface";

const QuestionsList = () => {
  const defaultSubject = {
    _id: "all",
    name: "All",
    code: "",
    class: "",
    questionCategory: [],
    active: "active",
  };

  const [selectedClass, setSelectedClass] = useState<IClassRes>({} as IClassRes);
  const [selectedSubject, setSelectedSubject] = useState<ISubject>(defaultSubject as ISubject);
  const [queryText, setQueryText] = useState("");

  const [open, setOpen] = useState(false);

  const subjectDecorator = (data: unknown) => {
    if (Array.isArray(data) && data.length) {
      return [defaultSubject, ...data];
    }
    return [];
  };

  // const debouncedSearch = debounce(async () => {
  //   // Simulate API call (replace with actual API call)
  //   const fakeAPICall = new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(`Search results for: ${queryText}`);
  //     }, 1000); // Simulating a 1-second API response time
  //   });

  //   const result = await fakeAPICall;
  //   return result;
  // }, 500); // Adjust the delay according to your needs (here, it's 500 milliseconds)

  const debouncedSearch = debounce((value: string) => {
    setQueryText(value);
  }, 2000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    debouncedSearch(value);
  };

  const { data: classList, isLoading: isLoadingClassList } = useGetClassList({ boardId: "" }); // add the boardId

  const {
    data: subjectList,
    isLoading: isLoadingSubjectList,
    refetch: refetchSubjectList,
  } = useGetSubjectList({
    filterData: {
      query: {
        class: selectedClass?._id || "",
      },
      sortField: "name",
      sortOrder: 1,
    },
    dataDecorator: subjectDecorator,
  });

  const { data: questionList, isLoading: isLoadingQuestionList } = useGetQuestionList({
    filterData: {
      query: {
        classId: selectedClass?._id || "",
        subjectId: selectedSubject?._id || "",
        queryText: queryText || "",
      },
      sortField: "question",
      sortOrder: 1,
    },
  });

  useEffect(() => {
    if (classList?.length) {
      setSelectedClass(classList[0] as IClassRes);
    }
  }, [classList]);

  useEffect(() => {
    refetchSubjectList();
  }, [selectedClass, refetchSubjectList]);

  return (
    <div className="container mt-8">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader className="flex flex-row justify-center align-middle">
          <CardTitle className="w-auto pt-6">Question List</CardTitle>

          <div className="ml-auto flex items-center gap-2 p-3">
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground z-10" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                // value={queryText}
                onChange={handleInputChange}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Class</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Choose Class</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isLoadingClassList && <DropdownMenuCheckboxItem disabled>Loading...</DropdownMenuCheckboxItem>}
                {!isLoadingClassList &&
                  classList?.length &&
                  classList?.map((classItem) => (
                    <DropdownMenuCheckboxItem
                      key={classItem._id}
                      checked={classItem._id === selectedClass?._id}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedClass(classItem);
                          setSelectedSubject(defaultSubject as ISubject);
                        }
                      }}>
                      {classItem.name}{" "}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Subject</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Choose Subject</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {isLoadingSubjectList && <DropdownMenuCheckboxItem disabled>Loading...</DropdownMenuCheckboxItem>}
                {!isLoadingSubjectList &&
                  subjectList?.length &&
                  subjectList?.map((subjectItem) => (
                    <DropdownMenuCheckboxItem
                      key={subjectItem._id}
                      checked={subjectItem._id === selectedSubject?._id}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedSubject(subjectItem);
                        }
                      }}>
                      {subjectItem.name}{" "}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={() => setOpen(true)}
              size="sm"
              className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Question</span>
            </Button>
          </div>
        </CardHeader>

        <CardDescription className="w-full flex justify-center">
          <div className="w-4/5 border rounded-md m-3 p-3">
            {isLoadingQuestionList ? (
              <div>Loading...</div>
            ) : (
              <div>
                {questionList?.length && questionList?.length > 0 ? (
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full">
                    {questionList?.map((question) => (
                      <AccordionItem
                        key={question._id}
                        value={question._id}>
                        <AccordionTrigger className="uppercase">
                          {question.questions[0].question}
                          <Badge
                            className="ml-auto font-normal text-xs"
                            variant="secondary">
                            {question.questions[0].question}
                          </Badge>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div>
                            <div>
                              <p className="text-sm font-medium leading-none mb-2">Question Detail:</p>
                              <p>{question.questions[0].question}</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div>No questions found</div>
                )}
              </div>
            )}
          </div>
        </CardDescription>
      </Card>

      {classList && (
        <QuestionFormModal
          open={open}
          setOpen={setOpen}
          classList={classList}
        />
      )}
    </div>
  );
};

export default QuestionsList;
