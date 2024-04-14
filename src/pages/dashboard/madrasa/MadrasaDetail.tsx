import { useParams } from "react-router-dom";

const MadrasaDetail = () => {
  const param = useParams();
  return <div>{param.id}</div>;
};

export default MadrasaDetail;
