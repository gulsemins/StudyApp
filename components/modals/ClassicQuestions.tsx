import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

interface ClassicQuestionProps {
  question: {
    id: string;
    questionNumber: number;
    questionText: string;
    explanation: string;
    correctAnswer: string;
    difficulty: string;
  };
  onAnswerSelected: (answer: string) => void;
}

const ClassicQuestion: React.FC<ClassicQuestionProps> = ({
  question,
  onAnswerSelected, // Add this line
}) => {
  const handleTextChange = (text: string) => {
    onAnswerSelected(text);
  };

  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question.questionText}</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Type your answer here..."
        onChangeText={handleTextChange} // Add this line to handle text input
      />
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
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ClassicQuestion;
