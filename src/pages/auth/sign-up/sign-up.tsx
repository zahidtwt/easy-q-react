import Logo from "@/components/logo";
import SignUpForm from "./sign-up-form";

const SignUpPage = () => {
  return (
    <div className="max-w-[450px] space-y-12">
      <Logo label />
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
