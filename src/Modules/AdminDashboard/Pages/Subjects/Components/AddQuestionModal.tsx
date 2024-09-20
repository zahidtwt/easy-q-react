import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import zod from "zod";
import { Button } from "@/components/ui/button";
import SpinningLoader from "@/components/loader";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IEditQuestionPayload } from "@/interfaces/question.interface";
import { IQuestionCategory } from "@/interfaces/question-category.interface";
import { ILesson } from "@/interfaces/lesson.interface";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { questionPatternList } from "@/constant/patternList";
import { useAddQuestion, useUpdateQuestion } from "@/hooks/useQuestions";
import { MessageCircleWarning } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import PatternViews from "./PatternViews";
// import QuestionPreviewArea from "./QuestionPreviewArea";

const QuestionFormSchema = zod.object({
  lesson: zod.string().min(2, {
    message: " Lesson is required.",
  }),
  questionCategory: zod.string().min(2, {
    message: "Question Category is required.",
  }),
  question: zod.array(zod.string()),
  questionInput: zod.string().min(2, {
    message: "Question is required.",
  }),
});

type QuestionFormFields = zod.infer<typeof QuestionFormSchema>;

const AddQuestionModal = ({
  open,
  setOpen,
  initialValues,
  questionCategoryList,
  lessonList,
  subject,
}: {
  open: boolean;
  setOpen: Dispatch<
    SetStateAction<{
      open: boolean;
      initialValues: null | IEditQuestionPayload;
    }>
  >;
  initialValues: null | IEditQuestionPayload;
  questionCategoryList: IQuestionCategory[];
  lessonList: ILesson[];
  subject: string;
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [questionCategory, setQuestionCategory] = useState<IQuestionCategory | null>(
    (initialValues?.questionCategory as IQuestionCategory) ?? null
  );

  const formMethods = useForm<QuestionFormFields>({
    resolver: zodResolver(QuestionFormSchema),
    mode: "all",
    defaultValues: (initialValues && {
      lesson: initialValues.lesson,
      questionCategory: (initialValues.questionCategory as IQuestionCategory)._id,
      question: initialValues.question,
      questionInput: initialValues.questionInput,
    }) || {
      lesson: "",
      questionCategory: "",
      question: [],
      questionInput: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty, isValid },
    setValue,
    getValues,
    reset,
  } = formMethods;

  const dataDecorator = (data: unknown) => {
    setOpen({
      open: false,
      initialValues: null,
    });
    reset();
    return data;
  };

  const { mutate: createQuestion } = useAddQuestion({ dataDecorator });
  const { mutate: updateQuestion } = useUpdateQuestion({ dataDecorator });

  const getQuestionCategoryDetailById = (categoryId: string) => {
    const currCategory = questionCategoryList.find((category) => category._id === categoryId);
    setQuestionCategory(currCategory as IQuestionCategory);
  };

  const getLessonById = () => {
    const currCategory = lessonList.find((lesson) => lesson._id === getValues("lesson"));
    return currCategory?.lessonName;
  };

  const handleQuestionChange = () => {
    const categoryKey = questionCategory?.selectedPatternKey;
    const questionList = questionPatternList[categoryKey as keyof typeof questionPatternList].method(
      getValues("questionInput")
    );
    // console.log(questionCategory, questionList);

    setValue("question", questionList as string[]);
  };

  const submitForm: SubmitHandler<QuestionFormFields> = async (data) => {
    // dataDecorator(data);
    // console.log({ ...data, subject });
    // return;
    if (initialValues) {
      updateQuestion({
        ...data,
        subject,
        _id: initialValues._id,
        tags: initialValues.tags,
      });
    } else {
      createQuestion({ ...data, subject });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        dataDecorator(null);
      }}>
      <DialogContent className="max-h-[80vh] overflow-x-auto">
        <DialogHeader>
          <DialogTitle>
            <h5 className="text-center">Question</h5>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          <Form {...formMethods}>
            <form
              onSubmit={handleSubmit(submitForm)}
              className="space-y-4 sm:space-y-6 p-1">
              {showPreview ? (
                <div className="grid gap-4">
                  <div>
                    <h3 className="mb-2 font-bold text-lg">{getLessonById()}</h3>
                    <h3 className="mb-2 font-bold text-md">{questionCategory?.questionCategoryName}</h3>
                    <PatternViews
                      patternKey={questionCategory?.selectedPatternKey as string}
                      value={getValues("question")}
                    />
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
                      {isSubmitting ? (
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
                  <FormField
                    control={control}
                    name="lesson"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="lesson">Lesson</Label>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a lesson" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {lessonList.map((lesson, index) => (
                              <SelectItem
                                key={index}
                                value={lesson._id}>
                                {lesson.lessonName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage>{errors.lesson?.message}</FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="questionCategory"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="questionCategory">Question Category</Label>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            getQuestionCategoryDetailById(value);
                          }}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Question Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {questionCategoryList.map((category, index) => (
                              <SelectItem
                                key={index}
                                value={category._id}>
                                {category.questionCategoryName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage>{errors.questionCategory?.message}</FormMessage>
                      </FormItem>
                    )}
                  />

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
                                {getValues("questionCategory") ? (
                                  <PatternViews
                                    patternKey={questionCategory?.selectedPatternKey as string}
                                    value={null}
                                  />
                                ) : (
                                  <p>No category Selected</p>
                                )}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <FormControl>
                          <Textarea
                            disabled={!getValues("questionCategory")}
                            placeholder="Type your questions here."
                            id="message"
                            {...field}
                            rows={10}
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

                  <div className="flex justify-center align-middle gap-14">
                    <Button
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
                      disabled={isSubmitting || !isDirty || !isValid}
                      onClick={() => {
                        setShowPreview(true);
                      }}
                      className="cursor-pointer">
                      Preview
                    </Button>
                  </div>
                </>
              )}
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionModal;
