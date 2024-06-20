import { Button } from "@/components/ui/button";

const Questions = () => {
  return (
    <main className="py-2">
      <div className="flex flex-row items-center justify-around gap-2 shadow-lg rounded-lg p-2">
        <p>Each question costs 15 taka only</p>
        <Button>Create</Button>
      </div>
      <div className=""></div>
    </main>
  );
};

export default Questions;
