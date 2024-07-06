import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import ClassSkeleton from "../ClassList/Components/ClassSkeleton";
import InstituteCard from "./Components/InstituteCard";
import InstituteFormModal from "./Components/InstituteFormModal";
import { useState } from "react";
import { IInstitution } from "@/interfaces/institution";
import { useGetInstitutionList } from "@/hooks/useInstitution";

const InstitutionList = () => {
  const [open, setOpen] = useState(false);
  const { isLoading, data: institutionList } = useGetInstitutionList({});

  return (
    <div className="container mt-8">
      <Card x-chunk="dashboard-06-chunk-0">
        <div className="flex justify-between items-center">
          <CardHeader>
            <CardTitle>Institution List</CardTitle>
          </CardHeader>

          <div className="ml-auto flex items-center gap-2 p-3">
            <Button
              onClick={() => setOpen(true)}
              size="sm"
              className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Institution</span>
            </Button>
          </div>
        </div>

        <CardContent>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10 py-5">
            {isLoading && (
              <>
                <ClassSkeleton />
                <ClassSkeleton />
                <ClassSkeleton />
                <ClassSkeleton />
                <ClassSkeleton />
                <ClassSkeleton />
                <ClassSkeleton />
                <ClassSkeleton />
              </>
            )}
            {institutionList?.map((institutionItem: IInstitution) => (
              <InstituteCard
                key={institutionItem._id}
                institutionItem={institutionItem}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

      {open && (
        <InstituteFormModal
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default InstitutionList;
