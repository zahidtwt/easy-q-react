import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  useGetQuestionPaperDetails,
  useGetQuestionPaperDownloadPermission,
  useRemoveCategoryFromQuestionPaper,
  useUpdateQuestionPaper,
} from "@/hooks/useQuestionPaper";
import { IQuestionCategory } from "@/interfaces/question-category.interface";
// import { IQuestionCategory } from "@/interfaces/question-category.interface";
import PatternViews from "@/Modules/AdminDashboard/Pages/Subjects/Components/PatternViews";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SelectCategory from "./Components/SelectCategory";
// import { useGetQuestionList } from "@/hooks/useQuestions";
import QuestionSelectionModal from "./Components/QuestionSelectionModal";
import { useGetQuestionListForCategory } from "@/hooks/useQuestions";
import { IEditQuestionPaperCategoryPayload, IQuestionPaperRes } from "@/interfaces/question-paper.interface";
import { BlobProvider } from "@react-pdf/renderer";
import { QuestionPaperPDF } from "@/sections/question-paper/question-paper-pdf";
import { Download, Loader } from "lucide-react";
import { toast } from "sonner";
import { convertNumber } from "@/utils/number-converter";
interface IQuestionSelectModalOpenType {
  open: boolean;
  initialValues: null | IEditQuestionPaperCategoryPayload;
}

