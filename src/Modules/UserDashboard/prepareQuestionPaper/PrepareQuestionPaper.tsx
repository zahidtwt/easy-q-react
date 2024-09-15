import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  // DrawerTrigger,
} from "@/components/ui/drawer";
import { useGetQuestionCategoryList } from "@/hooks/useQuestionCategory";
import { useGetQuestionPaperDetails } from "@/hooks/useQuestionPaper";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SelectCategory = ({
  open,
  setOpen,
  subjectId,
  selectedCategories = [],
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subjectId: string;
  selectedCategories: string[];
}) => {
  const { data: questionCategoryList, isLoading: questionCategoryListLoading } = useGetQuestionCategoryList({
    filterData: { subjectId: subjectId || "" },
  });
  const [selectedCategory, setSelectedCategory] = useState<string[]>(selectedCategories);

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}>
      {/* <DrawerTrigger>Open</DrawerTrigger> */}
      {/* <DrawerTrigger asChild>
         <Button variant="outline">Edit Profile</Button>
       </DrawerTrigger> */}

      <DrawerContent className="">
        <div className="flex justify-center">
          <div className="w-[500px] bg-white">
            <DrawerHeader>
              <DrawerTitle>Category List</DrawerTitle>
              <DrawerDescription>
                <div className="grid grid-cols-1 gap-2">
                  {!questionCategoryListLoading &&
                    questionCategoryList?.map((item) => (
                      <div
                        key={item._id}
                        className="col-span-1 bg-gray-100 p-2 rounded-lg mt-2">
                        {/* <div>{item.questionCategoryName}</div> */}
                        <div className="items-top flex space-x-2">
                          <Checkbox
                            id={item._id}
                            checked={selectedCategory.includes(item._id)}
                            onCheckedChange={() => {
                              if (selectedCategory.includes(item._id)) {
                                setSelectedCategory((prev) => prev.filter((i) => i !== item._id));
                              } else {
                                setSelectedCategory((prev) => [...prev, item._id]);
                              }
                            }}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor={item._id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              {item.questionCategoryName}
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="grid grid-cols-2 gap-3">
              <DrawerClose className="col-span-1">
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button className="col-span-1">Done</Button>
            </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const PrepareQuestionPaper = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const { data: questionPaperDetails } = useGetQuestionPaperDetails({
    id: id,
  });

  return (
    <div className="relative max-h-full h-full px-3">
      {questionPaperDetails && (
        <div
          id="tab_5"
          className="w-full">
          <Card className="w-full bg-purple-200 rounded-lg shadow-lg">
            <CardHeader className="bg-purple-500 text-white text-center font-bold rounded-t-lg p-2">
              {questionPaperDetails?.institute.name}
            </CardHeader>
            <CardContent className="grid grid-cols-6 gap-4 mt-4">
              <div className="col-span-4 bg-purple-300 text-center py-2 rounded-lg">
                {questionPaperDetails?.examName ?? "---- -----"} - {questionPaperDetails?.examYear ?? "YYYY"}
              </div>
              <div className="col-span-2 bg-purple-300 text-center py-2 rounded-lg">
                {questionPaperDetails?.classId.name}
              </div>
              <div className="col-span-2 bg-purple-300 text-center py-2 rounded-lg">
                সময়ঃ {questionPaperDetails?.examDuration ? questionPaperDetails?.examDuration / 60 + " ঘন্টা" : "----"}
              </div>
              <div className="col-span-2 bg-purple-300 text-center py-2 rounded-lg">
                বিষয়ঃ {questionPaperDetails?.subject.name}
              </div>
              <div className="col-span-2 bg-purple-300 text-center py-2 rounded-lg">
                পূর্ণমানঃ {questionPaperDetails?.examFullMarks ?? "----"}
              </div>
            </CardContent>
          </Card>

          <div className="min-h-[calc(100vh-300px)] w-full">
            <div className="flex justify-end pt-3">
              <Button onClick={() => setOpen(true)}>Select Category</Button>
            </div>
          </div>
        </div>
      )}

      {open && questionPaperDetails && (
        <SelectCategory
          open={open}
          setOpen={setOpen}
          subjectId={questionPaperDetails?.subject._id}
          selectedCategories={questionPaperDetails.questionCategory.map((item) => item.questionCategoryId)}
        />
      )}
    </div>
  );
};

export default PrepareQuestionPaper;
