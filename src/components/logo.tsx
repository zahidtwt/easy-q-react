import logo from "@/assets/easy-q-logo.svg";

const Logo = ({ label }: { label?: boolean }) => {
  return (
    <figure className="flex flex-col items-center">
      <img
        src={logo}
        alt="Easy Q logo"
        className="w-[50px] sm:w-[70px] lg:w-[90px] rounded-sm"
      />
      {label ? <figcaption>Easy Q</figcaption> : null}
    </figure>
  );
};

export default Logo;
