import imagePlaceholder from "@/assets/image-dummy.svg";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const Profile = () => {
  return (
    <div className=" py-2 text-center space-y-8 overflow-x-scroll">
      <div className="flex flex-col justify-center items-center gap-2 shadow-lg rounded-md p-2 relative">
        <Edit className="absolute top-1 right-1" />
        <img
          src={imagePlaceholder}
          alt={"Image placeholder"}
          className="rounded-full size-16"
        />

        <div>
          <p>Jamia Islamia Rowjatul Ulum Madrasa</p>
          <small>Hat Govindpur, Faridpur</small>
        </div>

        <div>
          <p className="block">
            Mobile: <span>016XXXXX541</span>
          </p>
          <p className="block">
            Email: <span>zaberXXXXX@gmail.com</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 shadow-lg rounded-md p-2 relative ">
        <div className="border border-gray-400 rounded-md py-1 px-2 bg-slate-100">Education Board</div>
        <p className="border border-gray-400 py-1 px-2 text-sm rounded-sm w-full bg-slate-300">
          Nurani Education Board, Chittagong
        </p>
        <Button className="mt-4">Add new education board</Button>
      </div>

      <div className="flex flex-col justify-center items-center gap-2 shadow-lg rounded-md p-2 relative ">
        <div className="border border-gray-400 rounded-md py-1 px-2 bg-slate-100">Class</div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <p className="border border-gray-400 py-1 px-2 text-sm rounded-sm bg-slate-300">Class one</p>
          <p className="border border-gray-400 py-1 px-2 text-sm rounded-sm bg-slate-300">Class two</p>
          <p className="border border-gray-400 py-1 px-2 text-sm rounded-sm bg-slate-300">Class three</p>
          <Button>Add new class</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
