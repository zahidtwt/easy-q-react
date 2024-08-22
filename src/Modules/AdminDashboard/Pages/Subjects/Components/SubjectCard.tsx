import { ISubject } from "@/interfaces/subject.interface";
import { Pencil } from "lucide-react";
import { useState } from "react";
import SubjectDetailFormModal from "./SubjectDetailFormModal";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const SubjectCard = ({ subject }: { subject: ISubject }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="relative w-full rounded-md shadow-md hover:shadow-lg min-h-10 flex flex-col  bg-white p-4 border border-gray-200 transition-all duration-300">
        <button
          onClick={() => setOpen(true)}
          className="absolute top-2 right-2 p-1 rounded-md bg-blue-300 text-white hover:bg-blue-600 transition-all duration-200 ease-in-out z-10">
          <span className="sr-only">Edit</span>
          <Pencil className="h-5 w-5" />
        </button>

        <div onClick={() => navigate(`/dashboard/subjects-detail/${subject._id}`)}>
          <h5 className="p-1 font-medium text-center capitalize cursor-pointer">{subject.name}</h5>

          <div className="w-full">
            <p className="text-sm font-medium leading-none">
              Code : {<span className="text-sm text-muted-foreground">{subject?.code ? subject?.code : "###"}</span>}
            </p>
            <Separator className="my-2" />

            <p className="text-sm font-medium leading-none">
              Status : {<span className="text-sm text-muted-foreground">{subject.active}</span>}
            </p>
          </div>
        </div>
      </div>

      {open && (
        <SubjectDetailFormModal
          initialValues={subject}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default SubjectCard;
