import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import zod from "zod";
import { Button } from "@/components/ui/button";
import SpinningLoader from "@/components/loader";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILesson } from "@/interfaces/lesson.interface";
import { useCreateLesson, useUpdateLesson } from "@/hooks/useLesson";

const QuestionCategoryFormSchema = zod.object({
  lessonName: zod.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  lessonNo: zod.number().min(1, {
    message: "Lesson number must be greater than 0.",
  }),
  lessonId: zod.string().min(2, {
    message: "Lesson Id must be at least 2 characters.",
  }),
});

type QuestionCategoryFormFields = zod.infer<typeof QuestionCategoryFormSchema>;

const AddLessonModal = ({
  open,
  setOpen,
  initialValues,
  subjectId,
}: {
  open: boolean;
  setOpen: Dispatch<
    SetStateAction<{
      open: boolean;
      initialValues: null | ILesson;
    }>
  >;
  initialValues: null | ILesson;
  subjectId: string;
}) => {
  const formMethods = useForm<QuestionCategoryFormFields>({
    resolver: zodResolver(QuestionCategoryFormSchema),
    mode: "all",
    defaultValues: initialValues || {
      lessonName: "",
      lessonNo: 1,
      lessonId: "",
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

  const { mutate: createLesson, isPending: createLoading } = useCreateLesson({ dataDecorator });
  const { mutate: updateLesson, isPending: updateLoading } = useUpdateLesson({ dataDecorator });

  const submitForm: SubmitHandler<QuestionCategoryFormFields> = async (data) => {
    dataDecorator(data);

    if (initialValues) {
      updateLesson({
        ...initialValues,
        lessonName: data.lessonName,
        lessonNo: data.lessonNo,
        lessonId: data.lessonId,
      });
    } else {
      createLesson({ ...data, subjectId: subjectId });
    }
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
            <h5 className="text-center">Lesson</h5>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          <Form {...formMethods}>
            <form
              onSubmit={handleSubmit(submitForm)}
              className="space-y-4 sm:space-y-6 p-1 w-[300px] sm:w-[350px] lg:w-[450px]">
              <FormField
                control={control}
                name="lessonNo"
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="lessonNo">Lesson No</label>
                    <FormControl>
                      <Input
                        placeholder="Lesson No here..."
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage>{errors.lessonNo?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="lessonId"
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="lessonId">Lesson Id</label>
                    <FormControl>
                      <Input
                        placeholder="Lesson Id here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.lessonId?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="lessonName"
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="lessonName">Lesson Title</label>
                    <FormControl>
                      <Input
                        placeholder="Lesson Title here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.lessonName?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <div className="flex justify-center align-middle gap-14">
                <Button
                  variant="secondary"
                  disabled={updateLoading || createLoading}
                  onClick={() => {
                    dataDecorator(false);
                  }}>
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={!isDirty || !isValid || updateLoading || createLoading}>
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

export default AddLessonModal;
