import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import zod from "zod";
import { Button } from "@/components/ui/button";
import SpinningLoader from "@/components/loader";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IQuestionCategory } from "@/interfaces/question-category.interface";
import { useCreateQuestionCategory, useUpdateQuestionCategory } from "@/hooks/useQuestionCategory";
import { questionPatternList } from "@/constant/patternList";
import PatternViews from "./PatternViews";

const QuestionCategoryFormSchema = zod.object({
  questionCategoryName: zod.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  selectedPatternKey: zod.string().min(1, {
    message: "code must be at least 2 characters.",
  }),
});

type QuestionCategoryFormFields = zod.infer<typeof QuestionCategoryFormSchema>;

const AddQuestionCategoryModal = ({
  open,
  setOpen,
  subjectId,
  initialValues,
}: {
  open: boolean;
  setOpen: Dispatch<
    SetStateAction<{
      open: boolean;
      initialValues: null | IQuestionCategory;
    }>
  >;
  subjectId: string;
  initialValues: null | IQuestionCategory;
}) => {
  const formMethods = useForm<QuestionCategoryFormFields>({
    resolver: zodResolver(QuestionCategoryFormSchema),
    mode: "all",
    defaultValues: initialValues || {
      questionCategoryName: "",
      selectedPatternKey: "",
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

  const { mutate: createQuestionCategory, isPending: createLoading } = useCreateQuestionCategory({ dataDecorator });
  const { mutate: updateQuestionCategory, isPending: updateLoading } = useUpdateQuestionCategory({ dataDecorator });

  const submitForm: SubmitHandler<QuestionCategoryFormFields> = async (data) => {
    dataDecorator(data);

    if (initialValues) {
      updateQuestionCategory({
        ...initialValues,
        questionCategoryName: data.questionCategoryName,
        selectedPatternKey: data.selectedPatternKey,
      });
    } else {
      createQuestionCategory({ ...data, subjectId: subjectId });
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
            <h5 className="text-center">Category</h5>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          <Form {...formMethods}>
            <form
              onSubmit={handleSubmit(submitForm)}
              className="space-y-4 sm:space-y-6 p-1 w-[300px] sm:w-[350px] lg:w-[450px]">
              <FormField
                control={control}
                name="questionCategoryName"
                render={({ field }) => (
                  <FormItem>
                    <label htmlFor="title">Title</label>
                    <FormControl>
                      <Input
                        placeholder="Subject Name here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.questionCategoryName?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <Controller
                control={formMethods.control}
                name="selectedPatternKey"
                render={({ field }) => (
                  <div className="w-full overflow-x-auto">
                    <div className="flex gap-4 w-auto mb-3">
                      {Object.values(questionPatternList).map((pattern) => (
                        <div
                          key={pattern.id}
                          onClick={() => {
                            field.onChange(pattern.key);
                          }}
                          className="p-3 border-2 rounded-md text-center backdrop-blur-sm bg-slate-600/10 min-w-[250px] w-[300px] cursor-pointer relative">
                          <PatternViews
                            patternKey={pattern.key as string}
                            value={null}
                          />
                          {pattern.key === field.value && (
                            <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-green-600"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
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

export default AddQuestionCategoryModal;
