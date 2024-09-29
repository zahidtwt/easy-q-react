import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetEducationBoardList } from "@/hooks/useEducationBoard";
import { EducationBoard } from "@/interfaces/education-board";
import { IInstitution } from "@/interfaces/institution";
import { ArrowLeft } from "lucide-react";

const EducationBoardList = ({
  setCurrentTab,
  setSelectedBoard,
  selectedInstitution,
}: {
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  setSelectedBoard: (board: EducationBoard) => void;
  selectedInstitution: IInstitution;
}) => {
  const dataDecorator = (data: EducationBoard[]) => {
    return data.filter((item) => selectedInstitution.educationBoardIds.includes(item._id));
    // return data as EducationBoard[];
  };

  const {
    isLoading: educationBoardLoading,
    data: eduBoardList,
    // error: edBoardList,
    // refetch: getAgainBoardList,
  } = useGetEducationBoardList({ dataDecorator });

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
        শিক্ষা বোর্ড নির্বাচন করুন
      </CardHeader>
      {educationBoardLoading ? (
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
          {eduBoardList?.map((item) => (
            // <Button
            //   key={item._id}
            //   onClick={() => {
            //     setCurrentTab((prev) => prev + 1);
            //     setSelectedBoard(item);
            //   }}
            //   className="bg-gray-100 hover:bg-gray-200 py-2 rounded-lg text-gray-950">
            //   {item.name}
            // </Button>

            <div
              key={item._id}
              onClick={() => {
                setCurrentTab((prev) => prev + 1);
                setSelectedBoard(item);
              }}
              className="bg-gray-100 hover:bg-gray-200 py-2 px-1 rounded-lg text-gray-950 cursor-pointer">
              <p className="w-full text-center">{item.name}</p>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
};

export default EducationBoardList;
