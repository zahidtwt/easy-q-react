import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetClassList } from "@/hooks/useClass";
import { IClassRes } from "@/interfaces/class.interface";
import { ArrowLeft } from "lucide-react";

const SelectClass = ({
  selectedBoardId,
  setCurrentTab,
  setSelectedClass,
}: {
  selectedBoardId: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  setSelectedClass: (item: IClassRes) => void;
}) => {
  const { isLoading, data: classList } = useGetClassList({ boardId: selectedBoardId });

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
        ক্লাস নির্বাচন করুন
      </CardHeader>
      {isLoading ? (
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
          {classList?.map((item) => (
            // <Button
            //   key={item._id}
            //   onClick={() => {
            //     setCurrentTab((prev) => prev + 1);
            //     setSelectedClass(item);
            //   }}
            //   className="bg-gray-100 hover:bg-gray-200 py-2 rounded-lg text-gray-950">
            //   {item.name}
            // </Button>

            <div
              key={item._id}
              onClick={() => {
                setCurrentTab((prev) => prev + 1);
                setSelectedClass(item);
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

export default SelectClass;
