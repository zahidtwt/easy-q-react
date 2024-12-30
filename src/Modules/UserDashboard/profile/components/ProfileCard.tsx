import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUserData } from "@/hooks/useUser";
import useLogout from "@/Modules/Auth/hooks/useLogout";
import { ArrowLeftFromLine, Edit, Gem } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileCardSkeleton = () => {
  return (
    <>
      <div className="col-span-12 md:col-span-3">
        <div className="flex justify-between">
          <div className="border border-slate-300 rounded-full w-24 h-24 bg-gray-300 animate-pulse"></div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-9 space-y-2">
        <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
      </div>
    </>
  );
};

const ProfileCard = ({ handleEditClick }: { handleEditClick: () => void }) => {
  const { logout } = useLogout();
  // const userData = getUserDataFromLocalStorage();
  const { data: userData, isLoading: userDataLoading } = useUserData({});
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {!userDataLoading && userData ? (
        <>
          <div className="col-span-12 md:col-span-3">
            <div className="flex justify-between">
              <Avatar className="border border-slate-300 size-24">
                <AvatarImage src={userData.imageURL} />
                <AvatarFallback className="uppercase">{userData?.firstName.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="col-span-12 md:col-span-9 space-y-2">
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
              <strong>Available Question Set:</strong>
              {userData.freeSubscription.questionSetQuantity +
                userData.customSubscription.questionSetQuantity +
                userData.premiumSubscription.questionSetQuantity}
            </p>
            <p>
              <strong>Total Questions Created:</strong> {userData?.totalQuestions || 0}
            </p>
            <p>
              <strong>Total Institutes Worked For:</strong> {userData?.totalInstitutes || 0}
            </p>
          </div>
        </>
      ) : (
        <ProfileCardSkeleton />
      )}

      <div className="col-span-12">
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => navigate("/subscription-package")}
            variant="outline"
            className="cursor-pointer hover:shadow-lg flex justify-start text-gray-600">
            <Gem className="mr-3" />
            Subscription Package
          </Button>

          <Button
            onClick={() => navigate("/profile/subscription-list")}
            variant="outline"
            className="cursor-pointer hover:shadow-lg flex justify-start text-gray-600">
            <Gem className="mr-3" />
            Subscription Request List
          </Button>

          <Button
            onClick={handleEditClick}
            variant="outline"
            className="cursor-pointer bg-blue-500 hover:bg-blue-500/90 text-white hover:text-white hover:shadow-lg flex justify-start">
            <Edit className="mr-3" />
            Edit Profile
          </Button>

          <Button
            onClick={() => logout()}
            variant="outline"
            className="cursor-pointer bg-red-500 hover:bg-red-500/90 text-white hover:text-white hover:shadow-lg flex justify-start">
            <ArrowLeftFromLine className="mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
