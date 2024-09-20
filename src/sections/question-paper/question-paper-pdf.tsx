import { useMemo } from "react";
import { Page, View, Text, Font, Document, StyleSheet } from "@react-pdf/renderer";
import { IQuestionPaperRes } from "@/interfaces/question-paper.interface";
// import { Page, View, Text, Font, Image, Document, StyleSheet } from "@react-pdf/renderer";

// import { fDate } from "src/utils/format-time";
// import { fCurrency } from "src/utils/format-number";
// import { IInvoice } from "@/interfaces/invoice";
// import { fDate } from "@/utils/format-time";
// import { fCurrency } from "@/utils/format-number";

// ----------------------------------------------------------------------

Font.register({
  family: "NotoSansBengali",
  fonts: [{ src: "/fonts/NotoSerifBengali-Regular.ttf" }, { src: "/fonts/NotoSerifBengali-Bold.ttf" }],
});

// const useStyles = () =>
//   useMemo(
//     () =>
//       StyleSheet.create({
//         // layout
//         page: {
//           fontSize: 9,
//           lineHeight: 1.6,
//           fontFamily: "Roboto",
//           backgroundColor: "#FFFFFF",
//           padding: "40px 24px 120px 24px",
//         },
//         footer: {
//           left: 0,
//           right: 0,
//           bottom: 0,
//           padding: 24,
//           margin: "auto",
//           borderTopWidth: 1,
//           borderStyle: "solid",
//           position: "absolute",
//           borderColor: "#e9ecef",
//         },
//         container: {
//           flexDirection: "row",
//           justifyContent: "space-between",
//         },
//         // margin
//         mb4: { marginBottom: 4 },
//         mb8: { marginBottom: 8 },
//         mb40: { marginBottom: 40 },
//         // text
//         h3: { fontSize: 16, fontWeight: 700 },
//         h4: { fontSize: 13, fontWeight: 700 },
//         body1: { fontSize: 10 },
//         subtitle1: { fontSize: 10, fontWeight: 700 },
//         body2: { fontSize: 9 },
//         subtitle2: { fontSize: 9, fontWeight: 700 },
//         // table
//         table: { display: "flex", width: "100%" },
//         row: {
//           padding: "10px 0 8px 0",
//           flexDirection: "row",
//           borderBottomWidth: 1,
//           borderStyle: "solid",
//           borderColor: "#e9ecef",
//         },
//         cell_1: { width: "5%" },
//         cell_2: { width: "50%" },
//         cell_3: { width: "15%", paddingLeft: 32 },
//         cell_4: { width: "15%", paddingLeft: 8 },
//         cell_5: { width: "15%" },
//         noBorder: { paddingTop: "10px", paddingBottom: 0, borderBottomWidth: 0 },
//       }),
//     []
//   );

// ----------------------------------------------------------------------

const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        page: {
          fontSize: 12,
          fontFamily: "NotoSansBengali",
          padding: "40px 24px",
        },
        header: {
          textAlign: "center",
          marginBottom: 20,
        },
        title: { fontSize: 16, fontWeight: "bold" },
        subtitle: { fontSize: 12, marginBottom: 8 },
        questionContainer: {
          marginBottom: 12,
        },
        questionText: {
          fontSize: 12,
          marginBottom: 4,
        },
        subQuestion: {
          marginLeft: 20,
          marginBottom: 4,
        },
      }),
    []
  );

// type Props = {
//   examInfo: {
//     schoolName: string;
//     className: string;
//     subject: string;
//     examDate: string;
//     subjectCode: string;
//   };
//   questions: Array<{
//     id: number;
//     text: string;
//     subQuestions?: Array<{
//       id: string;
//       text: string;
//     }>;
//   }>;
// };

export function QuestionPaperPDF({ questionPaperDetails }: { questionPaperDetails: IQuestionPaperRes }) {
  const styles = useStyles();

  const renderHeader = (
    <View style={styles.header}>
      <Text style={styles.title}>{questionPaperDetails.institute.name}</Text>
      <Text style={styles.subtitle}>শ্রেণী: {questionPaperDetails.classId.name}</Text>
      <Text style={styles.subtitle}>
        বিষয়: {questionPaperDetails.subject.name} (নম্বর : {questionPaperDetails.examFullMarks})
      </Text>
      <Text style={styles.subtitle}>
        {questionPaperDetails.examName}: {questionPaperDetails.examYear}
      </Text>
    </View>
  );

  const renderQuestions = questionPaperDetails.questionCategory
    .sort((a, b) => a.position - b.position)
    .map((question) => (
      <View
        key={question._id}
        style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {question.position}. {question.questionCategoryId.questionCategoryName}
        </Text>
        {/* {question.subQuestions?.map((subQuestion) => (
        <Text
          key={subQuestion.id}
          style={styles.subQuestion}>
          {subQuestion.id}) {subQuestion.text}
        </Text>
      ))} */}
      </View>
    ));

  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}>
        {renderHeader}
        {renderQuestions}
      </Page>
    </Document>
  );
}
