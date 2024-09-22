import RenderListItems from "@/components/render-list-items";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent } from "@/components/ui/card";
import { IInstitution } from "@/interfaces/institution";
import { useNavigate } from "react-router-dom";

const MadrasaCard = ({ madrasa }: { madrasa: IInstitution }) => {
  const navigate = useNavigate();
  return (
    <CardContent
      onClick={() => navigate(`/madrasa/${madrasa._id}`)}
      className="flex items-center p-2 shadow-sm shadow-slate-300 rounded-md bg-white cursor-pointer">
      <Avatar className="size-16 border border-slate-500">
        <AvatarImage src={madrasa?.imageURL} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex flex-col ml-2 justify-center flex-grow">
        <p className="text-center">{madrasa.name}</p>
        <small className="text-center">{madrasa.address}</small>
      </div>
    </CardContent>
  );
};

const MadrasaList = ({ madrasas }: { madrasas: IInstitution[] }) => {
  return (
    <RenderListItems
      items={madrasas}
      className="space-y-3"
      renderItem={(madrasa: IInstitution) => (
        <MadrasaCard
          madrasa={madrasa}
          key={madrasa._id}
        />
      )}
    />
  );
};

export default MadrasaList;
