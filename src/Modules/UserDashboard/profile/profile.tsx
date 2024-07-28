import { useState } from "react";
import ProfileCard from "./components/ProfileCard";
import ProfileForm from "./components/ProfileForm";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className=" py-2 text-center space-y-8 mx-10">
      <div
        className="rounded-md border border-gray-300 mx-auto my-5 p-5 text-center "
        style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        {isEditing ? <ProfileForm setIsEditing={setIsEditing} /> : <ProfileCard handleEditClick={handleEditClick} />}
      </div>
    </div>
  );
};

export default Profile;
