import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

interface MemoryCardsProps {
  card: any;
  onPress: (cardId: string) => void;
  matchedCards: string[];
  selectedCards: string[];
}

const MemoryCards: React.FC<MemoryCardsProps> = ({
  card,
  onPress,
  matchedCards,
  selectedCards,
}) => {
  const isMatched = matchedCards.includes(card.id);
  const isSelected = selectedCards.includes(card.id);
  const isIncorrect = selectedCards.length === 2 && !isMatched && isSelected;

  const cardStyle = [
    styles.card,
    isMatched ? styles.matchedCard : {},
    isIncorrect ? styles.incorrectCard : {},
    isSelected && !isIncorrect ? styles.selectedCard : {},
  ];

  return (
    <Pressable style={cardStyle} onPress={() => onPress(card.id)}>
      <Text style={styles.cardText}> {card.content}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 150,
    backgroundColor: "#d7ddf5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
    shadowColor: "#252e4d",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  matchedCard: {
    backgroundColor: "#bff0db", // Green for correct match
  },
  incorrectCard: {
    backgroundColor: "#fac3c6", // Red for incorrect match
  },
  selectedCard: {
    backgroundColor: "#fff2dd", // Light blue for selected card
  },
  cardText: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    margin: 4,
    color: "#2a2f40",
  },
});

export default MemoryCards;
