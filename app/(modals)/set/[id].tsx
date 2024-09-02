import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
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
      title: "Fizik",
      flashcards: [
        {
          front: "Newton'un ikinci hareket yasası nedir?",
          back: "Newton'un ikinci hareket yasası, bir cismin üzerindeki net kuvvetin, cismin kütlesi ile ivmesinin çarpımına eşit olduğunu belirtir.",
        },
        {
          front: "Kütle ile ağırlık arasındaki fark nedir?",
          back: "Kütle, bir cismin sahip olduğu madde miktarıdır ve kilogram (kg) ile ölçülür. Ağırlık ise bir cismin kütlesine etki eden yerçekimi kuvvetidir ve Newton (N) ile ölçülür. Ağırlık, yerçekimi ivmesine bağlı olarak değişir.",
        },
      ],
    },
    {
      cards: 3,
      id: "2",
      title: "Kimya ",
      flashcards: [
        {
          front: "Atom numarası nedir?",
          back: "Atom numarası, bir elementin çekirdeğindeki proton sayısını belirtir ve elementin kimyasal özelliklerini belirler.",
        },
        {
          front: "pH nedir?",
          back: "pH, bir çözeltinin asitlik veya bazlık derecesini gösteren bir ölçüdür. pH 7 nötr, pH 7'nin altı asidik, pH 7'nin üstü baziktir.",
        },
        {
          front: "Element nedir?",
          back: "Element, aynı tür atomlardan oluşan saf bir maddedir ve kimyasal yollarla daha basit maddelere ayrıştırılamaz.",
        },
      ],
    },
    {
      cards: 4,
      id: "3",
      title: "İngilizce",
      flashcards: [
        { front: "Innovation", back: "Yenilik" },
        {
          front: "Resilient",
          back: "Dayanıklı, dirençli",
        },
        { front: "Ambitious", back: "Hırslı" },
        { front: "Curiosity", back: "Merak" },
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
      {/* <Text style={styles.header}> {set?.title}</Text> */}
      <Text style={styles.cardNumber}>
        {currentIndex + 1} / {set.flashcards.length}
      </Text>
      <View style={styles.card}>
        <Flashcards card={currentCard} showBack={showBack} onFlip={onFlip} />

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
