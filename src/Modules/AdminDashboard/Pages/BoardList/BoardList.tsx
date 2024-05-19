import { UserCircle } from "lucide-react";
import TotalCountCardList from "../../Components/TotalCountCardList/TotalCountCardList";
import CustomTable from "../../Components/CustomTable/CustomTable";

const BoardList = () => {
  const totalCountData = [
    {
      title: "Total Education Board",
      count: "64",
      icon: <UserCircle />,
    },
    {
      title: "Total Institution",
      count: "452",
      icon: <UserCircle />,
    },
    {
      title: "Total Classes",
      count: "12",
      icon: <UserCircle />,
    },
    {
      title: "Total Question Set",
      count: "400+",
      icon: <UserCircle />,
    },
  ];
  return (
    <div>
      <TotalCountCardList totalCountData={totalCountData} />
      <CustomTable />
    </div>
  );
};

export default BoardList;
