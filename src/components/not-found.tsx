import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen p-2">
      <Card className="w-[420px] shadow-md border-2 border-gray-900">
        <CardHeader className="text-center">
          <CardTitle className="lg:text-7xl text-4xl text-red-500">404</CardTitle>
          <CardDescription>The page you’re looking for doesn’t exist.</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
