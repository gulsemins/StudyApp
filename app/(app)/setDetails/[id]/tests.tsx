import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { uri } from "@/constants/api";
export interface TestType {
  id: string;
  title: string;
  passMark: number;
  difficultyPercentage: number;
  multipleChoiceQuestions: {
    id: string;
    questionNumber: number;
    questionText: string;
    explanation: string;
    correctAnswer: string;
    difficulty: string;
    options: string[];
  }[];
  classicQuestions: {
    id: string;
    questionNumber: number;
    questionText: string;
    explanation: string;
    correctAnswer: string;
    difficulty: string;
  }[];
  fillInTheBlankQuestions: {
    id: string;
    questionNumber: number;
    questionText: string;
    explanation: string;
    blanks: string[];
    options: string[];
    difficulty: string;
  };
}
export default function Tests() {
  const [test, setTest] = useState<TestType>();
  const { id } = useLocalSearchParams();
  console.log(id);
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${uri}/api/v1/tests/multiple`, {
        params: {
          relations:
            "multipleChoiceQuestions,course,classicQuestions,fillInTheBlanksQuestions",
          "filter.course.id": id,
        },
      });
      console.log(response.data.data);
      setTest(response.data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const renderCard = ({ item }: { item: TestType }) => (
    <Link href={`/(modals)/tests/${item.id}`} asChild>
      <Pressable style={styles.setRow} onPress={() => {}}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>{item.title}</Text>
            <Text style={{ color: "#9c9a9a" }}>
              Geçme notu: {item.passMark}
            </Text>
          </View>
          <View>
            <Text style={styles.difficulty}>
              Zorluk {item.difficultyPercentage}
            </Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#e85754" />
        </View>
      </Pressable>
    </Link>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={test}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    gap: 5,
  },
  h1: {
    fontSize: 20,
    fontWeight: "500",
  },

  cards: {},
  renderCard: {},
  setRow: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#d4d2d2",
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  difficulty: {},
});
