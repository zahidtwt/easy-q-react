import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useLogout from "@/Modules/Auth/hooks/useLogout";
import getUserDataFromLocalStorage from "@/utils/getUserDataFromLocalStorage";
import { ArrowLeftFromLine, Edit } from "lucide-react";

const ProfileCard = ({ handleEditClick }: { handleEditClick: () => void }) => {
  const { logout } = useLogout();
  const userData = getUserDataFromLocalStorage();

  return (
    <div>
      <div className="flex justify-between">
        <Avatar className="border border-slate-300 size-24">
          <AvatarImage src={userData.imageURL} />
          <AvatarFallback className="uppercase">{userData?.firstName.slice(0, 2)}</AvatarFallback>
        </Avatar>

        <div className="flex justify-end gap-3">
          <Button
            onClick={handleEditClick}
            variant="outline"
            className="cursor-pointer bg-blue-700 hover:bg-blue-500 text-white hover:text-white hover:shadow-lg">
            <Edit className="mr-3" />
            Edit Profile
          </Button>

          <Button
            onClick={() => logout()}
            variant="outline"
            className="cursor-pointer bg-red-700 hover:bg-red-500 text-white hover:text-white hover:shadow-lg">
            <ArrowLeftFromLine className="mr-3" />
            Logout
          </Button>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-2">
        {userData?.firstName} {userData?.lastName}
      </h2>
      <p>
        <strong>Phone:</strong> {userData?.phone}
      </p>
      <p>
        <strong>Email:</strong> {userData?.email}
      </p>
      <p>
        <strong>Balance:</strong> ${userData?.balance || 0}
      </p>
      <p>
        <strong>Total Questions Created:</strong> {userData?.totalQuestions || 0}
      </p>
      <p>
        <strong>Total Institutes Worked For:</strong> {userData?.totalInstitutes || 0}
      </p>
    </div>
  );
};

export default ProfileCard;
