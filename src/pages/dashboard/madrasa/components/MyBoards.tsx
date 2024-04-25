import { useState } from "react";
import BoardCard from "./BoardCard";
import SelectItemsForBoardCard from "./SelectItemsForBoardCard";
type boardListType = {
  id: string;
  name: string;
};
const MyBoards = () => {
  const title = "Education Board";
  // const addNewMadrasa = () => {};
  const boardList: boardListType[] = [
    {
      id: "srg987sf",
      name: "board Name",
    },
    {
      id: "srg9saef87sf",
      name: "board Name",
    },
    {
      id: "srg98wfgt7sf",
      name: "board Name",
    },
  ];
  const [open, setOpen] = useState(false);
  const modalToggoler = () => {
    setOpen(true);
  };

  return (
    <>
      <BoardCard
        name={"Board"}
        title={title}
        addNewFunc={modalToggoler}
        list={boardList}
      />

      {open && (
        <SelectItemsForBoardCard
          title={"Education Boards"}
          open={open}
          setOpen={setOpen}
          itemList={boardList}
        />
      )}
    </>
  );
};

export default MyBoards;
