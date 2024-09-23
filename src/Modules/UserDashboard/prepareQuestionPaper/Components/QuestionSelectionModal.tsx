import SpinningLoader from "@/components/loader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { questionPatternList } from "@/constant/patternList";
import { useUpdateQuestionPaperCategory } from "@/hooks/useQuestionPaper";
import { ILesson } from "@/interfaces/lesson.interface";
import { IQuestionCategory } from "@/interfaces/question-category.interface";
import { IEditQuestionPaperCategoryPayload } from "@/interfaces/question-paper.interface";
import { ILessonListWithQuestion } from "@/interfaces/question.interface";
import PatternViews from "@/Modules/AdminDashboard/Pages/Subjects/Components/PatternViews";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircleWarning } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import zod from "zod";

const questionSelectionFormSchema = zod.object({
  marks: zod.number().nonnegative("Marks must be a positive number."),
  questionPaperId: zod.string().min(1, "Must contain minimum one character"),
  questionCategoryId: zod.string().min(1, "Must contain minimum one character"),
  position: zod.number().nonnegative("Marks must be a positive number."),
  question: zod.array(zod.string()),
  questionInput: zod.string(),
});
type QuestionSelectionFormFields = zod.infer<typeof questionSelectionFormSchema>;

const QuestionSelectionModal = ({
  selectedCategory,
  lessonListWithQuestion,
  lessonListWithQuestionLoading,
  open,
  initialValues,
  setOpen,
}: {
  selectedCategory: IQuestionCategory;
  lessonListWithQuestion: ILessonListWithQuestion[] | undefined;
  lessonListWithQuestionLoading: boolean;
  open: boolean;
  initialValues: null | IEditQuestionPaperCategoryPayload;
  setOpen: Dispatch<
    SetStateAction<{
      open: boolean;
      initialValues: null | IEditQuestionPaperCategoryPayload;
    }>
  >;
}) => {
  const [showPreview, setShowPreview] = useState(false);

  const formMethods = useForm<QuestionSelectionFormFields>({
    resolver: zodResolver(questionSelectionFormSchema),
    mode: "all",
    defaultValues: (initialValues && initialValues) || {
      marks: 0,
      position: 0,
      question: [],
      questionInput: "",
      questionCategoryId: "",
      questionPaperId: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty, isValid },
    setValue,
    getValues,
  } = formMethods;

  const dataDecorator = (data: unknown) => {
    setOpen({
      open: false,
      initialValues: null,
    });
    setShowPreview(false);
    return data;
  };

  const handleQuestionChange = () => {
    const categoryKey = (lessonListWithQuestion?.[0].questions[0].questionCategory as IQuestionCategory)
      ?.selectedPatternKey;

    const questionList = questionPatternList[categoryKey as keyof typeof questionPatternList].method(
      getValues("questionInput")
    );
    setValue("question", questionList as string[]);
  };

  const handleQuestionSelect = (questionInput: string) => {
    const categoryKey = (lessonListWithQuestion?.[0].questions[0].questionCategory as IQuestionCategory)
      ?.selectedPatternKey;

    // const tempQuestionInput = questionPatternList[categoryKey as keyof typeof questionPatternList].revert([
    //   getValues("questionInput"),
    //   questionInput,
    // ]);

    if (getValues("questionInput") && getValues("questionInput") !== "") {
      // inputString[0] = previousValue + " " + inputString;
      if (categoryKey === "question_with_options" || categoryKey === "one_line_question") {
        setValue("questionInput", (getValues("questionInput") + "\n" + questionInput) as string);
      }

      if (categoryKey === "feel_in_the_blanks" || categoryKey === "table_match") {
        setValue("questionInput", questionInput as string);
      }

      if (categoryKey === "word_by_word") {
        setValue("questionInput", (getValues("questionInput") + "," + questionInput) as string);
      }
    } else {
      setValue("questionInput", questionInput as string);
    }

    const questionList = questionPatternList[categoryKey as keyof typeof questionPatternList].method(
      getValues("questionInput")
    );
    // console.log(questionCategory, questionList);

    // setValue("questionInput", questionInput as string);
    setValue("question", questionList as string[]);
  };

  const { mutate: updateQuestionPaperCategory, isPending: questionPaperCategoryUpdating } =
    useUpdateQuestionPaperCategory({ dataDecorator });

  const submitForm: SubmitHandler<QuestionSelectionFormFields> = async (data) => {
    updateQuestionPaperCategory(data);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        dataDecorator(null);
      }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h5 className="text-center">{selectedCategory?.questionCategoryName}</h5>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          <div className="h-[75vh] overflow-y-auto">
            <div>
              <Form {...formMethods}>
                <form
                  onSubmit={handleSubmit(submitForm)}
                  className="space-y-4 sm:space-y-6 p-1">
                  {showPreview ? (
                    <div className="grid gap-4">
                      <div>
                        {/* <h3 className="mb-2 font-bold text-lg">{getLessonById()}</h3> */}
                        <h3 className="mb-2 font-bold text-md">{selectedCategory.questionCategoryName}</h3>
                        {lessonListWithQuestion && (
                          <PatternViews
                            patternKey={selectedCategory.selectedPatternKey}
                            value={getValues("question")}
                          />
                        )}
                      </div>

                      <div className="flex justify-center align-middle gap-14">
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setShowPreview(false);
                          }}>
                          Back
                        </Button>

                        <Button
                          type="submit"
                          className="cursor-pointer"
                          disabled={isSubmitting || !isDirty || !isValid}>
                          {isSubmitting || questionPaperCategoryUpdating ? (
                            <div className="mr-2">
                              <SpinningLoader />
                            </div>
                          ) : null}
                          Submit
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-end align-middle gap-3">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => {
                            dataDecorator(false);
                          }}>
                          Cancel
                        </Button>

                        {/* <Button
                    type="submit"
                    className="cursor-pointer"
                    disabled={isSubmitting || !isDirty || !isValid}>
                    {isSubmitting ? (
                      <div className="mr-2">
                        <SpinningLoader />
                      </div>
                    ) : null}
                    Submit
                  </Button> */}

                        <Button
                          type="button"
                          disabled={isSubmitting || !isDirty || !isValid}
                          onClick={() => {
                            setShowPreview(true);
                          }}
                          className="cursor-pointer">
                          Preview
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <FormField
                          control={control}
                          name="position"
                          render={({ field }) => (
                            <FormItem>
                              <Label htmlFor="position">Question Position</Label>
                              <FormControl>
                                <Input
                                  placeholder="Position No"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage>{errors.position?.message}</FormMessage>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name="marks"
                          render={({ field }) => (
                            <FormItem>
                              <Label htmlFor="marks">Question Marks</Label>
                              <FormControl>
                                <Input
                                  placeholder="Question Marks"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage>{errors.marks?.message}</FormMessage>
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={control}
                        name="questionInput"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex gap-3 align-middle">
                              <Label htmlFor="title">Question</Label>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <MessageCircleWarning size={14} />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <PatternViews
                                      patternKey={selectedCategory.selectedPatternKey}
                                      value={null}
                                    />
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <FormControl>
                              <Textarea
                                placeholder="Type your questions here."
                                id="message"
                                {...field}
                                rows={5}
                                onChange={(e) => {
                                  field.onChange(e.target.value);
                                  handleQuestionChange();
                                }}
                              />
                            </FormControl>
                            <FormMessage>{errors.questionInput?.message}</FormMessage>
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </form>
              </Form>
            </div>
            {!showPreview && (
              <div>
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
                          {(lessonQuestions.lesson as ILesson).lessonNo}.{" "}
                          {(lessonQuestions.lesson as ILesson).lessonName}
                        </AccordionTrigger>

                        <AccordionContent>
                          <div className="flex flex-col gap-10">
                            {lessonQuestions.questions &&
                              lessonQuestions.questions.map((question, index) => (
                                <div key={index}>
                                  <PatternViews
                                    // previousValue={getValues("questionInput")}
                                    func={handleQuestionSelect}
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
            )}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionSelectionModal;
