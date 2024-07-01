import SpinningLoader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import zod from "zod";
import { Dispatch, SetStateAction, useState } from "react";
import { IEditQuestionPayload } from "@/interfaces/question.interface";
import { IClass } from "@/interfaces/class";
import { ISubject } from "@/interfaces/subject.interface";
import { useGetSubjectList } from "@/hooks/useSubject";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddQuestion, useUpdateQuestion } from "@/hooks/useQuestions";

const QuestionFormSchema = zod.object({
  question: zod.string().min(2, {
    message: "Question must be at least 2 characters.",
  }),
  answer: zod.string().min(2, {
    message: "Answer must be at least 2 characters.",
  }),
  questionCategory: zod.string().min(2, {
    message: "Question Category must be at least 2 characters.",
  }),
  classId: zod.string().min(2, {
    message: "Class Id must be at least 2 characters.",
  }),
  subjectId: zod.string().min(2, {
    message: "Subject Id must be at least 2 characters.",
  }),
  // bookId: zod.string().min(2, {
  //   message: "Book Id must be at least 2 characters.",
  // }),
  // bookVersion: zod.string().min(2, {
  //   message: "Book Version must be at least 2 characters.",
  // }),
});

type QuestionFormFields = zod.infer<typeof QuestionFormSchema>;

const QuestionFormModal = ({
  open,
  setOpen,
  initialValues,
  classList,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  initialValues?: IEditQuestionPayload;
  classList: IClass[];
}) => {
  const formMethods = useForm<QuestionFormFields>({
    resolver: zodResolver(QuestionFormSchema),
    mode: "all",
    defaultValues: initialValues || {
      question: "",
      answer: "",
      questionCategory: "",
      classId: classList[0]._id,
      subjectId: "",
      //  bookId: "",
      //  bookVersion: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
    resetField,
    getValues,
    reset,
    // watch
  } = formMethods;

  const [selectedSubject, setSelectedSubject] = useState<ISubject>({} as ISubject);

  const {
    data: subjectList,
    isLoading: isLoadingSubjectList,
    // refetch: refetchSubjectList,
  } = useGetSubjectList({
    filterData: {
      query: {
        class: getValues("classId") as string,
      },
      sortField: "name",
      sortOrder: 1,
    },
  });

  // console.log(errors, "errors");

  const dataDecorator = (data: unknown) => {
    reset();
    setOpen(false);
    return data;
  };

  const submitForm: SubmitHandler<QuestionFormFields> = async (data) => {
    // console.log("form's data", data);
    if (initialValues) {
      updateQuestion({ ...data, _id: initialValues._id, userId: initialValues.userId });
    } else {
      createQuestion({ ...data });
    }
  };

  const { mutate: createQuestion } = useAddQuestion({ dataDecorator });
  const { mutate: updateQuestion } = useUpdateQuestion({ dataDecorator });

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h5 className="text-center">Question</h5>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          <Form {...formMethods}>
            <form
              onSubmit={handleSubmit(submitForm)}
              className="space-y-4 sm:space-y-6 p-1 w-[300px] sm:w-[350px] lg:w-[450px]">
              {!initialValues && (
                <>
                  <FormField
                    control={control}
                    name="classId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              resetField("subjectId");
                            }}
                            defaultValue={field.value}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a Class" />
                            </SelectTrigger>
                            <SelectContent>
                              {classList.map((item) => (
                                <SelectItem
                                  key={item._id}
                                  value={item._id}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage>{errors.classId?.message}</FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="subjectId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select
                          disabled={
                            isLoadingSubjectList || (subjectList && subjectList.length === 0) || !getValues("classId")
                          }
                          onValueChange={(value) => {
                            field.onChange(value);
                            resetField("questionCategory");
                            setSelectedSubject(subjectList?.find((item) => item._id === value) as ISubject);
                          }}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a Subject" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {subjectList &&
                              subjectList.map((item) => (
                                <SelectItem
                                  key={item._id}
                                  value={item._id}>
                                  {item.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage>{errors.subjectId?.message}</FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="questionCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question Category</FormLabel>
                        <Select
                          disabled={
                            isLoadingSubjectList || (subjectList && subjectList.length === 0) || !getValues("subjectId")
                          }
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {selectedSubject?._id &&
                              selectedSubject.questionCategory.map((item) => (
                                <SelectItem
                                  key={item}
                                  value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage>{errors.questionCategory?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormField
                control={control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!getValues("questionCategory")}
                        placeholder="Question here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.question?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!getValues("questionCategory")}
                        placeholder="Answer here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.answer?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="mt-4 cursor-pointer"
                  disabled={isSubmitting || !isDirty}>
                  {isSubmitting ? (
                    <div className="mr-2">
                      <SpinningLoader />
                    </div>
                  ) : null}
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionFormModal;
