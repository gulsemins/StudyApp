import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

import { uri } from "@/constants/api";
import Results from "@/components/modals/Results";
import FillInTheBlank from "@/components/modals/FillInTheBlank";
import MultipleChoiceQuestion from "@/components/modals/MultipleChoice";
import ClassicQuestion from "@/components/modals/ClassicQuestions";

interface Answer {
  questionId: string;
  answer: string | string[];
}

const TestScreen = () => {
  const { id } = useLocalSearchParams();
  const [test, setTest] = useState(null);
  const [index, setIndex] = useState(0); // Current question index
  const [answers, setAnswers] = useState<Answer[]>([]); // Store all answers
  const [showResults, setShowResults] = useState(false); // Show results or not
  const [allQuestions, setAllQuestions] = useState([]); // Store all questions

  const fetchTest = async () => {
    try {
      const response = await axios.get(`${uri}/api/v1/tests/${id}`, {
        params: {
          relations:
            "multipleChoiceQuestions,classicQuestions,fillInTheBlanksQuestions",
        },
      });
      const fetchedTest = response.data;

      // Combine all questions and add a 'type' field to each
      const combinedQuestions = [
        ...fetchedTest.multipleChoiceQuestions.map((q) => ({
          ...q,
          type: "multipleChoice",
        })),
        ...fetchedTest.fillInTheBlanksQuestions.map((q) => ({
          ...q,
          type: "fillInTheBlanks",
        })),
        ...fetchedTest.classicQuestions.map((q) => ({
          ...q,
          type: "classic",
        })),
      ].sort((a, b) => a.questionNumber - b.questionNumber);

      setAllQuestions(combinedQuestions);
      setTest(fetchedTest);
    } catch (error) {
      console.error("Error fetching test:", error);
    }
  };

  useEffect(() => {
    fetchTest();
  }, [id]);

  const handleAnswerSubmit = (answer) => {
    const question = allQuestions[index];
    setAnswers((prev) => [
      ...prev.filter((a) => a.questionId !== question.id),
      { questionId: question.id, answer },
    ]);
  };

  const submitTest = async () => {
    try {
      const response = await axios.post(`${uri}/api/v1/tests/submit`, {
        testId: id,
        multipleChoiceAnswers: answers.filter(
          (a) => typeof a.answer === "string"
        ),
        fillInTheBlanksAnswers: answers.filter((a) => Array.isArray(a.answer)),
        classicAnswers: answers.filter((a) => typeof a.answer === "string"),
      });
      console.log("Submit response:", response.data);
      setShowResults(true);
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  const goToNextQuestion = () => {
    if (index < allQuestions.length - 1) {
      setIndex(index + 1);
    } else {
      submitTest();
    }
  };

  const goToPreviousQuestion = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const progressPercentage = Math.floor((index / allQuestions.length) * 100);

  const renderQuestion = () => {
    const question = allQuestions[index];
    if (!question) {
      return null;
    }
    switch (question.type) {
      case "multipleChoice":
        return (
          <MultipleChoiceQuestion
            question={question}
            onAnswerSelected={handleAnswerSubmit}
            answer={answers.find((a) => a.questionId === question.id)?.answer}
          />
        );
      case "fillInTheBlanks":
        return (
          <FillInTheBlank
            question={question}
            onAnswerSelected={handleAnswerSubmit}
            answer={answers.find((a) => a.questionId === question.id)?.answer}
          />
        );
      case "classic":
        return (
          <ClassicQuestion
            question={question}
            onAnswerSelected={handleAnswerSubmit}
            answer={answers.find((a) => a.questionId === question.id)?.answer}
          />
        );
      default:
        return null;
    }
  };

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

          {/* Render the current question */}
          {renderQuestion()}

          {/* Next/Previous Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable onPress={goToPreviousQuestion} style={styles.button}>
              <Text style={styles.buttonText}>Previous</Text>
            </Pressable>

            <Pressable onPress={goToNextQuestion} style={styles.button}>
              <Text style={styles.buttonText}>
                {index < allQuestions.length - 1 ? "Next" : "Finish"}
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
    backgroundColor: "#eb5a61",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#eb5a61",
    padding: 10,
    width: 100,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
