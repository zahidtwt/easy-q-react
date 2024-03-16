import imagePlaceholder from "@/assets/image-dummy.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent } from "@/components/ui/card";
import { IMadrasa } from "@/interfaces/madrasa";

type MadrasaCardProps = {
  madrasa: IMadrasa;
};

const MadrasaCard = ({ madrasa }: MadrasaCardProps) => {
  return (
    <CardContent className="flex items-center p-2 shadow-sm shadow-slate-300 rounded-md border border-slate-300">
      <Avatar className=" size-16 border border-slate-500">
        <AvatarImage src={imagePlaceholder} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div>
        <p>{madrasa.name}</p>
        <small>{madrasa.address}</small>
      </div>
    </CardContent>
  );
};

export default MadrasaCard;
