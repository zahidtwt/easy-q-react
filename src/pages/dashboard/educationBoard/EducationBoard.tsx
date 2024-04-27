import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

const ItemDetail = () => {
  return (
    <div className="col-span-1">
      <div className="w-full h-[170px] overflow-hidden grid grid-cols-12 p-2 rounded-lg bg-white/40 border-t border-l border-r border-white shadow-black drop-shadow-xl">
        <div className="col-span-12 flex justify-center">
          <Avatar className="h-24 w-24 rounded-sm">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{"Ja".toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>

        <div className="col-span-12 flex flex-col justify-center pt-2">
          <h3 className="text-center font-medium text-base mb-1 truncate ">Jamia Islamia Rowjatul Ulum Madrasa</h3>
          <small className="text-center text-gray-500 truncate">Hat Govindpur, Faridpur</small>
        </div>
      </div>
    </div>
  );
};

const AddItemCard = () => {
  return (
    <div className="col-span-1">
      <div className="w-full h-[170px] overflow-hidden flex flex-col justify-center items-center p-2 rounded-lg bg-white/40 border-t border-l border-r border-white shadow-black drop-shadow-xl">
        <Plus size={40} />
        <h3 className="text-center font-medium text-base mb-1">Add New Madrasa</h3>
      </div>
    </div>
  );
};

const EducationBoard = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-1 bg-fuchsia-900 text-white ">
        <h5 className="uppercase text-center font-medium text-xl">Education Board</h5>
      </div>

      <div className="flex-grow overflow-auto">
        <div className="w-full grid grid-cols-2 gap-3 p-4 justify-center items-center">
          <ItemDetail />
          <ItemDetail />
          <AddItemCard />
        </div>
      </div>
    </div>
  );
};

export default EducationBoard;
