import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import zod from "zod";
import { Button } from "@/components/ui/button";
import SpinningLoader from "@/components/loader";
import { IEditClassPayload } from "@/interfaces/class";
import { useCreateClass, useUpdateClass } from "@/hooks/useClass";

const EduBoardFormSchema = zod.object({
  name: zod.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

type EduBoardFormFields = zod.infer<typeof EduBoardFormSchema>;

const ClassFormModal = ({
  open,
  setOpen,
  initialValues,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  initialValues?: IEditClassPayload;
}) => {
  const formMethods = useForm<EduBoardFormFields>({
    resolver: zodResolver(EduBoardFormSchema),
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

  const submitForm: SubmitHandler<EduBoardFormFields> = async (data) => {
    if (initialValues) {
      updateClass({ ...data, id: initialValues.id });
    } else {
      createClass(data);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h5 className="text-center">Create New Class</h5>
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
