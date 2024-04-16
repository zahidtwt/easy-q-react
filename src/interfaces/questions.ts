export interface IQuestionPaper {
  id: string;
  Exam_name: string;
  Total_Marks: number;
  Time: number;
  Institution_id: string;
  Education_Board_id: string;
  Class_id: string;
  Subject_id: string;
  Questions: IQuestion[];
}
export interface IQuestion {
  id: string;
  Education_Board_id: string;
  Category_id: string;
  Class_id: string;
  Subject_id: string;
  question: string;
  answer: string;
}
