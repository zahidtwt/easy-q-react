import { useMemo } from "react";
import { Page, View, Text, Font, Document, StyleSheet } from "@react-pdf/renderer";
import { IQuestionPaperRes } from "@/interfaces/question-paper.interface";
import { convertNumber } from "@/utils/number-converter";

// ----------------------------------------------------------------------

Font.register({
  family: "NotoSansBengali",
  fonts: [{ src: "/fonts/NotoSerifBengali-Regular.ttf" }, { src: "/fonts/NotoSerifBengali-Bold.ttf" }],
});

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
        optionText: {
          marginLeft: 40,
          marginBottom: 4,
        },

        table: {
          // display: "table",
          marginLeft: 20,
          display: "flex",
          width: "80%",
          borderStyle: "solid",
          borderWidth: 1,
          borderRightWidth: 0,
          borderBottomWidth: 0,
        },
        tableRow: {
          flexDirection: "row",
        },
        tableCol: {
          width: "50%",
          borderStyle: "solid",
          borderWidth: 1,
          borderLeftWidth: 0,
          borderTopWidth: 0,
        },
        tableHeader: {
          margin: 4,
          fontSize: 10,
          fontWeight: "bold",
          textAlign: "center",
        },
        tableCell: {
          margin: 4,
          fontSize: 10,
          textAlign: "center",
        },
      }),
    []
  );

const chunkArray = (array: string[], chunkSize: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const createTableData = (array: string[]) => {
  const separatorIndex = array.indexOf("|");
  const leftElements = array.slice(2, separatorIndex);
  const rightElements = array.slice(separatorIndex + 1);

  return leftElements.map((left, index) => ({
    left,
    right: rightElements[index],
  }));
};

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
    .map((questionCategory) => (
      <View
        key={questionCategory._id}
        style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {convertNumber(questionCategory.position, questionPaperDetails?.primarySymbol)}.{" "}
          {questionCategory.questionCategoryId.questionCategoryName}
        </Text>

        {questionCategory.questionCategoryId.selectedPatternKey &&
          questionCategory.questionCategoryId.selectedPatternKey === "word_by_word" && (
            <Text style={styles.subQuestion}>{questionCategory.question.join(", ")}</Text>
          )}

        {questionCategory.questionCategoryId.selectedPatternKey &&
          questionCategory.questionCategoryId.selectedPatternKey === "one_line_question" &&
          questionCategory.question.map((oneLineQuestion, index) => (
            <Text
              key={index}
              style={styles.subQuestion}>
              {convertNumber(index + 1, questionPaperDetails.secondarySymbol ?? "null")}. {oneLineQuestion}
            </Text>
          ))}

        {questionCategory.questionCategoryId.selectedPatternKey &&
          questionCategory.questionCategoryId.selectedPatternKey === "question_with_options" &&
          // <Text style={styles.questionText}>
          //   {questionCategory.questionCategoryId.selectedPatternKey} প্রশ্নগুলো শুনে উত্তর দিন
          // </Text>

          chunkArray(questionCategory.question, 5).map((chunk, index) => (
            <View key={index}>
              <Text style={styles.subQuestion}>
                {convertNumber(index + 1, questionPaperDetails.secondarySymbol ?? "null")}.{chunk[0]}
              </Text>
              {chunk.slice(1).map((question, index) => (
                <Text
                  key={index}
                  style={styles.optionText}>
                  {convertNumber(index + 1, questionPaperDetails.optionSymbol ?? "null")}. {question}
                </Text>
              ))}
            </View>
          ))}

        {questionCategory.questionCategoryId.selectedPatternKey &&
          questionCategory.questionCategoryId.selectedPatternKey === "table_match" && (
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                {questionCategory.question.slice(0, 2).map((header, index) => (
                  <View
                    key={index}
                    style={styles.tableCol}>
                    <Text style={styles.tableHeader}>{header}</Text>
                  </View>
                ))}
              </View>

              {/* Table Rows */}
              {createTableData(questionCategory.question).map((row, index) => (
                <View
                  key={index}
                  style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{row.left}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{row.right}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

        {questionCategory.questionCategoryId.selectedPatternKey &&
          questionCategory.questionCategoryId.selectedPatternKey === "feel_in_the_blanks" && (
            <Text style={styles.subQuestion}>{questionCategory.question[0]}</Text>
          )}
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
