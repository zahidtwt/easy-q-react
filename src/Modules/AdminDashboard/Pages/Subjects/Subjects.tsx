import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
export interface Artwork {
  artist: string;
  art: string;
}

export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
];

const Subjects = () => {
  const [myCategories, setMyCategories] = useState<
    {
      title: string;
      pattern: string;
    }[]
  >([]);

  const [lessonList, setLessonList] = useState<string[]>([]);
  const [lesson, setLesson] = useState<string>("");
  const [openLessonForm, setOpenLessonForm] = useState(false);

  const [categories, setCategories] = useState({
    title: "",
    pattern: "",
  });
  const [openCategoryForm, setOpenCategoryForm] = useState(false);
  const [showLesson, setShowLesson] = useState(false);

  const addCategory = () => {
    if (categories.title.trim() && categories.pattern.trim()) {
      setMyCategories([...myCategories, categories]);
      setCategories({ title: "", pattern: "" });
      setOpenCategoryForm(false);
    }
  };

  const titleInputFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategories({ ...categories, title: e.target.value });
  };

  const selectCategoryFunc = (id: string) => {
    setCategories({ ...categories, pattern: id });
  };

  const questionPattern = [
    {
      id: "1",
      name: "word_by_word",
      title: "word by word",
      patternDetector: ",",
      element: <p>----, ----, ----</p>,
      method: function name(params: string) {
        return params.split(",");
      },
    },
    {
      id: "2",
      name: "one_line_question",
      title: "one line question",
      patternDetector: "?|",
      element: (
        <div>
          <p>----------?</p>
          <p>----------|</p>
        </div>
      ),
      method: function name(params: string) {
        return params;
      },
    },
    {
      id: "3",
      name: "question_with_options",
      patternDetector: "?|,,,",
      element: <p>----------? ----, ----, ----, ----</p>,
      method: function name(params: string) {
        return params;
      },
    },
    {
      id: "4",
      name: "table_match",
      patternDetector: "| ,",
      element: (
        <div>
          <p>---- | ----</p>
          <p>---- | ----</p>
          <p>---- | ----</p>
        </div>
      ),
      method: function name(params: string) {
        return params;
      },
    },
    {
      id: "5",
      name: "feel_in_the_blanks",
      patternDetector: "|,",
      element: (
        <div>
          <p>----___----,</p>
          <p>----___----|</p>
          <p>----___----?</p>
        </div>
      ),
      method: function name(params: string) {
        return params;
      },
    },
    {
      id: "6",
      name: "question_with_story",
      patternDetector: "||?",
      element: (
        <div className="text-start">
          <p>-----------------</p>
          <p>---------- ||</p>
          <p>----?</p>
          <p>----?</p>
          <p>----?</p>
          <p>----?</p>
        </div>
      ),
      method: function name(params: string) {
        return params;
      },
    },
  ];

  return (
    <div className="container mt-8">
      <Card x-chunk="dashboard-06-chunk-0">
        <div className="flex justify-between items-center">
          <CardHeader>
            <CardTitle>Subject List</CardTitle>
          </CardHeader>

          <div className="ml-auto flex items-center gap-2 p-3">
            <Button
              //     onClick={() => setOpen(true)}
              size="sm"
              className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Subject</span>
            </Button>
          </div>
        </div>

        <CardContent>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10 py-5">
            {/* {isLoading && (
              <>
                <ClassSkeleton />
                <ClassSkeleton />
                <ClassSkeleton />
                <ClassSkeleton />
                <ClassSkeleton />
                <ClassSkeleton />
                <ClassSkeleton />
                <ClassSkeleton />
              </>
            )}
            {classList?.map((classItem: IClass) => (
              <ClassCard
                key={classItem._id}
                classItem={classItem}
              />
            ))} */}

            <div className="p-3 border-2 rounded-md text-center backdrop-blur-sm bg-slate-600/10">
              <div className="flex justify-between">
                <p>name :</p>
                <b>Bangla</b>
              </div>
              <div className="flex justify-between">
                <p>code :</p>
                <p>101</p>
              </div>
              <div className="flex justify-between">
                <p>Question Categories :</p>
                <p>8</p>
              </div>
              <div className="flex justify-between">
                <p>Lesson :</p>
                <p>10</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

      <div className="border-2 border-black rounded-md p-3">
        <h1 className="text-center text-3xl border-b-black border-b-2 mb-6 pb-2">Bangla</h1>

        <div className={`${showLesson ? "grid grid-cols-9 gap-8" : "grid grid-cols-9 gap-8"}`}>
          <div className={`${showLesson ? "col-span-3" : "col-span-9"}`}>
            <div className={`${showLesson ? "grid grid-cols-1 gap-6" : "grid grid-cols-2 gap-6"}`}>
              {/* Question Category  */}
              <div className="">
                <div className="flex justify-between">
                  <h4 className="text-xl font-semibold mb-2">Question Category List: </h4>
                  <Button
                    onClick={() => setOpenCategoryForm(true)}
                    size="sm"
                    className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Category</span>
                  </Button>
                </div>

                {openCategoryForm && (
                  <div className="flex flex-col gap-5 mt-5">
                    <input
                      type="text"
                      className="border p-2 rounded mr-2"
                      placeholder="Enter category name"
                      value={categories.title}
                      onChange={titleInputFunc}
                    />

                    <div className="w-full overflow-x-auto">
                      <div className="flex gap-4 w-auto">
                        {questionPattern.map((pattern) => (
                          <div
                            key={pattern.id}
                            onClick={() => selectCategoryFunc(pattern.id)}
                            className="p-3 border-2 rounded-md text-center backdrop-blur-sm bg-slate-600/10 min-w-[250px] w-[300px] cursor-pointer relative">
                            {pattern.element}
                            {pattern.id === categories.pattern && (
                              <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-green-600"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-around">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setCategories({ title: "", pattern: "" });
                          setOpenCategoryForm(false);
                        }}>
                        Cancel
                      </Button>
                      <Button
                        disabled={categories.title.length <= 0 || categories.pattern.length <= 0}
                        onClick={addCategory}>
                        Submit
                      </Button>
                    </div>
                  </div>
                )}

                <div className="container mx-auto p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <ul className="list-disc pl-5">
                        {myCategories.map((category, index) => (
                          <li
                            key={index}
                            className={`cursor-pointer ${category.title === categories.title ? "font-bold" : ""}`}
                            onClick={() => {
                              setCategories({ title: category.title, pattern: category.pattern });
                              setOpenCategoryForm(true);
                            }}>
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
                    onClick={() => setOpenLessonForm(true)}
                    size="sm"
                    className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Lesson</span>
                  </Button>
                </div>

                {openLessonForm && (
                  <div className="flex flex-col gap-5 mt-5">
                    <input
                      type="text"
                      className="border p-2 rounded mr-2"
                      placeholder="Enter lesson name"
                      value={lesson}
                      onChange={(e) => setLesson(e.target.value)}
                    />

                    <div className="flex justify-around">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setLesson("");
                          setOpenLessonForm(false);
                        }}>
                        Cancel
                      </Button>
                      <Button
                        disabled={lesson.length <= 0}
                        onClick={() => {
                          setLessonList([...lessonList, lesson]);
                          setOpenLessonForm(false);
                        }}>
                        Submit
                      </Button>
                    </div>
                  </div>
                )}

                <div className="container mx-auto p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <ul className="list-disc pl-5">
                        {lessonList.map((lesson, index) => (
                          <li
                            key={index}
                            // className={`cursor-pointer ${lesson === categories.title ? "font-bold" : ""}`}
                            onClick={() => {
                              // setCategories({ title: category.title, pattern: category.pattern });
                              setShowLesson(true);
                              setOpenLessonForm(false);
                            }}>
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
          <div className={`${showLesson ? "col-span-6" : "hidden"}`}>
            <Accordion
              type="single"
              collapsible
              className="w-full">
              <AccordionItem value={"1"}>
                <AccordionTrigger className="text-lg font-semibold uppercase border-b-2 border-black mb-4">
                  Lesson 1
                </AccordionTrigger>
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

      {/* {open && (
        <ClassFormModal
          open={open}
          setOpen={setOpen}
        />
      )} */}
    </div>
  );
};

export default Subjects;
