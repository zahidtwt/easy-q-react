import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useUpdateSubjectListOfClass } from "@/hooks/useClass";
import { useGetSubjectList } from "@/hooks/useSubject";
import { IClassRes } from "@/interfaces/class.interface";
import { Dispatch, SetStateAction, useState } from "react";

const AddSubjectInClassModal = ({
  open,
  setOpen,
  chosenSubject,
  classId,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  chosenSubject: string[];
  classId: string;
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string[]>(chosenSubject);

  const handleSubjectChange = (subjectId: string) => {
    if (selectedSubject.includes(subjectId)) {
      setSelectedSubject(selectedSubject.filter((id) => id !== subjectId));
    } else {
      setSelectedSubject([...selectedSubject, subjectId]);
    }
  };

  let filterData = {
    query: {},
    sortField: "createdAt",
    sortOrder: 1,
  };

  // make this conditional
  filterData = { ...filterData, query: {} };

  const { data: subjectList, isLoading: subjectListLoading } = useGetSubjectList({
    filterData,
  });

  const dataDecorator = (data: IClassRes) => {
    setOpen(false);

    return data;
  };

  const { mutate: updateSubjectList } = useUpdateSubjectListOfClass({ dataDecorator });

  const handleSave = () => {
    // API call to save the selected subjects
    updateSubjectList({ _id: classId, subjectList: selectedSubject });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
      }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h5 className="text-center">Select Subject</h5>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          <ScrollArea className="h-72 w-full rounded-md border">
            <div className="p-4">
              {!subjectListLoading &&
                subjectList &&
                subjectList.map((subject) => (
                  <>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={subject._id}
                        checked={selectedSubject.includes(subject._id)}
                        onCheckedChange={() => handleSubjectChange(subject._id)}
                      />
                      <label
                        htmlFor={subject._id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {subject.code} - {subject.name}
                      </label>
                    </div>
                    <Separator className="my-2" />
                  </>
                ))}
            </div>
          </ScrollArea>

          <div className="flex justify-evenly p-3 m-3">
            <Button
              variant={"outline"}
              onClick={() => {
                setSelectedSubject(chosenSubject);
                setOpen(false);
              }}>
              <span className="text-red-700">Cancel</span>
            </Button>

            <Button
              variant={"outline"}
              onClick={handleSave}>
              <span className="text-green-700">Save</span>
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubjectInClassModal;
