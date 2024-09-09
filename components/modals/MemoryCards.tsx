import React from "react";
import { Text, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface DraggableMemoryCardProps {
  card: any;
  onCardDrop: (draggedCardId: string, droppedOnCardId: string) => void;
  matchedCards: string[];
}

const DraggableMemoryCard: React.FC<DraggableMemoryCardProps> = ({
  card,
  onCardDrop,
  matchedCards,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const isMatched = matchedCards.includes(card.id);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      // Handle drop event, pass the card id to onCardDrop
      translateX.value = withSpring(0); // Reset position after drop
      translateY.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          styles.card,
          animatedStyle,
          isMatched ? styles.matchedCard : {},
        ]}
      >
        <Text style={styles.cardText}>{card.content}</Text>
      </Animated.View>
    </PanGestureHandler>
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
  cardText: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    margin: 4,
    color: "#2a2f40",
  },
});

export default DraggableMemoryCard;
