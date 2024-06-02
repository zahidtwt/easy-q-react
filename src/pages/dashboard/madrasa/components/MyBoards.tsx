import { useState } from "react";
import BoardCard from "./BoardCard";
import SelectItemsForBoardCard from "./SelectItemsForBoardCard";
import { useGetEducationBoardList } from "@/hooks/useEducationBoard";

const MyBoards = () => {
  const title = "Education Board";
  const [open, setOpen] = useState(false);
  const modalToggoler = () => {
    setOpen(true);
  };

  const {
    // isLoading,
    data: eduBoardList,
    // error: edBoardList,
    // refetch: getAgainBoardList,
  } = useGetEducationBoardList({});

  return (
    <>
      {eduBoardList && (
        <BoardCard
          name={"Board"}
          title={title}
          addNewFunc={modalToggoler}
          list={eduBoardList}
        />
      )}

      {open && eduBoardList && (
        <SelectItemsForBoardCard
          title={"Education Boards"}
          open={open}
          setOpen={setOpen}
          itemList={eduBoardList}
        />
      )}
    </>
  );
};

export default MyBoards;
