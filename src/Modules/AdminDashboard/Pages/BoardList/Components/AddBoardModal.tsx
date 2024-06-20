import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import zod from "zod";
import { useCreateEducationBoard, useUpdateEducationBoard } from "@/hooks/useEducationBoard";
import { IEditEducationBoardPayload } from "@/interfaces/education-board";
import { useFileUpload } from "@/hooks/useFileUpload";
import { Button } from "@/components/ui/button";
import SpinningLoader from "@/components/loader";
import ImageUploadField from "@/components/ImageUploadField";

const EduBoardFormSchema = zod.object({
  name: zod.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  address: zod.string().min(1, {
    message: "Address must be at least 1 characters.",
  }),
  imageURL: zod.string(),
});

type EduBoardFormFields = zod.infer<typeof EduBoardFormSchema>;

const AddBoardModal = ({
  open,
  setOpen,
  initialValues,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  initialValues?: IEditEducationBoardPayload;
}) => {
  const formMethods = useForm<EduBoardFormFields>({
    resolver: zodResolver(EduBoardFormSchema),
    mode: "all",
    defaultValues: initialValues || {
      name: "",
      address: "",
      imageURL: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = formMethods;

  const [imageFile, setImageFile] = useState<File | null>(null);

  const dataDecorator = (data: unknown) => {
    setOpen(false);
    return data;
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

  const submitForm: SubmitHandler<EduBoardFormFields> = async (data) => {
    // console.log(data);
    if (initialValues) {
      updateBoard({ ...data, _id: initialValues._id });
    } else {
      createBoard(data);
    }
  };

  const { mutateAsync: fileUploadFunc, isError, isPending: fileUploading } = useFileUpload({});
  const { mutate: createBoard } = useCreateEducationBoard({ dataDecorator });
  const { mutate: updateBoard } = useUpdateEducationBoard({ dataDecorator });

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h5 className="text-center">Create New Board</h5>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          <Form {...formMethods}>
            <form
              onSubmit={handleSubmit(submitForm)}
              className="space-y-4 sm:space-y-6 p-1 w-[300px] sm:w-[350px] lg:w-[450px]">
              <Controller
                control={formMethods.control}
                name="imageURL"
                render={({ field }) => (
                  <ImageUploadField
                    handleImageUpload={handleImageUpload}
                    field={field}
                    imageFile={imageFile}
                    fileUploading={fileUploading}
                    initialImageUrl={initialValues?.imageURL}
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
                        placeholder="Board Name here..."
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
                        placeholder="Write your board address here..."
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
                  disabled={isSubmitting || !isDirty || fileUploading}>
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

export default AddBoardModal;
