import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface MultipleChoiceQuestionProps {
  question: {
    questionText: string;
    correctAnswer: string;
    options: string[];
  };
  onAnswerSelected: (selectedAnswer: string) => void;
  answer?: string;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  onAnswerSelected,
  answer, // Pass the selected answer for this question from parent
}) => {
  const handlePress = (index: number) => {
    onAnswerSelected(question.options[index]);
  };

  const getOptionStyle = (index: number) => {
    return answer === question.options[index]
      ? [styles.option, styles.selectedOption]
      : styles.option;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.questionText}</Text>
      {question.options.map((option, index) => (
        <Pressable
          key={index}
          style={getOptionStyle(index)}
          onPress={() => handlePress(index)}
        >
          <Text>{option}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  option: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedOption: {
    backgroundColor: "#d6d0d0", // Change background color for selected option
  },
});

export default MultipleChoiceQuestion;
