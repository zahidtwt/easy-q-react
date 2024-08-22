import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import zod from "zod";
import { Button } from "@/components/ui/button";
import SpinningLoader from "@/components/loader";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IQuestionPayload } from "@/interfaces/question.interface";
import { IQuestionCategory } from "@/interfaces/question-category.interface";
import { ILesson } from "@/interfaces/lesson.interface";

const QuestionFormSchema = zod.object({
  question: zod.array(zod.string()).nonempty({
    message: "Question is required.",
  }),
  questionCategory: zod.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  lesson: zod.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

type QuestionFormFields = zod.infer<typeof QuestionFormSchema>;

const AddQuestionModal = ({
  open,
  setOpen,
  initialValues,
  questionCategoryList,
  lessonList,
}: {
  open: boolean;
  setOpen: Dispatch<
    SetStateAction<{
      open: boolean;
      initialValues: null | IQuestionPayload;
    }>
  >;
  initialValues: null | IQuestionPayload;
  questionCategoryList: IQuestionCategory[];
  lessonList: ILesson[];
}) => {
  const formMethods = useForm<QuestionFormFields>({
    resolver: zodResolver(QuestionFormSchema),
    mode: "all",
    defaultValues: initialValues || {
      questionCategory: "",
      lesson: "",
      question: [],
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty, isValid },
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

  const submitForm: SubmitHandler<QuestionFormFields> = async (data) => {
    dataDecorator(data);
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
            <h5 className="text-center">Subject Details</h5>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          <Form {...formMethods}>
            <form
              onSubmit={handleSubmit(submitForm)}
              className="space-y-4 sm:space-y-6 p-1 w-[300px] sm:w-[350px] lg:w-[450px]">
              <FormField
                control={control}
                name="lesson"
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="lesson">Lesson</label>
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
                    <label htmlFor="questionCategory">Question Category</label>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
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
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="title">Question</label>
                    <FormControl>
                      <Input
                        placeholder="Subject Name here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.question?.message}</FormMessage>
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
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionModal;
