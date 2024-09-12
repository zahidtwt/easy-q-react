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

  // const [selectedBoard, setSelectedBoard] = useState<EducationBoard>({} as EducationBoard);
  const [, setSelectedBoard] = useState<EducationBoard>({} as EducationBoard);
  const [selectedInstitution, setSelectedInstitution] = useState<IInstitution>({} as IInstitution);
  const [selectedClass, setSelectedClass] = useState<IClassRes>({} as IClassRes);
  const [selectedSubject, setSelectedSubject] = useState<ISubject>({} as ISubject);

  const [currentTab, setCurrentTab] = useState(1);

  return (
    <div className="relative max-h-full h-full">
      {currentTab === 5 ? (
        <div
          id="tab_5"
          className="w-full">
          <Card className="w-full min-h-[300px] bg-purple-200 rounded-lg shadow-lg">
            <CardHeader className="bg-purple-500 text-white text-center font-bold rounded-t-lg p-2">
              {/* জামিয়া ইসলামিয়া রওজাতুল উলূম মাদরাসা */}
              {selectedInstitution.name}
            </CardHeader>
            <CardContent className="grid gap-4 mt-4">
              <div className="col-span-2 bg-purple-300 text-center py-2 rounded-lg">১ম সাময়িক পরীক্ষা - ২০২৪</div>
              <div className="bg-purple-300 text-center py-2 rounded-lg">
                {/* ১ম শ্রেণী */}
                {selectedClass.name}
              </div>
              <div className="bg-purple-300 text-center py-2 rounded-lg">সময়ঃ ২ ঘন্টা</div>
              <div className="col-span-2 bg-purple-300 text-center py-2 rounded-lg">বিষয়ঃ {selectedSubject.name}</div>
              <div className="bg-purple-300 text-center py-2 rounded-lg">পূর্ণমানঃ ১০০</div>
            </CardContent>
          </Card>

          <div className="min-h-[calc(100vh-300px)] w-full">
            <h3>Question Creation Area</h3>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          {currentTab === 1 && (
            <EducationBoardList
              setCurrentTab={setCurrentTab}
              setSelectedBoard={setSelectedBoard}
            />
          )}
          {currentTab === 2 && (
            <SelectInstitution
              setCurrentTab={setCurrentTab}
              setSelectedInstitution={setSelectedInstitution}
            />
          )}
          {currentTab === 3 && (
            <SelectClass
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
        </div>
      )}
    </div>
  );
};

export default AddQuestion;
