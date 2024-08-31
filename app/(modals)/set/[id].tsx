import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SetType } from "@/app/setDetails/search";

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

  console.log("lala", id);
  return (
    <View>
      <Text style={styles.header}>Learn {set?.title}</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {},
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
