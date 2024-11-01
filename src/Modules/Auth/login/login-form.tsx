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
  // const { path } = location.state || { path: "/home" };
  const { path } = location.state || { path: "/dashboard/boardList" };

  const getPublicDataFromJwtToken = (token: string) => {
    try {
      const parts = token.split(".");
      const payload = JSON.parse(atob(parts[1]));
      return JSON.stringify(payload);
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      return "";
    }
  };

  const onSuccessLogin = (token: string) => {
    toast.success("Successfully logged in!");
    Cookies.set("token", token, { secure: true });
    localStorage.setItem("userData", getPublicDataFromJwtToken(token));
    navigate(path, { replace: true });
  };

  const { mutate: loginUser, isPending } = useLogin({ onSuccessLogin });

  const formMethods = useForm<LoginFormFields>({
    resolver: zodResolver(LoginFormSchema),
    mode: "all",
    defaultValues: {
      phone: "",
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
        <div className="flex justify-end">
          <a
            href="/auth/forget-password"
            className="text-sm text-blue-500 hover:underline text-right">
            Forget password?
          </a>
        </div>

        <div className="flex justify-center">
          <SubmitButton
            isSubmitting={isPending || isSubmitting}
            isDirty={isDirty}
          />
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
