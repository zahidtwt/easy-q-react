import SignUpForm from "./sign-up-form";

const SignUpPage = () => {
  return (
    <div className="max-w-[450px]">
      <SignUpForm />
      <p className="text-md mt-6 text-center">
        Already have an account?
        <span>
          <a
            href="/auth/login"
            className="font-semibold ml-1">
            Login
          </a>
        </span>
      </p>
    </div>
  );
};

export default SignUpPage;
