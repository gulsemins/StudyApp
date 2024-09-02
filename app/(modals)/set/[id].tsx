import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import Flashcards from "@/components/modals/Flashcards";
export interface SetType {
  cards: number;
  id: string;
  title: string;
  flashcards: {
    front: string;
    back: string;
  }[];
}
const Page = () => {
  const { id } = useLocalSearchParams();
  const [cards, setCards] = useState<SetType>();
  const sets = [
    {
      cards: 4,
      id: "1",
      title: "Cebir",
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
      title: "dif",
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
      title: "İngilizce",
      flashcards: [
        { front: "What is the square root of 16?", back: "4" },
        {
          front: "What is the formula for the area of a triangle?",
          back: "(1/2) * base * height",
        },
        { front: "What is the square root of 16?", back: "4" },
        { front: "What is the square root of 16?", back: "4" },
      ],
    },
  ];

  const set = sets.find((set) => set.id === id);

  if (!set) {
    return <Text>Set not found</Text>;
  }
  const [currentIndex, setCurrentIndex] = useState(0);

  const [showBack, setShowBack] = useState(false);

  console.log("lala", id);
  const currentCard = set.flashcards[currentIndex];
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Learn {set?.title}</Text>
      <View style={styles.card}>
        <Flashcards card={currentCard} showBack={showBack} />
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    marginTop: 50,
  },
});
