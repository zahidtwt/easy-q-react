import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { useGetSubjectList } from "@/hooks/useSubject";
import { ISubject } from "@/interfaces/subject.interface";
import { useGetClassDetail } from "@/hooks/useClass";
import { ArrowLeft } from "lucide-react";

const SelectSubject = ({
  setCurrentTab,
  setSelectedSubject,
  classId,
}: {
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  setSelectedSubject: (item: ISubject) => void;
  classId: string;
}) => {
  // let filterData = {
  //   query: {},
  //   sortField: "name",
  //   sortOrder: 1,
  // };

  // if (classId) {
  //   filterData = { ...filterData, query: { class: classId } };
  // }

  const { data: classDetail, isLoading: classDetailLoading } = useGetClassDetail({ id: classId });

  // const { data: subjectList, isLoading: subjectListLoading } = useGetSubjectList({
  //   filterData,
  // });

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="bg-pink-500 text-white text-center font-bold rounded-t-lg p-4 relative">
        <Button
          className="absolute left-2 top-2"
          variant={"ghost"}
          onClick={() => {
            setCurrentTab((pre) => pre - 1);
          }}>
          <ArrowLeft size={24} />
        </Button>
        প্রতিষ্ঠান নির্বাচন করুন
      </CardHeader>
      {classDetailLoading ? (
        <CardContent className="grid grid-cols-2 gap-4 p-6 animate-pulse">
          <div className="bg-gray-100 h-10 rounded-lg"></div>
          <div className="bg-gray-100 h-10 rounded-lg"></div>
          <div className="bg-gray-100 h-10 rounded-lg"></div>
          <div className="bg-gray-100 h-10 rounded-lg"></div>
          <div className="bg-gray-100 h-10 rounded-lg"></div>
          <div className="bg-gray-100 h-10 rounded-lg"></div>
        </CardContent>
      ) : (
        <CardContent className="grid grid-cols-2 gap-4 p-6 max-h-[40vh] overflow-y-auto overflow-x-hidden">
          {classDetail?.subjectList?.map((item) => (
            <Button
              key={item._id}
              onClick={() => {
                setCurrentTab((prev) => prev + 1);
                setSelectedSubject(item);
              }}
              className="bg-gray-100 hover:bg-gray-200 py-2 rounded-lg text-gray-950">
              {item.name}
            </Button>
          ))}
        </CardContent>
      )}
    </Card>
  );
};

export default SelectSubject;
