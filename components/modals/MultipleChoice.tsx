import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface MultipleChoiceQuestionProps {
  question: {
    questionText: string;
    correctAnswer: string;
    options: string[];
  };
  onAnswerSelected: (selectedAnswer: string) => void; // Track the selected answer, not correctness
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  onAnswerSelected,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handlePress = (index: number) => {
    setSelectedOption(index);
    onAnswerSelected(question.options[index]); // Send selected answer to parent component
  };

  const getOptionStyle = (index: number) => {
    return selectedOption === index
      ? [styles.option, styles.selectedOption]
      : styles.option;
  };

  return (
    <View style={styles.container}>
      {/* Question */}
      <Text style={styles.questionText}>{question.questionText}</Text>

      {/* Options */}
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
    backgroundColor: "#d3d3d3", // Change background color for selected option
  },
});

export default MultipleChoiceQuestion;
