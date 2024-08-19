import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddQuestionCategoryModal from "./Components/AddQuestionCategoryModal";
import AddLessonModal from "./Components/AddLessonModal";

interface IQuestionCategory {
  title: string;
  pattern: string;
}
interface ILesson {
  title: string;
}

interface IOpenLessonFormType {
  open: boolean;
  initialValues: null | ILesson;
}

interface IOpenCategoryFormType {
  open: boolean;
  initialValues: null | IQuestionCategory;
}

const SubjectDetail = () => {
  const { subjectId } = useParams();

  const [openLessonForm, setOpenLessonForm] = useState<IOpenLessonFormType>({
    open: false,
    initialValues: null,
  });
  const [openCategoryForm, setOpenCategoryForm] = useState<IOpenCategoryFormType>({
    open: false,
    initialValues: null,
  });
  // const [openQuestionForm, setOpenQuestionForm] = useState(false);

  const [lessonList, setLessonList] = useState<string[]>([]);
  const [myCategories, setMyCategories] = useState<IQuestionCategory[]>([]);

  const setMyCategoryFunc = (data: { title: string; pattern: string }) => {
    setMyCategories([...myCategories, data]);
  };
  const setLessonListFunc = (data: string) => {
    setLessonList([...lessonList, data]);
  };

  return (
    <div className="container mt-8">
      <div className="border-2 border-gray-400 rounded-md p-3">
        <h1 className="text-center text-3xl border-b-gray-400 border-b-2 mb-6 pb-2">Bangla {subjectId}</h1>

        <div className="grid grid-cols-9 gap-8">
          <div className="col-span-3">
            <div className="grid grid-cols-1 gap-6">
              {/* Question Category  */}
              <div className="">
                <div className="flex justify-between">
                  <h4 className="text-xl font-semibold mb-2">Question Category List: </h4>
                  <Button
                    onClick={() =>
                      setOpenLessonForm({
                        open: true,
                        initialValues: null,
                      })
                    }
                    size="sm"
                    className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Category</span>
                  </Button>
                </div>

                <div className="container mx-auto p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <ul className="list-disc pl-5">
                        {myCategories.map((category, index) => (
                          <li
                            key={index}
                            onClick={() =>
                              setOpenLessonForm({
                                open: true,
                                initialValues: category,
                              })
                            }>
                            {category.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lesson List */}
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="text-xl font-semibold mb-2">Lesson List: </h4>
                  <Button
                    onClick={() =>
                      setOpenLessonForm({
                        open: true,
                        initialValues: null,
                      })
                    }
                    size="sm"
                    className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Lesson</span>
                  </Button>
                </div>
                <div className="container mx-auto p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <ul className="list-disc pl-5">
                        {lessonList.map((lesson, index) => (
                          <li
                            key={index}
                            onClick={() =>
                              setOpenLessonForm({
                                open: true,
                                initialValues: { title: lesson },
                              })
                            }>
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-6">
            <Accordion
              type="single"
              collapsible
              className="w-full">
              <AccordionItem value={"1"}>
                <div className="w-full flex justify-between border-b-2 border-gray-400 mb-2">
                  <AccordionTrigger className="text-lg font-semibold uppercase">Lesson 1</AccordionTrigger>
                  <Button
                    type="submit"
                    className="cursor-pointer">
                    Add Question
                  </Button>
                </div>

                <AccordionContent>
                  <div className="flex flex-col gap-10 ml-6">
                    <div className="">
                      <p className="text-base font-semibold leading-none mb-2">শব্দের অর্থ লেখ</p>
                      <p>
                        সৃষ্টিকর্তা, সৃষ্টি করা, বেঁটে, পাহাড়, পর্বত, হ্রদ, কীট, পতঙ্গ, সম্পদ, কয়লা, তারা, গ্রহ, গন্ধ,
                        শরীর, যন্ত্রপাতি, হৃৎপিণ্ড, পাকস্থলী, বড়, বিশ্ব, অদ্বিতীয়
                      </p>
                    </div>
                    <div className="">
                      <p className="text-base font-semibold leading-none mb-2">যুক্তবর্ণ ভেঙে নতুন শব্দ তৈরি কর</p>
                      <p>সৃষ্টি, পতঙ্গ, গন্ধ, যন্ত্রপাতি</p>
                    </div>
                    <div className="">
                      <p className="text-base font-semibold leading-none mb-2">নিচের প্রশ্নগুলোর উত্তর দাও</p>
                      <p>
                        এ বিশ্বের সৃষ্টিকর্তা কে? মাটির নিচে যে সম্পদ গুলো লুকানো আছে তাদের কয়েকটি নাম লিখ। রাতের বেলা
                        আমরা আকাশে কি কি দেখতে পাই? আমাদের দেহের ভেতরকার দু’টি যন্ত্রের নাম লিখ এবং তাদের কাজ কি কি লিখ।
                        আল্লাহ সকল কিছু কি জন্য সৃষ্টি করেছেন? তোমাদের চারদিকের দশটি বস্তুর নাম লিখ। আল্লাহকে অদ্বিতীয়
                        বলা হয় কেন? মানুষের আকৃতি কেমন?
                      </p>
                    </div>
                    <div className="">
                      <p className="text-base font-semibold leading-none mb-2">বিপরীত শব্দ লিখ</p>
                      <p>সাদা, বেঁটে, ধনী, দিন, ভেতর, বড়, উপকার</p>
                    </div>
                    <div className="">
                      <p className="text-base font-semibold leading-none mb-2">বাক্য রচনা কর</p>
                      <p>দুনিয়া, কীট-পতঙ্গ, সূর্য, শরীর, অদ্বিতীয়</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {openCategoryForm && (
        <AddQuestionCategoryModal
          open={openCategoryForm.open}
          setOpen={setOpenCategoryForm}
          setMyCategoryFunc={setMyCategoryFunc}
        />
      )}

      {openLessonForm.open && (
        <AddLessonModal
          open={openLessonForm.open}
          setOpen={setOpenLessonForm}
          setLessonListFunc={setLessonListFunc}
          initialValues={openLessonForm.initialValues}
        />
      )}
    </div>
  );
};

export default SubjectDetail;
