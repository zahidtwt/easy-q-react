import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FilePenLine, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddQuestionCategoryModal from "./Components/AddQuestionCategoryModal";
import AddLessonModal from "./Components/AddLessonModal";
import AddQuestionModal from "./Components/AddQuestionModal";
import { useGetQuestionCategoryList } from "@/hooks/useQuestionCategory";
import { IQuestionCategory } from "@/interfaces/question-category.interface";
import { useGetLessonList } from "@/hooks/useLesson";
import { ILesson } from "@/interfaces/lesson.interface";
import { IEditQuestionPayload } from "@/interfaces/question.interface";
import { useGetQuestionList } from "@/hooks/useQuestions";
import PatternViews from "./Components/PatternViews";

interface IOpenLessonFormType {
  open: boolean;
  initialValues: null | ILesson;
}

interface IOpenCategoryFormType {
  open: boolean;
  initialValues: null | IQuestionCategory;
}
interface IOpenQuestionFormType {
  open: boolean;
  initialValues: null | IEditQuestionPayload;
}

const SubjectDetail = () => {
  const { subjectId, subjectName } = useParams();

  const [openLessonForm, setOpenLessonForm] = useState<IOpenLessonFormType>({
    open: false,
    initialValues: null,
  });
  const [openCategoryForm, setOpenCategoryForm] = useState<IOpenCategoryFormType>({
    open: false,
    initialValues: null,
  });
  const [openQuestionForm, setOpenQuestionForm] = useState<IOpenQuestionFormType>({
    open: false,
    initialValues: null,
  });

  const { data: questionCategoryList, isLoading: questionCategoryListLoading } = useGetQuestionCategoryList({
    filterData: { subjectId: subjectId || "" },
  });

  const { data: lessonList, isLoading: lessonListLoading } = useGetLessonList({
    filterData: { subjectId: subjectId || "" },
  });

  const { data: lessonListWithQuestion, isLoading: lessonListWithQuestionLoading } = useGetQuestionList({
    filterData: {
      query: {
        subject: subjectId || "",
      },
      sortField: "lessonNo",
      sortOrder: 1,
    },
  });

  return (
    <div className="container mt-8 pb-8">
      <div className="border-2 border-gray-400 rounded-md p-3">
        <h1 className="text-center text-3xl border-b-gray-400 border-b-2 mb-6 pb-2 uppercase">{subjectName}</h1>

        <div className="grid grid-cols-9 gap-8">
          <div className="col-span-3 border-r-gray-400 border-r-2 pr-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Question Category  */}
              <div className="">
                <div className="flex justify-between">
                  <h4 className="text-xl font-semibold mb-2">Question Category List: </h4>
                  <Button
                    onClick={() =>
                      setOpenCategoryForm({
                        open: true,
                        initialValues: null,
                      })
                    }
                    size="sm"
                    className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Category</span>
                  </Button>
                </div>

                <div className="container mx-auto p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <ul className="list-disc pl-5">
                        {!questionCategoryListLoading &&
                          questionCategoryList &&
                          questionCategoryList.map((category, index) => (
                            <li
                              key={index}
                              onClick={() =>
                                setOpenCategoryForm({
                                  open: true,
                                  initialValues: category,
                                })
                              }>
                              {category.questionCategoryName}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lesson List */}
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="text-xl font-semibold mb-2">Lesson List: </h4>
                  <Button
                    onClick={() =>
                      setOpenLessonForm({
                        open: true,
                        initialValues: null,
                      })
                    }
                    size="sm"
                    className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Lesson</span>
                  </Button>
                </div>
                <div className="container mx-auto p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <ul className="list-disc pl-5">
                        {!lessonListLoading &&
                          lessonList &&
                          lessonList.map((lesson, index) => (
                            <li
                              key={index}
                              onClick={() =>
                                setOpenLessonForm({
                                  open: true,
                                  initialValues: lesson,
                                })
                              }>
                              {lesson.lessonName}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* lesson accordion */}
          <div className="col-span-6">
            <div className="flex justify-end mb-3">
              <Button
                onClick={() =>
                  setOpenQuestionForm({
                    open: true,
                    initialValues: null,
                  })
                }
                className="cursor-pointer">
                Add Question
              </Button>
            </div>

            {lessonListWithQuestionLoading ? (
              <div className="animate-pulse">
                <div className="w-full flex justify-between border-b-2 border-gray-400 mb-2">
                  <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-10 bg-gray-300 rounded w-24"></div>
                </div>
                <div className="mt-4 space-y-6 ml-6">
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded mt-2"></div>
                    <div className="h-4 bg-gray-200 rounded mt-2"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded mt-2"></div>
                    <div className="h-4 bg-gray-200 rounded mt-2"></div>
                    <div className="h-4 bg-gray-200 rounded mt-2"></div>
                    <div className="h-4 bg-gray-200 rounded mt-2"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded mt-2"></div>
                    <div className="h-4 bg-gray-200 rounded mt-2"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded mt-2"></div>
                    <div className="h-4 bg-gray-200 rounded mt-2"></div>
                  </div>
                </div>
              </div>
            ) : (
              lessonListWithQuestion?.map((lessonQuestions) => (
                <Accordion
                  key={lessonQuestions._id}
                  type="single"
                  collapsible
                  className="w-full">
                  <AccordionItem value={"1"}>
                    <div className="w-full flex justify-between border-b-2 border-gray-400 mb-2"></div>

                    <AccordionTrigger className="text-lg font-semibold uppercase">
                      {(lessonQuestions.lesson as ILesson).lessonNo}. {(lessonQuestions.lesson as ILesson).lessonName}
                    </AccordionTrigger>

                    <AccordionContent>
                      <div className="flex flex-col gap-10 ml-6">
                        {lessonQuestions.questions &&
                          lessonQuestions.questions.map((question, index) => (
                            <div key={index}>
                              <div
                                onClick={() =>
                                  setOpenQuestionForm({
                                    open: true,
                                    initialValues: {
                                      ...question,
                                      lesson: (lessonQuestions.lesson as ILesson)._id,
                                      questionCategory: question.questionCategory as IQuestionCategory,
                                    },
                                  })
                                }
                                className="text-base font-semibold leading-none pt-1 mb-4 flex gap-4 align-middle cursor-pointer">
                                {(question.questionCategory as IQuestionCategory).questionCategoryName}
                                <FilePenLine size={16} />
                              </div>

                              <PatternViews
                                patternKey={(question.questionCategory as IQuestionCategory).selectedPatternKey}
                                value={question.question}
                              />
                            </div>
                          ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))
            )}
          </div>
        </div>
      </div>

      {openCategoryForm.open && subjectId && (
        <AddQuestionCategoryModal
          open={openCategoryForm.open}
          setOpen={setOpenCategoryForm}
          subjectId={subjectId}
          initialValues={openCategoryForm.initialValues}
        />
      )}

      {openLessonForm.open && subjectId && (
        <AddLessonModal
          open={openLessonForm.open}
          setOpen={setOpenLessonForm}
          initialValues={openLessonForm.initialValues}
          subjectId={subjectId}
        />
      )}

      {openQuestionForm.open && questionCategoryList && lessonList && subjectId && (
        <AddQuestionModal
          open={openQuestionForm.open}
          setOpen={setOpenQuestionForm}
          initialValues={openQuestionForm.initialValues}
          questionCategoryList={questionCategoryList}
          lessonList={lessonList}
          subject={subjectId}
        />
      )}
    </div>
  );
};

export default SubjectDetail;

// <Accordion
//   type="single"
//   collapsible
//   className="w-full"
//   key={index}>
//   <AccordionItem value={question._id}>
//     <div className="w-full flex justify-between border-b-2 border-gray-400 mb-2">
//       <Button
//         onClick={() =>
//           setOpenQuestionForm({
//             open: true,
//             initialValues: question,
//           })
//         }
//         className="cursor-pointer">
//         Edit Question
//       </Button>
//     </div>

//     <AccordionTrigger className="text-lg font-semibold uppercase">{question.question}</AccordionTrigger>

//     <AccordionContent>
//       <div className="flex flex-col gap-10 ml-6">
//         <div className="">
//           <p className="text-base font-semibold leading-none mb-2">{question.question}</p>
//           <p>{question.answer}</p>
//         </div>
//         <div className="">
//           <p className="text-base font-semibold leading-none mb-2">{question.question}</p>
//           <p>{question.answer}</p>
//         </div>
//         <div className="">
//           <p className="text-base font-semibold leading-none mb-2">{question.question}</p>
//           <p>{question.answer}</p>
//         </div>
//         <div className="">
//           <p className="text-base font-semibold leading-none mb-2">{question.question}</p>
//           <p>{question.answer}</p>
//         </div>
//         <div className="">
//           <p className="text-base font-semibold leading-none mb-2">{question.question}</p>
//           <p>{question.answer}</p>
//         </div>
//       </div>
//     </AccordionContent>
//   </AccordionItem>
// </Accordion>
