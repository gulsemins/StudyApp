import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export interface SetType {
  cards: number;
  id: string;
  title: string;
  flashcards: {
    front: string;
    back: string;
  }[];
}
export default function Tab() {
  const [sets, setSets] = useState<SetType>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const set = [
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

  const renderCard = ({ item }: { item: SetType }) => (
    <Link href={`/(modals)/set/${item.id}`} asChild>
      <Pressable style={styles.setRow} onPress={() => {}}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>{item.title}</Text>
            <Text style={{ color: "#9c9a9a" }}>{item.cards} Cards</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#e85754" />
        </View>
      </Pressable>
    </Link>
  );
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.h1}>Flashcards</Text>
      </View> */}
      <FlatList
        data={set}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    gap: 5,
  },
  h1: {
    fontSize: 20,
    fontWeight: "500",
  },

  cards: {},
  renderCard: {},
  setRow: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#d4d2d2",
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
});
