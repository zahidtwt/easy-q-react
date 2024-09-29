import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import zod from "zod";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { IExamDetail } from "@/interfaces/question-paper.interface";

const ExamDetailFormSchema = zod.object({
  // IExamDetail
  examName: zod.string().min(2, {
    message: "examName must be at least 2 characters.",
  }),
  examYear: zod.number().gte(2024, {
    message: "examYear must be at least 4 characters.",
  }),
  examDuration: zod.number().gte(1, {
    message: "examDuration must be at least 2 characters.",
  }),
  examFullMarks: zod.number().gte(10, {
    message: "examFullMarks must be greater than 10.",
  }),
});

type ExamDetailFormFields = zod.infer<typeof ExamDetailFormSchema>;

const ExamDetailOfQuestionPaper = ({
  setCurrentTab,
  examDetail,
  setExamDetail,
}: {
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  examDetail: IExamDetail;
  setExamDetail: React.Dispatch<React.SetStateAction<IExamDetail>>;
}) => {
  const formMethods = useForm<ExamDetailFormFields>({
    resolver: zodResolver(ExamDetailFormSchema),
    mode: "all",
    defaultValues: examDetail || {
      name: "",
      code: "",
      questionCategory: [],
      active: "active",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
    //     reset,
  } = formMethods;

  const submitForm: SubmitHandler<ExamDetailFormFields> = async (data) => {
    // console.log(data);
    setCurrentTab((prev) => prev + 1);
    setExamDetail(data);
  };

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="bg-pink-500 text-white text-center font-bold rounded-t-lg p-4 relative">
        <Button
          className="absolute left-2 top-2"
          variant={"ghost"}
          onClick={() => {
            setCurrentTab((pre) => pre - 1);
          }}>
          <ArrowLeft size={24} />
        </Button>
        পরিক্ষার নাম, পূর্ণমান ও সময় নির্ধারণ করুন
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 p-6 max-h-[70vh] overflow-y-auto overflow-x-hidden">
        <Form {...formMethods}>
          <form
            onSubmit={handleSubmit(submitForm)}
            className="space-y-4 sm:space-y-6 p-1 w-full">
            <FormField
              control={control}
              name="examName"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="examName">Exam Name</Label>
                  <FormControl>
                    <Input
                      placeholder="Exam Name here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.examName?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="examYear"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="examYear">Exam Year</Label>
                  <FormControl>
                    <Input
                      placeholder="YYYY"
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage>{errors.examYear?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="examDuration"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="examDuration">Exam Duration</Label>
                  <FormControl>
                    <div className="flex gap-2">
                      <div className="w-1/2">
                        <Label htmlFor="examDuration">Hours</Label>
                        <Input
                          placeholder="Hours"
                          type="number"
                          min={0}
                          max={24}
                          onChange={(e) => {
                            const hours = Number(e.target.value);
                            const totalMinutes = hours * 60; // Update hours portion
                            const extraMinutes = field.value % 60; // Get minutes portion for display
                            if (extraMinutes > 0) {
                              field.onChange(totalMinutes + extraMinutes);
                            } else {
                              field.onChange(totalMinutes);
                            }
                          }}
                          value={Math.floor(field.value / 60)} // Convert minutes to hours for display
                        />
                      </div>
                      <div className="w-1/2">
                        <Label htmlFor="examDuration">Minutes</Label>
                        <Input
                          placeholder="Minutes"
                          type="number"
                          min="0"
                          max="59"
                          onChange={(e) => {
                            const minutes = Number(e.target.value);
                            const totalMinutes = Math.floor(field.value / 60) * 60 + minutes; // Update minutes portion
                            if (totalMinutes < 0) {
                              field.onChange(0);
                            } else {
                              field.onChange(totalMinutes);
                            }
                          }}
                          value={field.value % 60} // Get minutes portion for display
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage>{errors.examDuration?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="examFullMarks"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="examFullMarks">Exam Full Marks</Label>
                  <FormControl>
                    <Input
                      placeholder="100"
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage>{errors.examFullMarks?.message}</FormMessage>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!isDirty || isSubmitting}
                className="">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ExamDetailOfQuestionPaper;
