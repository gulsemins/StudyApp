import { TestType } from "@/app/(app)/setDetails/[id]/tests";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ResultsProps {
  test: TestType;
  answers: { questionId: string; answer: string }[];
}

const Results: React.FC<ResultsProps> = ({ test, answers }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>

      {/* Multiple Choice Results */}
      {test?.multipleChoiceQuestions?.map((question, index) => {
        const userAnswer = answers.find(
          (ans) => ans.questionId === question.id
        );
        const isCorrect = userAnswer?.answer === question.correctAnswer;
        return (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.questionText}</Text>
            <Text
              style={isCorrect ? styles.correctAnswer : styles.incorrectAnswer}
            >
              Your Answer: {userAnswer?.answer}
            </Text>
            {!isCorrect && (
              <Text style={styles.correctAnswer}>
                Correct Answer: {question.correctAnswer}
              </Text>
            )}
          </View>
        );
      })}

      {/* Fill in the Blanks Results */}
      {test?.fillInTheBlankQuestions?.map((question, index) => {
        const userAnswer = answers.find(
          (ans) => ans.questionId === question.id
        );
        const isCorrect =
          JSON.stringify(userAnswer?.answer) ===
          JSON.stringify(question.correctAnswer);
        return (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.questionText}</Text>
            <Text
              style={isCorrect ? styles.correctAnswer : styles.incorrectAnswer}
            >
              Your Answer: {userAnswer?.answer.join(", ")}
            </Text>
            {!isCorrect && (
              <Text style={styles.correctAnswer}>
                Correct Answer: {question.correctAnswer.join(", ")}
              </Text>
            )}
          </View>
        );
      })}

      {/* Classic Question Results */}
      {test?.classicQuestions?.map((question, index) => {
        const userAnswer = answers.find(
          (ans) => ans.questionId === question.id
        );
        // Assuming that classic questions are open-ended, you may not have a single "correct answer."
        return (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.questionText}</Text>
            <Text style={styles.answerText}>
              Your Answer: {userAnswer?.answer}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  questionContainer: {
    marginBottom: 15,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  correctAnswer: {
    color: "green",
    fontWeight: "bold",
  },
  incorrectAnswer: {
    color: "red",
    fontWeight: "bold",
  },
  answerText: {
    color: "blue",
  },
});

export default Results;
