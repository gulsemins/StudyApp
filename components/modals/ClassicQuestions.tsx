import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ClassicQuestionProps {
  question: {
    questionText: string;
  };
}

const ClassicQuestion: React.FC<ClassicQuestionProps> = ({ question }) => {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question.questionText}</Text>
      {/* You can add a TextInput here for user input */}
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
});

export default ClassicQuestion;
