import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";
import useGetMadrasaDetail from "./hooks/useGetMadrasaDetail";
import MyBoards from "./components/MyBoards";
import MyClasses from "./components/MyClasses";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import MadrasaForm from "./components/MadrasaForm";
import { HardDriveUpload } from "lucide-react";

const MadrasaDetail = () => {
  const { id } = useParams();
  const { isLoading, refetch: reFetchMadrasaDetail } = useGetMadrasaDetail({ Id: id });
  const [editable, setEditable] = useState(false);

  const defaultValues = {
    email: "email@gmail.com",
    mobile: "01772536411",
    madrasaName: "Jamia Islamia Rowjatul Ulum Madrasa",
    madrasaAddress: "Hat Govindpur, Faridpur",
  };

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("object", event.target.files![0]);
  };

  const updateMadrasaDetail = () => {
    setEditable(false);
    reFetchMadrasaDetail();
  };

  if (isLoading) {
    return <p> loading ...</p>;
  }

  return (
    <div className="p-3 relative">
      <div className="absolute top-0 right-0">
        {!editable && (
          <Button
            variant="ghost"
            className="text-red-500"
            onClick={() => setEditable(true)}>
            Edit
          </Button>
        )}
      </div>

      <div className="grid grid-cols-12 gap-2 items-center mb-5">
        <div className="col-span-12 grid justify-center">
          <div className="h-24 w-24 rounded-sm overflow-hidden imageArea relative">
            <Avatar className="h-24 w-24 rounded-sm">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{"Ja".toUpperCase()}</AvatarFallback>
            </Avatar>
            <input
              className="hidden"
              type="file"
              id="madrasaImage"
              accept="image/png, image/jpeg"
              onChange={uploadImage}
            />
            <label
              className="bg-black/30 absolute top-0 bottom-0 left-0 right-0 z-10 overflow-hidden"
              htmlFor="madrasaImage">
              <div className="h-[100%] w-[100%] flex flex-col items-center justify-center rounded-sm border-2 border-white">
                <HardDriveUpload
                  size={40}
                  color="white"
                />
                <small className="text-center uppercase text-white mt-4">Update Profile</small>
              </div>
            </label>
          </div>
        </div>

        {!editable && (
          <div className="col-span-12 grid ">
            <h3 className="text-center font-semibold text-xl mb-1">Jamia Islamia Rowjatul Ulum Madrasa</h3>
            <small className="text-center text-gray-500">Hat Govindpur, Faridpur</small>
          </div>
        )}
      </div>

      <div className="grid gap-5">
        <div className="col-span-12">
          <MadrasaForm
            defaultValues={defaultValues}
            editable={editable}
            updateMadrasaDetail={updateMadrasaDetail}
          />
        </div>

        <div className="col-span-12">
          <MyBoards />
        </div>

        <div className="col-span-12">
          <MyClasses />
        </div>
      </div>
    </div>
  );
};

export default MadrasaDetail;
