import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import zod from "zod";
import { SubmitButton } from "@/components/custom-buttons";
import { useCreateEducationBoard } from "@/hooks/useEducationBoard";
import { UploadCloud } from "lucide-react";

const EduBoardFormSchema = zod.object({
  name: zod.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  address: zod.string().min(1, {
    message: "Address must be at least 1 characters.",
  }),
  imageUrl: zod.string(),
});

type EduBoardFormFields = zod.infer<typeof EduBoardFormSchema>;

const AddBoardModal = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const dataDecorator = (data: unknown) => {
    setOpen(false);
    return data;
  };
  const { mutate: createBoard } = useCreateEducationBoard({ dataDecorator });

  const formMethods = useForm<EduBoardFormFields>({
    resolver: zodResolver(EduBoardFormSchema),
    mode: "all",
    defaultValues: {
      name: "",
      address: "",
      imageUrl: "",
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    // const formData = new FormData();
    setImageFile(file);
    // formData.append("file", file);
    // const response = await fetch("/upload", {
    //   // replace '/upload' with your upload endpoint
    //   method: "POST",
    //   body: formData,
    // });
    // const data = await response.json();
    // return data;
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = formMethods;

  const submitForm: SubmitHandler<EduBoardFormFields> = async (data) => {
    createBoard(data);
  };

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
              <div className="w-full flex justify-center">
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="boardImage"
                  accept="image/*"
                />
                <label htmlFor="boardImage">
                  {imageFile ? (
                    <div className="group relative flex flex-col justify-center items-center gap-2 bg-gray-100 p-2 rounded-md cursor-pointer h-[100px] w-[100px] text-center overflow-hidden">
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Board Image"
                        className="h-[100px] w-[100px] object-cover rounded-md"
                      />
                      <span className="absolute bottom-0 transform translate-y-full transition-all duration-200 ease-in-out group-hover:-translate-y-0 ">
                        <div className="flex flex-col justify-center items-center gap-2 bg-gray-500/50 p-2 rounded-md cursor-pointer h-[100px] w-[100px] text-center text-white">
                          <UploadCloud className="h-5 w-5" />
                          <span>Upload Image</span>
                        </div>
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center gap-2 bg-gray-100 p-2 rounded-md cursor-pointer h-[100px] w-[100px] text-center">
                      <UploadCloud className="h-5 w-5" />
                      <span>Upload Image</span>
                    </div>
                  )}
                </label>
              </div>

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
                <SubmitButton
                  isSubmitting={isSubmitting}
                  isDirty={isDirty}
                />
              </div>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default AddBoardModal;
