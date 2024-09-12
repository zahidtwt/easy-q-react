import { ISubject } from "@/interfaces/subject.interface";
import { Pencil } from "lucide-react";
import { useState } from "react";
import SubjectDetailFormModal from "./SubjectDetailFormModal";
// import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const SubjectDetailCard = ({ subject }: { subject: ISubject }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative w-full rounded-md shadow-md hover:shadow-lg min-h-10 flex flex-col  bg-white p-4 border border-gray-200 transition-all duration-300">
        <div>
          <button
            onClick={() => setOpen(true)}
            className="absolute top-2 right-2 p-1 rounded-md bg-blue-300 text-white hover:bg-blue-600 transition-all duration-200 ease-in-out">
            <span className="sr-only">Edit</span>
            <Pencil className="h-5 w-5" />
          </button>
        </div>
        <h5 className="p-1 font-medium text-center capitalize">{subject.name}</h5>

        <div className="w-full">
          <p className="text-sm font-medium leading-none">
            Code : {<span className="text-sm text-muted-foreground">{subject?.code ? subject?.code : "###"}</span>}
          </p>
          <Separator className="my-2" />

          <p className="text-sm font-medium leading-none">
            Status : {<span className="text-sm text-muted-foreground">{subject.active}</span>}
          </p>
          <Separator className="my-2" />

          <div>
            <p className="text-sm font-medium leading-none mb-2">Question Category:</p>
            <div className=" flex gap-2 flex-wrap">
              {/* {subject?.questionCategory?.map((category) => (
                <Badge
                  key={category}
                  variant="outline">
                  {category}
                </Badge>
              ))} */}
            </div>
          </div>
        </div>
      </div>

      {open && (
        <SubjectDetailFormModal
          // classId={""}
          initialValues={subject}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default SubjectDetailCard;