const PrepareQuestionPaper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // const [primarySymbol, setPrimarySymbol] = useState<string>("null");
  // const [secondarySymbol, setSecondarySymbol] = useState<string>("null");
  // const [optionSymbol, setOptionSymbol] = useState<string>("null");
  const [selectedCategory, setSelectedCategory] = useState<IQuestionCategory | null>(null);
  const [questionSelectModalOpen, setQuestionSelectModalOpen] = useState<IQuestionSelectModalOpenType>({
    open: false,
    initialValues: null,
  });

  // const examInfo = {
  //   schoolName: "বর্ডারগার্ড পাবলিক স্কুল অ্যান্ড কলেজ, রংপুর",
  //   className: "৯ম শ্রেণী",
  //   subject: "বাংলা প্রথম পত্র",
  //   subjectCode: "১০১",
  //   examDate: "২০২৩",
  // };
  // const questions = [
  //   {
  //     id: 1,
  //     text: "সাদাকাল আর রঙিনতার মধ্যে মূল ফারাক কী?",
  //     subQuestions: [
  //       { id: "ক", text: "বর্ণনা করুন।" },
  //       { id: "খ", text: "সাদাকালের প্রভাব ব্যাখ্যা করুন।" },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     text: "মা-মরা মেয়ে বলতে কী বোঝায়?",
  //   },
  //   {
  //     id: 3,
  //     text: "তোমার প্রিয় বইটি সম্পর্কে লিখ।",
  //   },
  // ];

  const downloadPermissionDecorator = (data: IQuestionPaperRes): IQuestionPaperRes => {
    if (data?.downloadCount > 0) {
      const downloadLink = document.getElementById("download-link");
      if (downloadLink) {
        downloadLink.click();
      }
    }

    return data;
  };

  const { data: questionPaperDetails, isLoading: questionPaperDetailsLoading } = useGetQuestionPaperDetails({
    id: id,
  });

  const {
    data: lessonListWithQuestion,
    isPending: lessonListWithQuestionLoading,
    mutate: getQuestionList,
  } = useGetQuestionListForCategory({});

  const { mutate: removeCategoryFunc } = useRemoveCategoryFromQuestionPaper({});
  const { mutate: updateQuestionSymbol, isPending: symbolUpdateLoading } = useUpdateQuestionPaper({});

  const {
    mutate: getDownloadPermission,
    isPending: permissionPending,
    // data: downloadPermissionData,
  } = useGetQuestionPaperDownloadPermission({
    dataDecorator: downloadPermissionDecorator,
  });

  const handleDownload = () => {
    if (!id) {
      toast.success("Question Paper not found");
    }
    getDownloadPermission(id as string);
  };

  return (
    <div className="relative  px-3">
      {questionPaperDetails && (
        <div className="w-full ">
          <Card className="w-full bg-purple-200 rounded-lg shadow-lg mt-4">
            <CardHeader className="bg-purple-500 text-white text-center font-bold rounded-t-lg p-4 relative">
              <div className="absolute top-2 left-2">
                <Button
                  variant="ghost"
                  className="text-blue-500 font-semibold bg-transparent"
                  onClick={() => navigate(-1)}>
                  <ArrowLeft size="24" />
                </Button>
              </div>

              {questionPaperDetails?.institute.name}
            </CardHeader>
            <CardContent className="grid grid-cols-6 gap-4 mt-4">
              <div className="col-span-4 bg-purple-300 text-center py-2 rounded-lg">
                {questionPaperDetails?.examName ?? "---- -----"} - {questionPaperDetails?.examYear ?? "YYYY"}
              </div>
              <div className="col-span-2 bg-purple-300 text-center py-2 rounded-lg">
                {questionPaperDetails?.classId.name}
              </div>
              <div className="col-span-2 bg-purple-300 text-center py-2 rounded-lg">
                সময়ঃ {questionPaperDetails?.examDuration ? questionPaperDetails?.examDuration / 60 + " ঘন্টা" : "----"}
              </div>
              <div className="col-span-2 bg-purple-300 text-center py-2 rounded-lg">
                বিষয়ঃ {questionPaperDetails?.subject.name}
              </div>
              <div className="col-span-2 bg-purple-300 text-center py-2 rounded-lg">
                পূর্ণমানঃ {questionPaperDetails?.examFullMarks ?? "----"}
              </div>
            </CardContent>
          </Card>

          <div className="w-full pt-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col items-start">
                <Label className="pb-2">Primary Symbol :</Label>
                <div className="w-full min-w-44">
                  <Select
                    onValueChange={(value) => {
                      // setPrimarySymbol(value);
                      updateQuestionSymbol({
                        _id: id as string,
                        primarySymbol: value,
                        secondarySymbol: questionPaperDetails?.secondarySymbol ?? "null",
                        optionSymbol: questionPaperDetails?.optionSymbol ?? "null",
                      });
                    }}
                    // value={primarySymbol}
                    value={questionPaperDetails?.primarySymbol ?? "null"}
                    disabled={symbolUpdateLoading}
                    defaultValue={questionPaperDetails?.primarySymbol ?? "null"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">No Symbol</SelectItem>
                      <SelectItem value="numeric">1.</SelectItem>
                      <SelectItem value="roman">I.</SelectItem>
                      <SelectItem value="smallRoman">i.</SelectItem>
                      <SelectItem value="bangle">ক.</SelectItem>
                      <SelectItem value="smallEnglish">a.</SelectItem>
                      <SelectItem value="capitalEnglish">A.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col items-start">
                <Label className="pb-2">Secondary Symbol :</Label>
                <div className="w-full min-w-44">
                  <Select
                    onValueChange={(value) => {
                      // setSecondarySymbol(value);
                      updateQuestionSymbol({
                        _id: id as string,
                        // primarySymbol: primarySymbol,
                        // secondarySymbol: value,
                        // optionSymbol: optionSymbol,
                        primarySymbol: questionPaperDetails?.primarySymbol ?? "null",
                        secondarySymbol: value,
                        optionSymbol: questionPaperDetails?.optionSymbol ?? "null",
                      });
                    }}
                    // value={secondarySymbol}
                    // defaultValue={secondarySymbol}
                    value={questionPaperDetails?.secondarySymbol ?? "null"}
                    disabled={symbolUpdateLoading}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">No Symbol</SelectItem>
                      <SelectItem value="numeric">1.</SelectItem>
                      <SelectItem value="roman">I.</SelectItem>
                      <SelectItem value="smallRoman">i.</SelectItem>
                      <SelectItem value="bangle">ক.</SelectItem>
                      <SelectItem value="smallEnglish">a.</SelectItem>
                      <SelectItem value="capitalEnglish">A.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col items-start">
                <Label className="pb-2">Option Symbol :</Label>
                <div className="w-full min-w-44">
                  <Select
                    onValueChange={(value) => {
                      // setOptionSymbol(value);
                      updateQuestionSymbol({
                        _id: id as string,
                        // primarySymbol: primarySymbol,
                        // secondarySymbol: secondarySymbol,
                        // optionSymbol: value,
                        primarySymbol: questionPaperDetails?.primarySymbol ?? "null",
                        secondarySymbol: questionPaperDetails?.secondarySymbol ?? "null",
                        optionSymbol: value,
                      });
                    }}
                    // value={optionSymbol}
                    // defaultValue={optionSymbol}
                    value={questionPaperDetails?.optionSymbol ?? "null"}
                    disabled={symbolUpdateLoading}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">No Symbol</SelectItem>
                      <SelectItem value="numeric">1.</SelectItem>
                      <SelectItem value="roman">I.</SelectItem>
                      <SelectItem value="smallRoman">i.</SelectItem>
                      <SelectItem value="bangle">ক.</SelectItem>
                      <SelectItem value="smallEnglish">a.</SelectItem>
                      <SelectItem value="capitalEnglish">A.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex justify-between items-center pt-3">
              <Button onClick={() => setOpen(true)}>Select Category</Button>

              <Button
                title="Download"
                onClick={handleDownload}
                disabled={permissionPending}
                variant="outline">
                <>
                  {permissionPending ? (
                    <div className="flex gap-4 justify-center align-middle">
                      <Loader /> Loading...
                    </div>
                  ) : (
                    <div className="flex gap-4 justify-center align-middle">
                      <Download /> Download Question Paper
                    </div>
                  )}
                </>
              </Button>

              {/* Hidden link to trigger automatic download once data is ready */}
              {questionPaperDetails && questionPaperDetails.downloadCount >= 0 && (
                <BlobProvider document={<QuestionPaperPDF questionPaperDetails={questionPaperDetails} />}>
                  {({ url, loading }) =>
                    !loading &&
                    url && (
                      <a
                        id="download-link"
                        href={url}
                        download="question-paper.pdf"
                        style={{ display: "none" }}>
                        Download
                      </a>
                    )
                  }
                </BlobProvider>
              )}
            </div>
          </div>

          {!questionPaperDetailsLoading && questionPaperDetails.questionCategory.length > 0 && (
            <div>
              {questionPaperDetails.questionCategory
                .sort((a, b) => a.position - b.position)
                .map((item) => (
                  <div
                    key={item.questionCategoryId._id}
                    className="bg-gray-100 p-2 rounded-lg mt-2">
                    <div className="items-top flex justify-between align-middle pt-1">
                      <Label className="text-sm font-medium truncate max-w-[250px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {convertNumber(item.position, questionPaperDetails?.primarySymbol)}.{" "}
                        {item.questionCategoryId.questionCategoryName}
                      </Label>

                      <div className="flex justify-between space-x-2 align-middle">
                        <div className="text-xs">Marks: {item.marks}</div>
                        <Popover>
                          <PopoverTrigger>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              // stroke-width="2"
                              // stroke-linecap="round"
                              // stroke-linejoin="round"
                              className="lucide lucide-ellipsis-vertical">
                              <circle
                                cx="12"
                                cy="12"
                                r="1"
                              />
                              <circle
                                cx="12"
                                cy="5"
                                r="1"
                              />
                              <circle
                                cx="12"
                                cy="19"
                                r="1"
                              />
                            </svg>
                          </PopoverTrigger>
                          <PopoverContent className="w-36 sm:mr-2 md:mr-20 lg:mr-20 xl:mr-20">
                            <div className="flex flex-col gap-3">
                              <Button
                                onClick={() => {
                                  setSelectedCategory(item.questionCategoryId);
                                  setQuestionSelectModalOpen({
                                    open: true,
                                    initialValues: {
                                      marks: item.marks,
                                      position: item.position,
                                      question: item.question ?? [""],
                                      questionInput: item.questionInput ?? "",
                                      questionCategoryId: item.questionCategoryId._id,
                                      questionPaperId: questionPaperDetails._id,
                                    },
                                  });

                                  getQuestionList({
                                    query: {
                                      subject: questionPaperDetails.subject._id,
                                      questionCategory: item.questionCategoryId._id,
                                    },
                                    sortField: "lessonNo",
                                    sortOrder: 1,
                                  });
                                }}
                                variant="outline"
                                className="flex gap-2 align-middle">
                                <Pencil size={16} /> <span>Edit</span>
                              </Button>
                              <Button
                                onClick={() => {
                                  removeCategoryFunc({ _id: questionPaperDetails._id, categoryId: item._id });
                                }}
                                variant="outline"
                                className="flex gap-2 align-middle text-red-700">
                                <Trash2 size={16} /> <span>Delete</span>
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {item?.question.length ? (
                      <div>
                        <PatternViews
                          patternKey={(item.questionCategoryId as IQuestionCategory).selectedPatternKey}
                          value={item.question}
                          secondarySymbol={questionPaperDetails?.secondarySymbol}
                          optionSymbol={questionPaperDetails?.optionSymbol}
                        />
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {questionPaperDetails && id && (
        <SelectCategory
          open={open}
          setOpen={setOpen}
          subjectId={questionPaperDetails?.subject._id}
          questionPaperId={id}
          selectedCategories={questionPaperDetails.questionCategory.map((item) => item.questionCategoryId._id)}
        />
      )}

      {questionSelectModalOpen.open &&
        selectedCategory &&
        selectedCategory._id &&
        questionPaperDetails?.subject._id && (
          <QuestionSelectionModal
            selectedCategory={selectedCategory}
            open={questionSelectModalOpen.open}
            initialValues={questionSelectModalOpen.initialValues}
            setOpen={setQuestionSelectModalOpen}
            lessonListWithQuestion={lessonListWithQuestion}
            lessonListWithQuestionLoading={lessonListWithQuestionLoading}
          />
        )}
    </div>
  );
};

export default PrepareQuestionPaper;
