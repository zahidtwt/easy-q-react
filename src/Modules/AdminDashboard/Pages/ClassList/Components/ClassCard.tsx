import { IClass } from "@/interfaces/class";
import { Pencil } from "lucide-react";
import { useState } from "react";
import ClassFormModal from "./ClassFormModal";
import { useNavigate } from "react-router-dom";

const ClassCard = ({ classItem }: { classItem: IClass }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/dashboard/class-details/${classItem._id}`)}
        className="relative w-full rounded-md shadow-md hover:shadow-lg min-h-10 flex flex-col items-center justify-center bg-white p-4 border border-gray-200 transition-all duration-300">
        <div>
          <button
            onClick={() => setOpen(true)}
            className="absolute top-2 right-2 p-1 rounded-md bg-blue-300 text-white hover:bg-blue-600 transition-all duration-200 ease-in-out">
            <span className="sr-only">Edit</span>
            <Pencil className="h-5 w-5" />
          </button>
        </div>
        <h5 className="p-1 font-medium text-center capitalize">{classItem.name}</h5>
      </div>

      {open && (
        <ClassFormModal
          initialValues={classItem}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default ClassCard;
