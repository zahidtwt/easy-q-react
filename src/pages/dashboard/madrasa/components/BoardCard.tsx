import Clip from "@/components/Clip";
import { Plus } from "lucide-react";

type BoardCard<T> = {
  title: string;
  addNewFunc: () => void;
  list: T[];
  borderColor?: string;
  bgColor?: string;
};

type itemType = {
  name: string;
  id: string;
};

const BoardCard = ({
  title,
  addNewFunc,
  list,
  borderColor = "border-red-400",
  bgColor = "bg-red-400",
}: BoardCard<itemType>) => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center mb-2">
        <p className="font-medium text-xl">{title}</p>
        <button
          onClick={() => addNewFunc()}
          className={`flex justify-center align-middle px-2 py-1 ${bgColor} rounded-lg text-white`}>
          <Plus size={18} />
          <small className="ml-1">New Class</small>
        </button>
      </div>
      <div className="w-full border-2 border-spacing-1 border-gray-50 rounded-md min-h-10">
        <div className="flex flex-wrap gap-3 p-2">
          {list.map((item: itemType) => (
            <Clip
              key={item.id}
              name={item.name}
              borderColor={borderColor}
              bgColor={bgColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
