import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

interface FillInTheBlankQuestionProps {
  question: {
    questionText: string;
    blanks: string[];
    options: string[];
  };
  onAnswerSelected: (answer: string) => void;
}

const FillInTheBlankQuestion: React.FC<FillInTheBlankQuestionProps> = ({
  question,
}) => {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question.questionText}</Text>
      {/* Render blanks and options here */}
      {question.blanks.map((blank, index) => (
        <TextInput
          key={index}
          style={styles.blankInput}
          placeholder={`Blank ${index + 1}`}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  blankInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default FillInTheBlankQuestion;
