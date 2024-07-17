// import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MadrasaList from "./madrasa-list";
import { errorHandler } from "@/utils/errorHandler";
import { useGetInstitutionList } from "@/hooks/useInstitution";

const Madrasas = () => {
  const { isLoading: loading, isSuccess, data: madrasas, isError, error } = useGetInstitutionList({});

  if (loading) return <>Loading...</>;
  if (isError) return <>{errorHandler(error)}!</>;
  return (
    <Card className="shadow-lg rounded-md space-y-6 p-2 bg-white/20">
      {isSuccess && <MadrasaList madrasas={madrasas} />}
    </Card>
  );
};

export default Madrasas;
