import TotalCountCard from "../TotalCountCard/TotalCountCard";
import { TotalCountCardListType } from "./TotalCountCardList.interface";

const TotalCountCardList = ({ totalCountData }: TotalCountCardListType) => {
  const colorSet = [
    {
      iconColor: "text-purple-600",
      iconBgColor: " bg-purple-600/20",
    },
    {
      iconColor: "text-blue-600",
      iconBgColor: " bg-blue-600/20",
    },
    {
      iconColor: "text-green-600",
      iconBgColor: " bg-green-600/20",
    },
    {
      iconColor: "text-red-600",
      iconBgColor: " bg-purple-600/20",
    },
  ];

  return (
    <div className="grid gap-3 grid-cols-4 p-4">
      {totalCountData.map((item, index) => (
        <TotalCountCard
          key={index}
          title={item.title}
          count={item.count}
          icon={
            <div className={`rounded-full p-3 mb-3 ${colorSet[index].iconBgColor} ${colorSet[index].iconColor}`}>
              {item.icon}
            </div>
          }
        />
      ))}
    </div>
  );
};

export default TotalCountCardList;
