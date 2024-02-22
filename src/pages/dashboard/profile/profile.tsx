import imagePlaceholder from "@/assets/image-dummy.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";

const Profile = () => {
  return (
    <div className=" py-2 text-center space-y-8 overflow-x-scroll">
      <Card>
        <CardContent className="flex flex-col justify-center items-center gap-2 shadow-lg rounded-md p-2 relative">
          <Edit className="absolute top-1 right-1" />
          <Avatar className="border border-slate-500 size-16">
            <AvatarImage src={imagePlaceholder} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <p>Jamia Islamia Rowjatul Ulum Madrasa</p>
            <small>Hat Govindpur, Faridpur</small>
          </div>

          <CardFooter>
            <div>
              <p className="block">
                Mobile: <span>016XXXXX541</span>
              </p>
              <p className="block">
                Email: <span>zaberXXXXX@gmail.com</span>
              </p>
            </div>
          </CardFooter>
        </CardContent>
      </Card>

      <Card className="flex flex-col justify-center items-center gap-2 shadow-lg rounded-md">
        <CardHeader>
          <CardTitle className="border border-gray-400 rounded-md py-1 px-2 bg-slate-100 text-md font-medium">
            Education board
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="border border-gray-400 py-1 px-2 text-sm rounded-sm bg-slate-300">
            Nurani Education Board, Chittagong
          </p>
          <p className="border border-gray-400 py-1 px-2 text-sm rounded-sm bg-slate-300">
            Nurani Education Board, Rangpur
          </p>
        </CardContent>

        <CardFooter>
          <Button>Add new education board</Button>
        </CardFooter>
      </Card>

      <Card className="flex flex-col justify-center items-center gap-2 shadow-lg rounded-md">
        <CardHeader>
          <CardTitle className="border border-gray-400 rounded-md py-1 px-2 bg-slate-100 text-md font-medium">
            Class
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-x-8 gap-y-4">
          <p className="border border-gray-400 py-1 px-2 text-sm rounded-sm bg-slate-300">Class one</p>
          <p className="border border-gray-400 py-1 px-2 text-sm rounded-sm bg-slate-300">Class two</p>
          <p className="border border-gray-400 py-1 px-2 text-sm rounded-sm bg-slate-300">Class three</p>
        </CardContent>

        <CardFooter>
          <Button>Add new class</Button>
        </CardFooter>
      </Card>

      <Button className="mt-4">Save</Button>
    </div>
  );
};

export default Profile;
