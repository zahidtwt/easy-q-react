import SpinningLoader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpFormFields, SignUpFormSchema } from "./validation";

const SignUpForm = () => {
  const formMethods = useForm<SignUpFormFields>({
    resolver: zodResolver(SignUpFormSchema),
    mode: "all",
    defaultValues: {
      name: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = formMethods;

  const submitForm: SubmitHandler<SignUpFormFields> = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
        // console.log("data", data);
      }, 2000);
    });
  };

  return (
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
                  placeholder="Write your name here"
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.name?.message}</FormMessage>
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
                <Input
                  placeholder="Write your password here"
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.password?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Retype your password"
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.confirmPassword?.message}</FormMessage>
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

export default SignUpForm;

const SubmitButton = ({ isSubmitting, isDirty }: { isSubmitting: boolean; isDirty: boolean }) => {
  return (
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
  );
};
