import ProgressCard from "@/components/[id]/ProgressCard";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";

export interface DetailType {
  idSet: string;
  name: string;
  desc: string;
}
const DetailsPage = () => {
  const { id } = useLocalSearchParams();
  const [details, setDetails] = useState<DetailType | null>(null);
  console.log(id);
  const sets = [
    {
      idSet: "1",
      name: "Mathematics",
      desc: "Explore the world of numbers, equations, and geometric shapes.",
    },
    {
      idSet: "2",
      name: "Physics",
      desc: "Understand the fundamental principles of the universe, including mechanics.",
    },
  ];
  useEffect(() => {
    // Simulate fetching data based on the id
    const foundDetails = sets.find((set) => set.idSet === id);
    if (foundDetails) {
      setDetails(foundDetails);
    }
  }, [id]);
  if (!details) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{details.name}</Text>
      <Text style={styles.description}>{details.desc}</Text>

      <ProgressCard detail={details} />
    </ScrollView>
  );
};

export default DetailsPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
});
