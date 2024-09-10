import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import MultipleChoiceQuestion from "@/components/modals/MultipleChoice";
import { uri } from "@/constants/api";
import { TestType } from "../../setDetails/[id]/tests";
import Results from "@/components/modals/Results";

interface Answer {
  question: number;
  selectedAnswer: string;
}

const TestScreen = () => {
  const { id } = useLocalSearchParams();
  const [test, setTest] = useState<TestType>();
  const [index, setIndex] = useState(0); // Current question index
  const [points, setPoints] = useState(0); // Points tracker
  const [answers, setAnswers] = useState<Answer[]>([]); // Define the type for answers
  const [showResults, setShowResults] = useState(false); // Track when to show results

  const totalQuestions = test?.multipleChoiceQuestions.length || 0;

  const fetchTest = async () => {
    try {
      const response = await axios.get(`${uri}/api/v1/tests/${id}`, {
        params: {
          relations:
            "multipleChoiceQuestions,classicQuestions,fillInTheBlanksQuestions",
        },
      });
      setTest(response.data);
    } catch (error) {
      console.error("Error fetching test:", error);
    }
  };

  useEffect(() => {
    fetchTest();
  }, [id]);

  const handleAnswerSelected = (selectedAnswer: string) => {
    // Store the selected answer in the answers array
    setAnswers((prev) => [...prev, { question: index + 1, selectedAnswer }]);
  };

  const goToNextQuestion = () => {
    if (index < totalQuestions - 1) {
      setIndex((prev) => prev + 1);
    } else {
      setShowResults(true); // Show results when the last question is reached
    }
  };

  const goToPreviousQuestion = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const progressPercentage = Math.floor((index / totalQuestions) * 100); // Calculate progress percentage

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {showResults ? (
        <Results test={test} answers={answers} />
      ) : (
        <>
          <Text style={styles.title}>{test?.title}</Text>

          {/* Progress bar */}
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, { width: `${progressPercentage}%` }]}
            />
          </View>

          {/* Multiple Choice Questions */}
          {test?.multipleChoiceQuestions?.[index] && (
            <MultipleChoiceQuestion
              key={index} // Force re-render on question change
              question={test.multipleChoiceQuestions[index]}
              onAnswerSelected={handleAnswerSelected}
            />
          )}

          {/* Next/Previous Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable onPress={goToPreviousQuestion} style={styles.button}>
              <Text style={styles.buttonText}>Previous</Text>
            </Pressable>

            <Pressable onPress={goToNextQuestion} style={styles.button}>
              <Text style={styles.buttonText}>
                {index < totalQuestions - 1 ? "Next" : "Finish"}
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 20,
    overflow: "hidden",
  },
  progressBar: {
    backgroundColor: "#00FF00",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
