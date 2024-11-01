import zod from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { PasswordInput } from "@/components/custom-inputs";
import useUpdatePassword from "../hooks/useUpdatePassword";
import { SubmitButton } from "@/components/custom-buttons";
import { mobileNumberValidationRegex, passwordValidationRegex } from "../login/validation";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const ForgetPasswordVarifyPhoneNoFormSchema = zod.object({
//   phone: zod
//     .string()
//     .regex(new RegExp(mobileNumberValidationRegex), { message: "Must be a valid Bangladeshi mobile number" }),
// });

const ForgetPasswordFormSchema = zod.object({
  phone: zod
    .string()
    .regex(new RegExp(mobileNumberValidationRegex), { message: "Must be a valid Bangladeshi mobile number" }),
  oldPassword: zod.string().regex(new RegExp(passwordValidationRegex), {
    message:
      "Password must be at least 8 characters long and include at least one letter, one digit, and one special character (@$!%*?&)",
  }),
  newPassword: zod.string().regex(new RegExp(passwordValidationRegex), {
    message:
      "Password must be at least 8 characters long and include at least one letter, one digit, and one special character (@$!%*?&)",
  }),
});

export type ForgetPasswordFormFields = zod.infer<typeof ForgetPasswordFormSchema>;

const ForgetPasswordForm = () => {
  const navigate = useNavigate();
  const formMethods = useForm<ForgetPasswordFormFields>({
    resolver: zodResolver(ForgetPasswordFormSchema),
    mode: "all",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const decorator = <T,>(data: T): T => {
    navigate("/auth/login");
    return data;
  };

  const { mutate: updatePassword, isPending } = useUpdatePassword({ dataDecorator: decorator });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = formMethods;

  const submitForm: SubmitHandler<ForgetPasswordFormFields> = async (data) => {
    updatePassword(data);
  };

  return (
    <div>
      <Form {...formMethods}>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="space-y-4 sm:space-y-6 p-1 w-[300px] sm:w-[350px] lg:w-[450px]">
          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Write your mobile number here"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.phone?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    placeholder="Old Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.oldPassword?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    placeholder="New Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.newPassword?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md"
            disabled={isSubmitting || !isDirty || !isPending}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button> */}

          <div className="flex justify-center">
            <SubmitButton
              isSubmitting={isPending || isSubmitting}
              isDirty={isDirty}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgetPasswordForm;
