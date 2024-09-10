import { TestType } from "@/app/(app)/setDetails/[id]/tests";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
interface ResultsProps {
  test: TestType;
  answers: string;
}
const Results: React.FC<ResultsProps> = ({ test, answers }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>
      {test?.multipleChoiceQuestions?.map((question, index) => {
        const userAnswer = answers.find((ans) => ans.question === index + 1);
        const isCorrect = userAnswer?.selectedAnswer === question.correctAnswer;
        return (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.questionText}</Text>
            <Text
              style={isCorrect ? styles.correctAnswer : styles.incorrectAnswer}
            >
              Your Answer: {userAnswer?.selectedAnswer}
            </Text>
            {!isCorrect && (
              <Text style={styles.correctAnswer}>
                Correct Answer: {question.correctAnswer}
              </Text>
            )}
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
});

export default Results;
