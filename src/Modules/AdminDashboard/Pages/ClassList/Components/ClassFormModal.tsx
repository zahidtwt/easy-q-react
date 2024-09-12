import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import zod from "zod";
import { Button } from "@/components/ui/button";
import SpinningLoader from "@/components/loader";
import { useCreateClass, useUpdateClass } from "@/hooks/useClass";
import { IEditClassPayload } from "@/interfaces/class.interface";

const classFormSchema = zod.object({
  name: zod.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

type classFormFields = zod.infer<typeof classFormSchema>;

const ClassFormModal = ({
  open,
  setOpen,
  boardId,
  initialValues,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  boardId: string;
  initialValues?: IEditClassPayload;
}) => {
  const formMethods = useForm<classFormFields>({
    resolver: zodResolver(classFormSchema),
    mode: "all",
    defaultValues: initialValues || {
      name: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = formMethods;

  const dataDecorator = (data: unknown) => {
    setOpen(false);
    return data;
  };

  const { mutate: createClass } = useCreateClass({ dataDecorator });
  const { mutate: updateClass } = useUpdateClass({ dataDecorator });

  const submitForm: SubmitHandler<classFormFields> = async (data) => {
    if (initialValues) {
      updateClass({ ...data, _id: initialValues._id });
    } else {
      createClass({ ...data, subjectList: [], educationBoard: boardId });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h5 className="text-center">Class Details</h5>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          <Form {...formMethods}>
            <form
              onSubmit={handleSubmit(submitForm)}
              className="space-y-4 sm:space-y-6 p-1 w-[300px] sm:w-[350px] lg:w-[450px]">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Class Name here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.name?.message}</FormMessage>
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

export default ClassFormModal;
