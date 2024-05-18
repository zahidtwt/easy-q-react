import { SubmitButton } from "@/components/custom-buttons";
import { PasswordInput } from "@/components/custom-inputs";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SignUpFormFields, SignUpFormSchema } from "./validation";
import useSignUp from "../hooks/useSignUp";

const SignUpForm = () => {
  const navigate = useNavigate();

  const onSuccessReg = (token: string) => {
    toast.success("Successfully registered user!");
    Cookies.set("token", token, { secure: true });
    navigate("/home");
  };

  const { mutate: registerUser } = useSignUp({ onSuccessReg });
  const formMethods = useForm<SignUpFormFields>({
    resolver: zodResolver(SignUpFormSchema),
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      password: "",
      // confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = formMethods;

  const submitForm: SubmitHandler<SignUpFormFields> = async (data) => {
    registerUser(data);
  };

  return (
    <Form {...formMethods}>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="space-y-4 sm:space-y-6 p-1 w-[300px] sm:w-[350px] lg:w-[450px]">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Write your first name here"
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
                  placeholder="Write your last name here"
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.lastName?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Write your mobile number here"
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.mobileNumber?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  placeholder="Write your password here"
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.password?.message}</FormMessage>
            </FormItem>
          )}
        />
        {/* <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  placeholder="Write your password here"
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.confirmPassword?.message}</FormMessage>
            </FormItem>
          )}
        /> */}
        <div className="flex justify-center">
          <SubmitButton
            isSubmitting={isSubmitting}
            isDirty={isDirty}
          />
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
