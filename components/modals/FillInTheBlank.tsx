import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface FillInTheBlankQuestionProps {
  question: {
    questionText: string;
    blanks: string[];
    options: string[]; // Assuming options are provided as a list of strings
  };
  onAnswerSelected: (answer: string[]) => void; // Answers should be an array for multiple blanks
}

const FillInTheBlankQuestion: React.FC<FillInTheBlankQuestionProps> = ({
  question,
  onAnswerSelected,
}) => {
  // Use state to track selected options for each blank
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array(question.blanks.length).fill("") // Initialize with empty strings
  );

  // Handle answer change for a specific blank
  const handleAnswerChange = (answer: string, index: number) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = answer;
    setSelectedAnswers(updatedAnswers);
    onAnswerSelected(updatedAnswers); // Pass the updated answers to the parent
  };

  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question.questionText}</Text>
      {/* Render blanks as dropdowns */}
      {question.blanks.map((blank, index) => (
        <View key={index} style={styles.dropdownContainer}>
          <Text style={styles.blankLabel}>Blank {index + 1}:</Text>
          <Picker
            selectedValue={selectedAnswers[index]} // The currently selected answer
            onValueChange={(itemValue: any) =>
              handleAnswerChange(itemValue, index)
            } // Handle selection change
            style={styles.picker}
          >
            <Picker.Item label="Select an answer" value="" />
            {question.options.map((option, optionIndex) => (
              <Picker.Item key={optionIndex} label={option} value={option} />
            ))}
          </Picker>
        </View>
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
  dropdownContainer: {
    marginBottom: 15,
  },
  blankLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default FillInTheBlankQuestion;
