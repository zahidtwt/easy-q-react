import { Card } from "@/components/ui/card";
import QuestionPaperList from "./question-paper-list";
import { errorHandler } from "@/utils/errorHandler";
import useGetQuestionPaper from "@/hooks/useGetQuestionPaper";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoicePDF } from "@/sections/invoice/invoice-pdf";
import { Download, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuestionPapers = () => {
  const { isLoading: loading, isSuccess, data: questionPapers, isError, error } = useGetQuestionPaper({});

  if (isError) return <>{errorHandler(error)}!</>;
  if (loading) return <>Loading...</>;

  const currentStatus = "draft";

  const invoice = {
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b20",
    taxes: 72.91,
    status: "paid",
    discount: 20.54,
    shipping: 94.25,
    subtotal: 2373.5099999999998,
    totalAmount: 2331.6299999999997,
    items: [
      {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
        total: 921.14,
        title: "Urban Explorer Sneakers",
        description: "The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.",
        price: 83.74,
        service: "CEO",
        quantity: 11,
      },
      {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
        total: 971.4,
        title: "Classic Leather Loafers",
        description: "She eagerly opened the gift, her eyes sparkling with excitement.",
        price: 97.14,
        service: "CTO",
        quantity: 10,
      },
      {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
        total: 480.96999999999997,
        title: "Mountain Trekking Boots",
        description: "The old oak tree stood tall and majestic, its branches swaying gently in the breeze.",
        price: 68.71,
        service: "Project Coordinator",
        quantity: 7,
      },
    ],
    invoiceNumber: "INV-19919",
    invoiceFrom: {
      id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b20",
      primary: false,
      name: "Ariana Lang",
      email: "olen.legros@gmail.com",
      fullAddress: "4642 Demetris Lane Suite 407 - Edmond, AZ / 60888",
      phoneNumber: "+54 11 1234-5678",
      company: "Bosco and Sons",
      addressType: "Office",
    },
    invoiceTo: {
      id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b21",
      primary: false,
      name: "Amiah Pruitt",
      email: "jimmie.gerhold73@hotmail.com",
      fullAddress: "74794 Asha Flat Suite 890 - Lancaster, OR / 13466",
      phoneNumber: "+64 9 123 4567",
      company: "Bartell - Kovacek",
      addressType: "Office",
    },
    sent: 9,
    createDate: "2024-07-28T14:03:58+06:00",
    dueDate: "2024-09-20T09:03:58+06:00",
  };

  const renderDownload = (
    <PDFDownloadLink
      document={
        <InvoicePDF
          invoice={invoice}
          currentStatus={currentStatus}
        />
      }
      fileName={invoice?.invoiceNumber}
      style={{ textDecoration: "none" }}>
      {({ loading }) => (
        <Button
          title="Download"
          variant="outline">
          <>
            {loading ? (
              <div className="flex gap-4 justify-center align-middle">
                <Loader /> Loading...
              </div>
            ) : (
              <div className="flex gap-4 justify-center align-middle">
                <Download /> Download PDF
              </div>
            )}
          </>
        </Button>
      )}
    </PDFDownloadLink>
  );

  return (
    <Card className="p-2 rounded-md shadow-lg bg-white/20">
      {renderDownload}

      {isSuccess && <QuestionPaperList questionPapers={questionPapers} />}
    </Card>
  );
};

export default QuestionPapers;
