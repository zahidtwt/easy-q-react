import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetUserInstitutionList } from "@/hooks/useInstitution";
import { IInstitution } from "@/interfaces/institution";

const SelectInstitution = ({
  setCurrentTab,
  setSelectedInstitution,
}: {
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  setSelectedInstitution: (board: IInstitution) => void;
}) => {
  const { isLoading, data: institutionList } = useGetUserInstitutionList({});

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="bg-pink-500 text-white text-center font-bold rounded-t-lg p-4">
        প্রতিষ্ঠান নির্বাচন করুন
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
          {institutionList?.map((item) => (
            <Button
              key={item._id}
              onClick={() => {
                setCurrentTab((prev) => prev + 1);
                setSelectedInstitution(item);
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

export default SelectInstitution;
