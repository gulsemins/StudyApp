import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

import Flashcards from "@/components/modals/Flashcards";
import { Ionicons } from "@expo/vector-icons";
// import { SetType } from "../../setDetails/[id]/search";
import axios from "axios";

export interface SetType {
  id: string;
  title: string;
  courseId: string;
  cards: {
    id: string;
    title: string;
    body: string;
    cardNumber: number;
  }[];
}
const Page = () => {
  const { id } = useLocalSearchParams();
  const [set, setSet] = useState<SetType | null>(null);

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
      console.log(response.data.data);

      setSet(response.data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  const pastelColors = [
    "#d1cfff",
    "#e7f6f3",
    "#ffdfe0",
    "#ffeedc",
    "#dcf7dc", // Ek renk
    "#f5f5bc", // Ek renk
    "#dcdcf5", // Ek renk
    "#c1e3f5",
    "#d1cfff",
    "#ecd9cb", //
    "#fecbca",
    "#dfe5b5",
  ];
  const [cardColors, setCardColors] = useState<string[]>([]);

  useEffect(() => {
    // Kart renkleri için bir dizi oluşturun
    if (!set) {
      return;
    }
    setCardColors(
      Array(set.cards.length)
        .fill("")
        .map(
          () => pastelColors[Math.floor(Math.random() * pastelColors.length)]
        )
    );
  }, [set]);

  if (!set) {
    return <Text>Loading</Text>;
  }
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % set.cards.length;
    setCurrentIndex(nextIndex);
    setShowBack(false); // Show front page when moving forward
  };
  const handlePrevious = () => {
    const previousIndex =
      (currentIndex - 1 + set.cards.length) % set.cards.length;
    setCurrentIndex(previousIndex);
    setShowBack(false);
  };

  const onFlip = () => {
    setShowBack(!showBack);
  };

  const currentCard = set.cards[currentIndex];
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: set.title,
        }}
      />
      {/* <Text style={styles.header}> {set?.title}</Text> */}
      <Text style={styles.cardNumber}>
        {currentIndex + 1} / {set.cards.length}
      </Text>
      <View style={styles.card}>
        <Flashcards
          card={currentCard}
          showBack={showBack}
          onFlip={onFlip}
          cardColor={cardColors[currentIndex]}
        />

        <View style={styles.next}>
          <Pressable onPress={handlePrevious}>
            <Ionicons
              name="chevron-back-circle-outline"
              size={40}
              color="#e85754"
            />
          </Pressable>
          <Pressable onPress={handleNext}>
            <Ionicons
              name="chevron-forward-circle-outline"
              size={40}
              color="#e85754"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  next: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginBottom: 50,
  },
});
