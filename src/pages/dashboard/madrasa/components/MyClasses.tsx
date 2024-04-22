import BoardCard from "./BoardCard";
type classListType = {
  id: string;
  name: string;
};

const MyClasses = () => {
  const title = "Classes";
  const addNewClass = () => {};
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
  return (
    <>
      <BoardCard
        title={title}
        addNewFunc={addNewClass}
        list={classList}
      />
    </>
  );
};

export default MyClasses;
