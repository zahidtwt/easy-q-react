import { HardDriveUpload } from "lucide-react";
import MadrasaForm from "./components/MadrasaForm";
import MyBoards from "./components/MyBoards";
import MyClasses from "./components/MyClasses";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const CreateMadrasa = () => {
  const editable = true;
  const defaultValues = {
    email: "",
    mobile: "",
    madrasaName: "",
    madrasaAddress: "",
  };

  const [uploadedFile, setUploadedFile] = useState<File>();

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("object", event.target.files![0]);
    const file = event.target.files![0];
    setUploadedFile(file);
  };

  return (
    <div className="p-3">
      <div className="grid grid-cols-12 gap-2 items-center mb-5">
        <div className="col-span-12 grid justify-center">
          <div className="h-24 w-24 rounded-sm overflow-hidden imageArea relative">
            <Avatar className="h-24 w-24 rounded-sm">
              {uploadedFile ? <AvatarImage src={URL.createObjectURL(uploadedFile)} /> : <AvatarImage src="" />}
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
                <small className="text-center uppercase text-white mt-2">Update Profile</small>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="grid gap-5">
        <div className="col-span-12">
          <MadrasaForm
            defaultValues={defaultValues}
            editable={editable}
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

export default CreateMadrasa;
