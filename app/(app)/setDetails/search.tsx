import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export interface SetType {
  title: string;
  id: string;
  body: string;
  cardNumber: number;
  cardSetId: string;
  cardSet: {
    id: string;
    title: string;
  }[];
}
export default function Tab() {
  const [cardSets, setCardSets] = useState<SetType>();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/card-set/multiple`
      );
      console.log(response.data.data);

      setCardSets(response.data.data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);
  const renderCard = ({ item }: { item: SetType }) => (
    <Link href={`/(modals)/set/${item.id}`} asChild>
      <Pressable style={styles.setRow} onPress={() => {}}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>{item.title}</Text>
            <Text style={{ color: "#9c9a9a" }}>{item.cardNumber} Cards</Text>
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
        data={cardSets}
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
