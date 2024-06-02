import { IInstitution } from "@/interfaces/institution";
import InstituteFormModal from "./InstituteFormModal";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const InstituteCard = ({ institutionItem }: { institutionItem: IInstitution }) => {
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
            src={institutionItem.imageURL}
            alt={`${institutionItem.name}'s Picture`}
          />
          <AvatarFallback className="uppercase">{institutionItem.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <h5 className="p-1 font-medium text-center capitalize">{institutionItem.name}</h5>
        <small className="text-gray-500">{institutionItem.address}</small>
      </div>

      {open && (
        <InstituteFormModal
          initialValues={institutionItem}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default InstituteCard;
