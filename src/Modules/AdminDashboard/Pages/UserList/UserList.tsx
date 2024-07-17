import { useState } from "react";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { useGetUserList, userQueryPayload } from "../../../../hooks/userUserList";
// import TotalCountCardList from "../../Components/TotalCountCardList/TotalCountCardList";

const UserList = () => {
  const [userFilter] = useState<userQueryPayload>({
    query: {},
    sortField: "firstName",
    sortOrder: 1,
  });
  const { data: userList, isLoading: getUserLoading } = useGetUserList({ filterData: userFilter });
  return (
    <div>
      {/* <TotalCountCardList totalCountData={totalCountData} /> */}
      <CustomTable
        userList={userList}
        getUserLoading={getUserLoading}
        // setUserFilter={setUserFilter}
      />
    </div>
  );
};

export default UserList;
