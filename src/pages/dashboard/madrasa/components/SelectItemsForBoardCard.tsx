import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EducationBoard } from "@/interfaces/education-board";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type itemDetailType = Pick<EducationBoard, "name"> & {
  onClickFunc: () => void;
};

const ItemDetail = ({ name, onClickFunc }: itemDetailType) => {
  return (
    <div
      className="col-span-6 relative cursor-pointer"
      onClick={onClickFunc}>
      {/* {checked && (
           <div className="absolute top-[-6px] right-[-6px]">
             <Circle
               size={20}
               color="white"
               fill={"#6366f1"}
             />
           </div>
         )} */}
      <div className="w-full p-2 bg-red-400 rounded-md">
        <p className="w-full text-ellipsis text-center text-white uppercase">{name}</p>
      </div>
    </div>
  );
};

const SelectItemsForBoardCard = ({
  title,
  open,
  setOpen,
  itemList,
}: {
  title: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  itemList: EducationBoard[];
}) => {
  const [cardList, setCardList] = useState(itemList);

  const removeItem = (removeItem: EducationBoard) => {
    setCardList((prev) => prev.filter((item) => item.id !== removeItem.id));
  };

  useEffect(() => {
    setCardList(itemList);
  }, [itemList]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h5 className="text-center">Choose Your {title}</h5>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          <div className="grid grid-cols-12 gap-3">
            {cardList.length > 0 &&
              cardList.map((item) => (
                <ItemDetail
                  key={item.id}
                  name={item.name}
                  onClickFunc={() => {
                    removeItem(item);
                  }}
                />
              ))}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default SelectItemsForBoardCard;
