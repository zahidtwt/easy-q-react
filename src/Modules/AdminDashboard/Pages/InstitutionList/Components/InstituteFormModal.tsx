import SpinningLoader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import zod from "zod";
import { IEditInstitutionPayload } from "@/interfaces/institution";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useCreateInstitution, useUpdateInstitution } from "@/hooks/useInstitution";
import ImageUploadField from "@/components/ImageUploadField";
import { useFileUpload } from "@/hooks/useFileUpload";
import Select from "react-select";
import { useGetEducationBoardList } from "@/hooks/useEducationBoard";
import { useGetClassList } from "@/hooks/useClass";
// import { EducationBoard } from "@/interfaces/education-board";

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
  // educationBoardId: zod.array(zod.string()).min(1, {
  //   message: "educationBoardId must be at least 1 characters.",
  // }),
  educationBoardId: zod.string().min(1, {
    message: "educationBoardId must be at least 1 characters.",
  }),
  classes: zod.array(zod.string()).min(1, {
    message: "classes must be at least 1 characters.",
  }),
  userId: zod.string().min(2, {
    message: "userId must be at least 2 characters.",
  }),
  imageURL: zod.string(),
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
  const [imageFile, setImageFile] = useState<File | null>(null);

  const formMethods = useForm<InstitutionBoardFormFields>({
    resolver: zodResolver(InstitutionBoardFormSchema),
    mode: "all",
    defaultValues: initialValues || {
      name: "",
      address: "",
      phoneNumber: "",
      email: "",
      educationBoardId: "",
      classes: [],
      userId: "",
      imageURL: "",
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

  const submitForm: SubmitHandler<InstitutionBoardFormFields> = async (data) => {
    if (initialValues) {
      updateInstitution({ ...data, id: initialValues.id });
    } else {
      createInstitution(data);
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

  const {
    // isLoading,
    data: eduBoardList,
    // error: edBoardList,
    // refetch: getAgainBoardList,
  } = useGetEducationBoardList({});
  const { data: classList } = useGetClassList({});

  const { mutate: createInstitution } = useCreateInstitution({ dataDecorator });
  const { mutate: updateInstitution } = useUpdateInstitution({ dataDecorator });
  const { mutateAsync: fileUploadFunc, isError, isPending: fileUploading } = useFileUpload({});

  const decoratedEducationList = useMemo(() => {
    const educationListDecorator = (): { value: string; label: string }[] | [] => {
      if (eduBoardList === undefined) return [];

      return eduBoardList.map((item) => ({
        value: item.id,
        label: item.name,
      }));
    };
    return educationListDecorator();
  }, [eduBoardList]);

  const decoratedClassList = useMemo(() => {
    const educationListDecorator = (): { value: string; label: string }[] | [] => {
      if (classList === undefined) return [];

      return classList.map((item) => ({
        value: item.id,
        label: item.name,
      }));
    };
    return educationListDecorator();
  }, [classList]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h5 className="text-center">Create New Institution</h5>
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
                    initialValues={initialValues}
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
                        placeholder="Institute Name here..."
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
                        placeholder="Institute Address here..."
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
                        placeholder="Institute Phone Number here..."
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
                        placeholder="Institute Email here..."
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
                      {/* <Input
                        placeholder="Institute Education Board ID here..."
                        {...field}
                      /> */}

                      <Select
                        placeholder="Institute Education Board ID here..."
                        options={decoratedEducationList}
                        defaultValue={decoratedEducationList.filter((item) => field.value === item.value)[0]}
                        onChange={(selected) => field.onChange(selected?.value)}
                      />
                    </FormControl>
                    <FormMessage>{errors.educationBoardId?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {eduBoardList && (
                <FormField
                  control={control}
                  name="classes"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          isMulti
                          placeholder="Select Institute Classes..."
                          options={decoratedClassList}
                          defaultValue={decoratedClassList.filter((item) => field.value.includes(item.value))}
                          onChange={(selected) => field.onChange(selected.map((item) => item.value))}
                        />
                      </FormControl>
                      <FormMessage>{errors.classes?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              )}

              {/* <FormField
                control={control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Institute User ID here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.userId?.message}</FormMessage>
                  </FormItem>
                )}
              /> */}

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