import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import zod from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import getUserDataFromLocalStorage from "@/utils/getUserDataFromLocalStorage";
import ImageUploadField from "@/components/ImageUploadField";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SpinningLoader from "@/components/loader";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useUpdateUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProfileFormSchema = zod.object({
  firstName: zod.string().min(1, "Must contain atleast one character"),
  lastName: zod.string().min(1, "Must contain atleast one character"),
  email: zod.string().optional(),
  imageURL: zod.string().optional(),
  // phone: zod.string().min(2, { message: "Phone number must be at least 2 characters." }),
  // balance: zod.number().nonnegative({ message: "Balance must be a non-negative number." }),
  // totalQuestions: zod.number().nonnegative({ message: "Total questions must be a non-negative number." }),
  // totalInstitutes: zod.number().nonnegative({ message: "Total institutes must be a non-negative number." }),
  // imageURL: zod.string().url({ message: "Invalid URL." }),
});
type ProfileFormFields = zod.infer<typeof ProfileFormSchema>;

const ProfileForm = ({ setIsEditing }: { setIsEditing: (value: boolean) => void }) => {
  const userData = getUserDataFromLocalStorage();

  const navigate = useNavigate();
  const formMethods = useForm<ProfileFormFields>({
    resolver: zodResolver(ProfileFormSchema),
    mode: "all",
    defaultValues: userData,
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = formMethods;

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

  const onUpdateUser = (userData: object) => {
    toast.success("Profile Update Successfully.");
    localStorage.setItem("userData", JSON.stringify(userData));
    navigate("/profile", { replace: true });
  };

  const [imageFile, setImageFile] = useState<File | null>(null);

  const { mutateAsync: fileUploadFunc, isError, isPending: fileUploading } = useFileUpload({});
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser({ onUpdateUser });

  const submitForm: SubmitHandler<ProfileFormFields> = async (data) => {
    //     console.log({
    //       payload: data,
    //       id: userData._id,
    //     });
    updateUser({
      payload: data,
      id: userData._id,
    });
  };

  return (
    <Form {...formMethods}>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="space-y-4 sm:space-y-6 p-1 w-full">
        <Controller
          control={formMethods.control}
          name="imageURL"
          render={({ field }) => (
            <ImageUploadField
              handleImageUpload={handleImageUpload}
              field={field}
              imageFile={imageFile}
              fileUploading={fileUploading}
              initialImageUrl={userData?.imageURL}
            />
          )}
        />

        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="FirstName here..."
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.firstName?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="LastName here..."
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.lastName?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Phone Number here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.phone?.message}</FormMessage>
                  </FormItem>
                )}
              /> */}

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email here..."
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* <FormField
                control={control}
                name="balance"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Balance here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.balance?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="totalQuestions"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Total Questions Created here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.totalQuestions?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="totalInstitutes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Total Institutes Worked For here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.totalInstitutes?.message}</FormMessage>
                  </FormItem>
                )}
              /> */}

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => {
              reset();
            }}
            className="mt-4 cursor-pointer bg-yellow-600 hover:bg-yellow-700 text-white hover:text-white hover:shadow-lg"
            disabled={isSubmitting || !isDirty || isUpdating || fileUploading}>
            {isSubmitting ? (
              <div className="mr-2">
                <SpinningLoader />
              </div>
            ) : null}
            Reset
          </Button>

          <Button
            onClick={() => {
              reset();
              setIsEditing(false);
            }}
            className="mt-4 cursor-pointer bg-blue-700 hover:bg-blue-500 text-white hover:text-white hover:shadow-lg"
            disabled={isSubmitting || isUpdating || fileUploading}>
            {isSubmitting ? (
              <div className="mr-2">
                <SpinningLoader />
              </div>
            ) : null}
            Cancel
          </Button>
          <Button
            type="submit"
            className="mt-4 cursor-pointer bg-green-700 hover:bg-green-500 text-white hover:text-white hover:shadow-lg"
            disabled={isSubmitting || !isDirty || isUpdating || fileUploading}>
            {isSubmitting ? (
              <div className="mr-2">
                <SpinningLoader />
              </div>
            ) : null}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
