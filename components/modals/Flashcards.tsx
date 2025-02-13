import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { SetType } from "@/app/(app)/setDetails/[id]/search";
import { useWindowDimensions } from "react-native";

interface FlashcardProps {
  card: { title: string; body: string };
  showBack: boolean;
  onFlip: () => void;
  cardColor: string;
}
export default function Flashcards(props: FlashcardProps) {
  const { width } = useWindowDimensions();

  const cardWidth = width * 0.9;

  return (
    <TouchableOpacity onPress={props.onFlip} style={styles.button}>
      <Card
        style={[
          styles.card,
          { width: cardWidth, backgroundColor: props.cardColor },
        ]}
      >
        {props.showBack ? (
          <Text style={styles.back}>{props.card.body}</Text>
        ) : (
          <Text style={styles.front}>{props.card.title}</Text>
        )}
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 20,
    height: 200,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    backgroundColor: "#ffe8c9",
  },
  button: {},
  front: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
