import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import zod from "zod";
import { Button } from "@/components/ui/button";
import SpinningLoader from "@/components/loader";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const QuestionCategoryFormSchema = zod.object({
  title: zod.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

type QuestionCategoryFormFields = zod.infer<typeof QuestionCategoryFormSchema>;

const AddLessonModal = ({
  open,
  setOpen,
  setLessonListFunc,
  initialValues,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setLessonListFunc: (param: string) => void;
  initialValues?: {
    title: string;
  };
}) => {
  const formMethods = useForm<QuestionCategoryFormFields>({
    resolver: zodResolver(QuestionCategoryFormSchema),
    mode: "all",
    defaultValues: initialValues || {
      title: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
  } = formMethods;

  const dataDecorator = (data: unknown) => {
    setOpen(false);
    reset();
    return data;
  };

  const submitForm: SubmitHandler<QuestionCategoryFormFields> = async (data) => {
    //     console.log(data);
    dataDecorator(data);
    setLessonListFunc(data.title);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="title">Title</label>
                    <FormControl>
                      <Input
                        placeholder="Subject Name here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.title?.message}</FormMessage>
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

export default AddLessonModal;
