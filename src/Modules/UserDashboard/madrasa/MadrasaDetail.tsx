import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import InstituteFormModal from "@/Modules/AdminDashboard/Pages/InstitutionList/Components/InstituteFormModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MadrasaForm from "./components/MadrasaForm";
import { useGetInstitutionDetail } from "@/hooks/useInstitution";
import { useGetEducationBoardList } from "@/hooks/useEducationBoard";
import Clip from "@/components/Clip";
import { EducationBoard } from "@/interfaces/education-board";
import { ArrowLeft } from "lucide-react";

const MadrasaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, data: madrasaDetail } = useGetInstitutionDetail({ id: id });
  const { data: eduBoardList } = useGetEducationBoardList({});

  const [open, setOpen] = useState(false);

  const decoratedEducationList = useMemo(() => {
    const educationListDecorator = (): EducationBoard[] | [] => {
      if (eduBoardList === undefined) return [];

      return eduBoardList.filter((item) => madrasaDetail?.educationBoardIds.includes(item._id));
    };
    return educationListDecorator();
  }, [eduBoardList, madrasaDetail]);

  if (isLoading) {
    return <p> loading ...</p>;
  }

  return (
    <div className="p-3 relative">
      <div className="absolute top-2 right-2">
        <Button
          variant="outline"
          className="text-blue-500 font-semibold bg-transparent border-blue-500"
          onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>

      <div className="absolute top-2 left-2">
        <Button
          variant="ghost"
          className="text-blue-500 font-semibold bg-transparent"
          onClick={() => navigate(-1)}>
          <ArrowLeft size="24" />
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-2 items-center mb-5">
        <div className="col-span-12 grid justify-center">
          <div className="h-24 w-24 rounded-sm overflow-hidden imageArea relative">
            <Avatar className="h-24 w-24 rounded-sm">
              <AvatarImage src={madrasaDetail?.imageURL} />
              <AvatarFallback>{"Ja".toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="col-span-12 grid ">
          <h3 className="text-center font-semibold text-xl mb-1">{madrasaDetail.name}</h3>
          <small className="text-center text-gray-500">{madrasaDetail.address}</small>
        </div>
      </div>

      <div className="grid gap-5">
        <div className="col-span-12">
          <MadrasaForm
            defaultValues={{
              email: madrasaDetail?.email,
              madrasaName: madrasaDetail?.name,
              madrasaAddress: madrasaDetail?.address,
              mobile: madrasaDetail?.phoneNumber,
            }}
            editable={false}
            updateMadrasaDetail={() => {}}
          />
        </div>

        <div className="col-span-12">
          <div className="w-full">
            <div className="w-full flex justify-between items-center mb-2">
              <p className="font-medium text-xl">{"Board"}</p>
            </div>
            <div className="w-full border-2 border-spacing-1 border-gray-50 rounded-md min-h-10">
              <div className="flex flex-wrap gap-3 p-2">
                {decoratedEducationList &&
                  decoratedEducationList.map((item) => (
                    <Clip
                      key={item._id}
                      name={item.name}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <InstituteFormModal
        open={open}
        setOpen={setOpen}
        initialValues={madrasaDetail}
      />
    </div>
  );
};

export default MadrasaDetail;
