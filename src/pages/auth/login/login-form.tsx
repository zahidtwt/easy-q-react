import { SubmitButton } from "@/components/custom-buttons";
import { PasswordInput } from "@/components/custom-inputs";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LoginFormFields, LoginFormSchema } from "./validation";
import useLogin from "../hooks/useLogin";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { path } = location.state || { path: "/dashboard/home" };

  const onSuccessLogin = (token: string) => {
    toast.success("Successfully logged in!");
    Cookies.set("token", token, { secure: true });
    navigate(path, { replace: true });
  };

  const { mutate: loginUser } = useLogin({ onSuccessLogin });

  const formMethods = useForm<LoginFormFields>({
    resolver: zodResolver(LoginFormSchema),
    mode: "all",
    defaultValues: {
      mobileNumber: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = formMethods;

  const submitForm: SubmitHandler<LoginFormFields> = async (data) => {
    loginUser(data);
  };

  return (
    <Form {...formMethods}>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="space-y-4 sm:space-y-6 p-1 w-[300px] sm:w-[350px] lg:w-[450px]">
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

export default LoginForm;
