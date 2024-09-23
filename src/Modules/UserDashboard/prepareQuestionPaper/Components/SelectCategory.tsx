import { Button } from "@/components/ui/button";
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
import { useAddCategoryInQuestionPaper } from "@/hooks/useQuestionPaper";
import { IQuestionPaperRes } from "@/interfaces/question-paper.interface";
import React, { useState } from "react";

const SelectCategory = ({
  open,
  setOpen,
  subjectId,
  questionPaperId,
  selectedCategories = [],
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subjectId: string;
  questionPaperId: string;
  selectedCategories: string[];
}) => {
  // const dataDecorator = (data: IQuestionCategory[]): IQuestionCategory[] => {
  //   const filterData = data.filter((item) => !selectedCategories.includes(item._id));
  //   return filterData;
  // };

  // console.log(selectedCategories);

  const { data: questionCategoryList, isLoading: questionCategoryListLoading } = useGetQuestionCategoryList({
    filterData: { subjectId: subjectId || "" },
    // dataDecorator,
  });

  const addDataDecorator = (data: IQuestionPaperRes): IQuestionPaperRes => {
    setSelectedCategory([]);
    setOpen(false);
    return data;
  };
  const { mutate: addCategory, isPending: IsCategoryAddedLoading } = useAddCategoryInQuestionPaper({
    dataDecorator: addDataDecorator,
  });

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const updateSelectedCategory = () => {
    addCategory({ _id: questionPaperId, categoryList: selectedCategory });
  };

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
                    questionCategoryList?.map(
                      (item) =>
                        !selectedCategories.includes(item._id) && (
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
                        )
                    )}
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="grid grid-cols-2 gap-3">
              <DrawerClose className="col-span-1">
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button
                disabled={IsCategoryAddedLoading}
                onClick={updateSelectedCategory}
                className="col-span-1">
                Done
              </Button>
            </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SelectCategory;
