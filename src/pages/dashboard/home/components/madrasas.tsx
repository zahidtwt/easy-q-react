import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MadrasaList from "./madrasa-list";
import useGetInstitution from "../hooks/useGetInstitution";
import { errorHandler } from "@/utils/errorHandler";

const Madrasas = () => {
  const { isLoading: loading, isSuccess, data: madrasas, isError, error } = useGetInstitution({});

  if (loading) return <>Loading...</>;
  if (isError) return <>{errorHandler(error)}!</>;
  return (
    <Card className="shadow-lg rounded-md space-y-6 p-2">
      {isSuccess && <MadrasaList madrasas={madrasas} />}
      <Button
        className="self-center"
        onClick={() => {}}>
        Add new madrasa
      </Button>
    </Card>
  );
};

export default Madrasas;
