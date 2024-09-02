import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import Flashcards from "@/components/modals/Flashcards";
import { Ionicons } from "@expo/vector-icons";
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
      cards: 2,
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
      cards: 3,
      id: "2",
      title: "dif",
      flashcards: [
        { front: "What is the square root of 16?", back: "4" },
        {
          front: "deneme 3",
          back: "sonuç 4",
        },
        {
          front: "deneme 5",
          back: "sonuç 5",
        },
      ],
    },
    {
      cards: 4,
      id: "3",
      title: "İngilizce",
      flashcards: [
        { front: "What is the square root of 1?", back: "4" },
        {
          front: "What is the formula for the area of a triangle?",
          back: "(1/2) * base * height",
        },
        { front: "What is the square root of 3?", back: "4" },
        { front: "What is the square root of 4?", back: "4" },
      ],
    },
  ];
  const set = sets.find((set) => set.id === id);
  if (!set) {
    return <Text>Set not found</Text>;
  }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % set.flashcards.length;
    setCurrentIndex(nextIndex);
    setShowBack(false); // Show front page when moving forward
  };
  const handlePrevious = () => {
    const previousIndex =
      (currentIndex - 1 + set.flashcards.length) % set.flashcards.length;
    setCurrentIndex(previousIndex);
    setShowBack(false);
  };

  const onFlip = () => {
    setShowBack(!showBack);
  };

  const currentCard = set.flashcards[currentIndex];
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Learn {set?.title}</Text>
      <View style={styles.card}>
        <Flashcards card={currentCard} showBack={showBack} onFlip={onFlip} />

        <View style={styles.next}>
          <Pressable onPress={handlePrevious}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </Pressable>
          <Pressable onPress={handleNext}>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </Pressable>
        </View>
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
  next: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
