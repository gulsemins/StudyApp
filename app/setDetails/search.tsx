import FlashcardCard from "@/components/[id]/FlashcardCard";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export interface SetType {
  cards: number;
  id: string;
  title: string;
  flashcards: {
    front: string;
    back: string;
  }[];
}
export default function Tab() {
  const [sets, setSets] = useState<SetType>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const set = [
    {
      cards: 4,
      id: "1",
      title: " Learn Cebir",
      flashcards: [
        { front: "What is the square root of 16?", back: "4" },
        {
          front: "What is the formula for the area of a triangle?",
          back: "(1/2) * base * height",
        },
      ],
    },
    {
      cards: 4,
      id: "2",
      title: "Learn dif",
      flashcards: [
        { front: "What is the square root of 16?", back: "4" },
        {
          front: "What is the formula for the area of a triangle?",
          back: "(1/2) * base * height",
        },
      ],
    },
    {
      cards: 4,
      id: "3",
      title: " Learn Cebir",
      flashcards: [
        { front: "What is the square root of 16?", back: "4" },
        {
          front: "What is the formula for the area of a triangle?",
          back: "(1/2) * base * height",
        },
      ],
    },
  ];

  const renderCard = ({ item }: { item: SetType }) => (
    <Link href={`/(modals)/set/${item.id}`} asChild>
      <Pressable style={styles.setRow} onPress={() => {}}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>{item.title}</Text>
            <Text style={{ color: "darkgray" }}>{item.cards} Cards</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
        </View>
      </Pressable>
    </Link>
  );
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.h1}>Flashcards</Text>
      </View> */}
      <View style={styles.cards}>
        <FlatList
          data={set}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
        />
      </View>
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
    borderBottomColor: "lightGrey",
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
});
