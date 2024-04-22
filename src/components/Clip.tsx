import { X } from "lucide-react";
type clipProps = {
  name: string;
  link?: string;
  borderColor?: string;
  bgColor?: string;
};

const Clip = ({ name, borderColor = "border-red-500", bgColor = " bg-red-500" }: clipProps) => {
  return (
    <div className={`flex items-center border ${borderColor} col-auto rounded-full px-2 py-1`}>
      <p>{name}</p>
      <div className={`rounded-full border-2 ${borderColor} ml-1 ${bgColor} cursor-pointer`}>
        <X
          color={"#ffffff"}
          size={20}
        />
      </div>
    </div>
  );
};

export default Clip;
