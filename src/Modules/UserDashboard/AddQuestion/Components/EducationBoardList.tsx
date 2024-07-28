import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetEducationBoardList } from "@/hooks/useEducationBoard";
import { EducationBoard } from "@/interfaces/education-board";

const EducationBoardList = ({
  setCurrentTab,
  setSelectedBoard,
}: {
  setCurrentTab: (tab: number) => void;
  setSelectedBoard: (board: EducationBoard) => void;
}) => {
  const {
    isLoading: educationBoardLoading,
    data: eduBoardList,
    // error: edBoardList,
    // refetch: getAgainBoardList,
  } = useGetEducationBoardList({});

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="bg-pink-500 text-white text-center font-bold rounded-t-lg p-4">
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
            <Button
              key={item._id}
              onClick={() => {
                setCurrentTab(2);
                setSelectedBoard(item);
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

export default EducationBoardList;
