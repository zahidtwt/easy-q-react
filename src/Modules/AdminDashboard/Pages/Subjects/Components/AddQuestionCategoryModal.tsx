import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import zod from "zod";
import { Button } from "@/components/ui/button";
import SpinningLoader from "@/components/loader";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const QuestionCategoryFormSchema = zod.object({
  title: zod.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  pattern: zod.string().min(1, {
    message: "code must be at least 2 characters.",
  }),
});

type QuestionCategoryFormFields = zod.infer<typeof QuestionCategoryFormSchema>;

const AddQuestionCategoryModal = ({
  open,
  setOpen,
  setMyCategoryFunc,
  initialValues,
}: {
  open: boolean;
  setOpen: Dispatch<
    SetStateAction<{
      open: boolean;
      initialValues: null | {
        title: string;
        pattern: string;
      };
    }>
  >;
  setMyCategoryFunc: (param: { title: string; pattern: string }) => void;
  initialValues?: {
    title: string;
    pattern: string;
  };
}) => {
  const formMethods = useForm<QuestionCategoryFormFields>({
    resolver: zodResolver(QuestionCategoryFormSchema),
    mode: "all",
    defaultValues: initialValues || {
      title: "",
      pattern: "",
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

  const submitForm: SubmitHandler<QuestionCategoryFormFields> = async (data) => {
    //     console.log(data);
    dataDecorator(data);
    setMyCategoryFunc(data);
  };

  const questionPattern = [
    {
      id: "1",
      name: "word_by_word",
      title: "word by word",
      patternDetector: ",",
      element: <p>----, ----, ----</p>,
      method: function name(params: string) {
        return params.split(",");
      },
    },
    {
      id: "2",
      name: "one_line_question",
      title: "one line question",
      patternDetector: "?|",
      element: (
        <div>
          <p>----------?</p>
          <p>----------|</p>
        </div>
      ),
      method: function name(params: string) {
        return params;
      },
    },
    {
      id: "3",
      name: "question_with_options",
      patternDetector: "?|,,,",
      element: <p>----------? ----, ----, ----, ----</p>,
      method: function name(params: string) {
        return params;
      },
    },
    {
      id: "4",
      name: "table_match",
      patternDetector: "| ,",
      element: (
        <div>
          <p>---- | ----</p>
          <p>---- | ----</p>
          <p>---- | ----</p>
        </div>
      ),
      method: function name(params: string) {
        return params;
      },
    },
    {
      id: "5",
      name: "feel_in_the_blanks",
      patternDetector: "|,",
      element: (
        <div>
          <p>----___----,</p>
          <p>----___----|</p>
          <p>----___----?</p>
        </div>
      ),
      method: function name(params: string) {
        return params;
      },
    },
    {
      id: "6",
      name: "question_with_story",
      patternDetector: "||?",
      element: (
        <div className="text-start">
          <p>-----------------</p>
          <p>---------- ||</p>
          <p>----?</p>
          <p>----?</p>
          <p>----?</p>
          <p>----?</p>
        </div>
      ),
      method: function name(params: string) {
        return params;
      },
    },
  ];

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

              {/* field.onChange(fileUrl); */}
              <Controller
                control={formMethods.control}
                name="pattern"
                render={({ field }) => (
                  <div className="w-full overflow-x-auto">
                    <div className="flex gap-4 w-auto">
                      {questionPattern.map((pattern) => (
                        <div
                          key={pattern.id}
                          onClick={() => {
                            field.onChange(pattern.id);
                          }}
                          className="p-3 border-2 rounded-md text-center backdrop-blur-sm bg-slate-600/10 min-w-[250px] w-[300px] cursor-pointer relative">
                          {pattern.element}
                          {pattern.id === field.value && (
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

export default AddQuestionCategoryModal;
