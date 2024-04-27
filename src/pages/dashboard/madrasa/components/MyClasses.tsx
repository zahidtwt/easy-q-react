import { useState } from "react";
import BoardCard from "./BoardCard";
import SelectItemsForBoardCard from "./SelectItemsForBoardCard";
type classListType = {
  id: string;
  name: string;
};

const MyClasses = () => {
  const title = "Classes";
  const classList: classListType[] = [
    {
      id: "srg987sf",
      name: "Classes One",
    },
    {
      id: "srg9saef87sf",
      name: "Classes Two",
    },
    {
      id: "srg98wfgt7sf",
      name: "Classes Three",
    },
  ];

  const [open, setOpen] = useState(false);
  const modalToggoler = () => {
    setOpen(true);
  };

  return (
    <>
      <BoardCard
        name={"Class"}
        title={title}
        addNewFunc={modalToggoler}
        list={classList}
      />

      {open && (
        <SelectItemsForBoardCard
          title={"Classes"}
          open={open}
          setOpen={setOpen}
          itemList={classList}
        />
      )}
    </>
  );
};

export default MyClasses;
