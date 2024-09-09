import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { SetType } from "../../setDetails/[id]/search";
import MemoryCards from "@/components/modals/MemoryCards";
import axios from "axios";

const MatchScreen = () => {
  const { id } = useLocalSearchParams();
  const [set, setSet] = useState<SetType | null>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [correctMatches, setCorrectMatches] = useState<number>(0); // Track correct matches
  const [wrongMatches, setWrongMatches] = useState<number>(0); // Track wrong matches

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

  const handleCardPress = (cardId: string) => {
    if (matchedCards.includes(cardId) || selectedCards.includes(cardId)) {
      return;
    }

    setSelectedCards([...selectedCards, cardId]);

    if (selectedCards.length === 1) {
      const firstCardId = selectedCards[0];
      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === cardId);

      if (
        (firstCard?.type === "title" &&
          secondCard?.type === "body" &&
          firstCardId.split("-")[0] === cardId.split("-")[0]) ||
        (firstCard?.type === "body" &&
          secondCard?.type === "title" &&
          firstCardId.split("-")[0] === cardId.split("-")[0])
      ) {
        // Correct match
        setMatchedCards([...matchedCards, firstCardId, cardId]);
        setCorrectMatches(correctMatches + 1); // Increment correct matches
        setTimeout(() => {
          setSelectedCards([]);
        }, 500); // Short delay before resetting selected cards
      } else {
        // Incorrect match
        setWrongMatches(wrongMatches + 1); // Increment wrong matches
        setTimeout(() => {
          setSelectedCards([]);
        }, 1000); // Delay to allow the user to see the mismatch
      }
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
            onPress={handleCardPress}
            matchedCards={matchedCards}
            selectedCards={selectedCards}
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
