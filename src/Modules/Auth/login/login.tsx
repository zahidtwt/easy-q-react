import LoginForm from "./login-form";

const LoginPage = () => {
  return (
    <div className="max-w-[450px]">
      <LoginForm />
      <p className="text-md mt-6 text-center">
        Don&apos;t have an account?
        <span>
          <a
            href="/auth/signup"
            className="font-semibold ml-1">
            Register
          </a>
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
