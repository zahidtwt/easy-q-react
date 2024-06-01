import SpinningLoader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import zod from "zod";
import { IEditInstitutionPayload } from "@/interfaces/institution";
import { Dispatch, SetStateAction } from "react";
import { useCreateInstitution, useUpdateInstitution } from "@/hooks/useInstitution";

const InstitutionBoardFormSchema = zod.object({
  name: zod.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  address: zod.string().min(2, {
    message: "address must be at least 2 characters.",
  }),
  phoneNumber: zod.string().min(2, {
    message: "phoneNumber must be at least 2 characters.",
  }),
  email: zod.string().email({
    message: "Invalid email.",
  }),
  educationBoardId: zod.array(zod.string()).min(1, {
    message: "educationBoardId must be at least 1 characters.",
  }),
  classes: zod.array(zod.string()).min(1, {
    message: "classes must be at least 1 characters.",
  }),
  userId: zod.string().min(2, {
    message: "userId must be at least 2 characters.",
  }),
});

type InstitutionBoardFormFields = zod.infer<typeof InstitutionBoardFormSchema>;

const InstituteFormModal = ({
  open,
  setOpen,
  initialValues,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  initialValues?: IEditInstitutionPayload;
}) => {
  const formMethods = useForm<InstitutionBoardFormFields>({
    resolver: zodResolver(InstitutionBoardFormSchema),
    mode: "all",
    defaultValues: initialValues || {
      name: "",
      address: "",
      phoneNumber: "",
      email: "",
      educationBoardId: [],
      classes: [],
      userId: "",
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

  const { mutate: createInstitution } = useCreateInstitution({ dataDecorator });
  const { mutate: updateInstitution } = useUpdateInstitution({ dataDecorator });

  const submitForm: SubmitHandler<InstitutionBoardFormFields> = async (data) => {
    if (initialValues) {
      updateInstitution({ ...data, id: initialValues.id });
    } else {
      createInstitution(data);
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

              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Class Address here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.address?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Class Phone Number here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.phoneNumber?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Class Email here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="educationBoardId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Class Education Board ID here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.educationBoardId?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="classes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Class Classes here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.classes?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Class User ID here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.userId?.message}</FormMessage>
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

export default InstituteFormModal;
