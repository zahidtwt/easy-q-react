import BoardCard from "./BoardCard";
type boardListType = {
  id: string;
  name: string;
};
const MyBoards = () => {
  const title = "Education Board";
  const addNewMadrasa = () => {};
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
  return (
    <>
      <BoardCard
        title={title}
        addNewFunc={addNewMadrasa}
        list={boardList}
      />
    </>
  );
};

export default MyBoards;
