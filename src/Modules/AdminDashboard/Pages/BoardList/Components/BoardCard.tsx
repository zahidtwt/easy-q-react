import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EducationBoard } from "@/interfaces/education-board";
import { Pencil } from "lucide-react";
import AddBoardModal from "./AddBoardModal";
import { useState } from "react";

const BoardCard = ({ board }: { board: EducationBoard }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative w-full rounded-md shadow-md hover:shadow-lg min-h-10 flex flex-col items-center justify-center bg-white p-4 border border-gray-200 transition-all duration-300">
        <div>
          <button
            onClick={() => setOpen(true)}
            className="absolute top-2 right-2 p-1 rounded-md bg-blue-300 text-white hover:bg-blue-600 transition-all duration-200 ease-in-out">
            <span className="sr-only">Edit</span>
            <Pencil className="h-5 w-5" />
          </button>
        </div>
        <Avatar className="border border-gray-200 flex justify-center items-center h-[50px] w-[50px]">
          <AvatarImage
            src={board.imageURL}
            alt={`${board.name}'s Picture`}
          />
          <AvatarFallback className="uppercase">{board.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <h5 className="p-1 font-medium text-center capitalize">{board.name}</h5>
        <small className="text-gray-500">{board.address}</small>
      </div>

      {open && (
        <AddBoardModal
          initialValues={board}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default BoardCard;
