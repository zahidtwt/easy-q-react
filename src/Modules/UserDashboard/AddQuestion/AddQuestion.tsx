// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { useCallback, useEffect, useState } from "react";
import { useState } from "react";
// import { useSearchParams } from "react-router-dom";
import EducationBoardList from "./Components/EducationBoardList";
import SelectInstitution from "./Components/SelectInstitution";
import SelectClass from "./Components/SelectClass";
import SelectSubject from "./Components/SelectSubject";
import { EducationBoard } from "@/interfaces/education-board";
import { IInstitution } from "@/interfaces/institution";
import { ISubject } from "@/interfaces/subject.interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IClassRes } from "@/interfaces/class.interface";
import ExamDetailOfQuestionPaper from "./Components/ExamDetailOfQuestionPaper";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";

export interface IExamDetail {
  examName: string;
  examYear: number;
  examDuration: number;
  examFullMarks: number;
}

const SelectCategory = ({
  open,
  setOpen,
  subjectId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subjectId: string;
}) => {
  const { data: questionCategoryList, isLoading: questionCategoryListLoading } = useGetQuestionCategoryList({
    filterData: { subjectId: subjectId || "" },
  });
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

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

const AddQuestion = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const updateSearchParams = useCallback(
  //   (stage: string, key?: string, id?: string, name?: string) => {
  //     const params = new URLSearchParams(searchParams);
  //     params.set("stage", stage);

  //     if (key && id && name) {
  //       params.set(key, `${id}, ${name}`);
  //     }
  //     setSearchParams(params);
  //   },
  //   [searchParams, setSearchParams]
  // );

  // useEffect(() => {
  //   if (searchParams.get("stage") === null) {
  //     updateSearchParams("1");
  //   }
  // }, [searchParams, updateSearchParams]);

  const [selectedBoard, setSelectedBoard] = useState<EducationBoard>({} as EducationBoard);
  const [selectedInstitution, setSelectedInstitution] = useState<IInstitution>({} as IInstitution);
  const [selectedClass, setSelectedClass] = useState<IClassRes>({} as IClassRes);
  const [selectedSubject, setSelectedSubject] = useState<ISubject>({} as ISubject);
  const [examDetail, setExamDetail] = useState<IExamDetail>({} as IExamDetail);

  const [currentTab, setCurrentTab] = useState<number>(1);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative max-h-full h-full px-3">
      {currentTab === 6 ? (
        <div
          id="tab_5"
          className="w-full">
          <Card className="w-full bg-purple-200 rounded-lg shadow-lg">
            <CardHeader className="bg-purple-500 text-white text-center font-bold rounded-t-lg p-2">
              {selectedInstitution.name}
            </CardHeader>
            <CardContent className="grid grid-cols-6 gap-4 mt-4">
              <div className="col-span-4 bg-purple-300 text-center py-2 rounded-lg">
                {examDetail.examName ?? "---- -----"} - {examDetail.examYear ?? "YYYY"}
              </div>
              <div className="col-span-2 bg-purple-300 text-center py-2 rounded-lg">{selectedClass.name}</div>
              <div className="col-span-2 bg-purple-300 text-center py-2 rounded-lg">
                সময়ঃ {examDetail.examDuration ? examDetail?.examDuration / 60 + " ঘন্টা" : "----"}
              </div>
              <div className="col-span-2 bg-purple-300 text-center py-2 rounded-lg">বিষয়ঃ {selectedSubject.name}</div>
              <div className="col-span-2 bg-purple-300 text-center py-2 rounded-lg">
                পূর্ণমানঃ {examDetail.examFullMarks ?? "----"}
              </div>
            </CardContent>
          </Card>

          <div className="min-h-[calc(100vh-300px)] w-full">
            <div className="flex justify-end pt-3">
              <Button onClick={() => setOpen(true)}>Select Category</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          {currentTab === 1 && (
            <SelectInstitution
              setCurrentTab={setCurrentTab}
              setSelectedInstitution={setSelectedInstitution}
            />
          )}
          {currentTab === 2 && selectedInstitution && (
            <EducationBoardList
              setCurrentTab={setCurrentTab}
              setSelectedBoard={setSelectedBoard}
              selectedInstitution={selectedInstitution}
            />
          )}
          {currentTab === 3 && selectedBoard && (
            <SelectClass
              selectedBoardId={selectedBoard._id}
              setCurrentTab={setCurrentTab}
              setSelectedClass={setSelectedClass}
            />
          )}
          {currentTab === 4 && (
            <SelectSubject
              classId={selectedClass._id}
              setCurrentTab={setCurrentTab}
              setSelectedSubject={setSelectedSubject}
            />
          )}
          {currentTab === 5 && (
            <ExamDetailOfQuestionPaper
              setCurrentTab={setCurrentTab}
              examDetail={examDetail}
              setExamDetail={setExamDetail}
            />
          )}
        </div>
      )}
      {open && (
        <SelectCategory
          open={open}
          setOpen={setOpen}
          subjectId={selectedSubject._id}
        />
      )}
    </div>
  );
};

export default AddQuestion;
