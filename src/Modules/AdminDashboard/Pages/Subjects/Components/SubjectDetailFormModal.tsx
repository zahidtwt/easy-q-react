import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import zod from "zod";
import { Button } from "@/components/ui/button";
import SpinningLoader from "@/components/loader";
import { useAddSubject, useUpdateSubject } from "@/hooks/useSubject";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IEditSubjectPayload } from "@/interfaces/subject.interface";
import ImageUploadField from "@/components/ImageUploadField";
import { useFileUpload } from "@/hooks/useFileUpload";

const SubjectDetailFormSchema = zod.object({
  name: zod.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  code: zod.string().min(2, {
    message: "code must be at least 2 characters.",
  }),
  coverPhoto: zod.string(),
  active: zod.enum(["active", "inactive"]),
});

type SubjectDetailFormFields = zod.infer<typeof SubjectDetailFormSchema>;

const SubjectDetailFormModal = ({
  open,
  setOpen,
  initialValues,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  initialValues?: IEditSubjectPayload;
}) => {
  const formMethods = useForm<SubjectDetailFormFields>({
    resolver: zodResolver(SubjectDetailFormSchema),
    mode: "all",
    defaultValues: initialValues || {
      name: "",
      code: "",
      coverPhoto: "",
      active: "active",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = formMethods;

  const [imageFile, setImageFile] = useState<File | null>(null);

  const dataDecorator = (data: unknown) => {
    setOpen(false);
    reset();
    return data;
  };

  const submitForm: SubmitHandler<SubjectDetailFormFields> = async (data) => {
    if (initialValues) {
      updateSubject({ ...data, _id: initialValues._id });
    } else {
      createSubject({ ...data });
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files![0];
      setImageFile(file);

      const formData = new FormData();
      formData.append("image", file);

      const resData = await fileUploadFunc(formData);
      if (isError) {
        setImageFile(null);
        return;
      }

      return resData;
    } catch (error) {
      if (isError) {
        setImageFile(null);
      }
    }
  };

  const { mutateAsync: fileUploadFunc, isError, isPending: fileUploading } = useFileUpload({});
  const { mutate: createSubject } = useAddSubject({ dataDecorator });
  const { mutate: updateSubject, isPending: updatingSubject } = useUpdateSubject({ dataDecorator });

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        reset();
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
              <Controller
                control={formMethods.control}
                name="coverPhoto"
                render={({ field }) => (
                  <ImageUploadField
                    handleImageUpload={handleImageUpload}
                    field={field}
                    imageFile={imageFile}
                    fileUploading={fileUploading}
                    initialImageUrl={initialValues?.coverPhoto}
                  />
                )}
              />

              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Subject Name here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.name?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Subject Code here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.code?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="active"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage>{errors.active?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="mt-4 cursor-pointer"
                  disabled={isSubmitting || !isDirty}>
                  {isSubmitting || updatingSubject ? (
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

export default SubjectDetailFormModal;
