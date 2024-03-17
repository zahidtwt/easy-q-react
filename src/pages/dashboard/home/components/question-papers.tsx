import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import QuestionPaperList from "./question-paper-list";

const QuestionPapers = () => {
  const [questionPapers, setQuestionPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setError(false);
      setLoading(true);

      try {
        const response = await axios.get(`${import.meta.env.VITE_DUMMY_API}/mock-data/question-papers.json`, {
          signal,
        });
        const data = response?.data;

        setQuestionPapers(data);
      } catch (error) {
        console.error(error);
        setError(true);
      }
      setLoading(false);
    };

    fetchData();

    return () => {
      if (!questionPapers) controller.abort();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) return <>Error while fetching data!</>;
  if (loading) return <>Loading...</>;
  return (
    <Card className="p-2 rounded-md shadow-lg ">
      <CardTitle className="border border-gray-400 rounded-md bg-slate-100 text-md font-medium mt-2">
        Your work
      </CardTitle>

      <QuestionPaperList questionPapers={questionPapers} />

      <Button
        className="self-center"
        onClick={() => {}}>
        Add new question
      </Button>
    </Card>
  );
};

export default QuestionPapers;
