import { TotalCountCardType } from "./TotalCountCard.interface";

const TotalCountCard = ({ icon, title, count }: TotalCountCardType) => {
  return (
    <div className="w-full rounded-md shadow-lg min-h-10 flex flex-col items-center justify-center bg-white p-4">
      {icon}
      <h5 className="p-1 font-medium">{count}</h5>
      <small className="text-gray-500">{title}</small>
    </div>
  );
};

export default TotalCountCard;
