import { Card } from "@/components/ui/card";
import MadrasaList from "./madrasa-list";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState, useEffect } from "react";

const Madrasas = () => {
  const [madrasas, setMadrasas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setError(false);
      setLoading(true);

      try {
        const response = await axios.get(`${import.meta.env.VITE_DUMMY_API}/mock-data/madrasas.json`, {
          signal,
        });
        const data = response?.data;

        setMadrasas(data);
      } catch (error) {
        console.error(error);
        setError(true);
      }
      setLoading(false);
    };

    fetchData();

    return () => {
      if (!madrasas) controller.abort();
    };
  }, []);

  if (error) return <>Error while fetching data!</>;
  if (loading) return <>Loading...</>;
  return (
    <Card className="shadow-lg rounded-md space-y-6 p-2">
      <MadrasaList madrasas={madrasas} />
      <Button
        className="self-center"
        onClick={() => console.log("Adding question button is working!")}>
        Add new madrasa
      </Button>
    </Card>
  );
};

export default Madrasas;
