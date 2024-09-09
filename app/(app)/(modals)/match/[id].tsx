import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { SetType } from "../../setDetails/[id]/search";
import axios from "axios";
import MemoryCards from "@/components/modals/MemoryCards";

const MatchScreen = () => {
  const { id } = useLocalSearchParams();
  const [set, setSet] = useState<SetType | null>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [correctMatches, setCorrectMatches] = useState<number>(0);
  const [wrongMatches, setWrongMatches] = useState<number>(0);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/card-set/${id}`,
        {
          params: {
            relations: "cards",
          },
        }
      );
      const cardSet = response.data.data;

      // Generate title and body cards
      const generatedCards = cardSet.cards.flatMap((card) => [
        { id: `${card.id}-title`, content: card.title, type: "title" },
        { id: `${card.id}-body`, content: card.body, type: "body" },
      ]);

      // Shuffle the generated cards array
      setCards(generatedCards.sort(() => Math.random() - 0.5));
      setSet(cardSet);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (!set) {
    return <Text>Loading...</Text>;
  }

  const handleCardDrop = (draggedCardId: string, droppedOnCardId: string) => {
    const draggedCard = cards.find((card) => card.id === draggedCardId);
    const droppedOnCard = cards.find((card) => card.id === droppedOnCardId);

    // Check if the dropped card is a valid match
    if (
      (draggedCard?.type === "title" &&
        droppedOnCard?.type === "body" &&
        draggedCardId.split("-")[0] === droppedOnCardId.split("-")[0]) ||
      (draggedCard?.type === "body" &&
        droppedOnCard?.type === "title" &&
        draggedCardId.split("-")[0] === droppedOnCardId.split("-")[0])
    ) {
      // Correct match
      setMatchedCards([...matchedCards, draggedCardId, droppedOnCardId]);
      setCorrectMatches(correctMatches + 1);
    } else {
      // Incorrect match
      setWrongMatches(wrongMatches + 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: set.title,
        }}
      />
      <Text style={styles.matchCount}>
        Correct Matches: {correctMatches} | Wrong Matches: {wrongMatches}
      </Text>
      <View style={styles.cardsContainer}>
        {cards.map((card) => (
          <MemoryCards
            key={card.id}
            card={card}
            matchedCards={matchedCards}
            onCardDrop={handleCardDrop}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default MatchScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 20,
  },
  matchCount: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
