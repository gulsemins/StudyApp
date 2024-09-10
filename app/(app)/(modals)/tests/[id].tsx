import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { SetType } from "../../setDetails/[id]/search";
import { Ionicons } from "@expo/vector-icons";
// import { SetType } from "../../setDetails/[id]/search";
import axios from "axios";
import { uri } from "@/constants/api";

const TestScreen = () => {
  const { id } = useLocalSearchParams();
  const [set, setSet] = useState<SetType | null>(null);
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${uri}/api/v1/card-set/${id}`, {
        params: {
          relations: "cards",
        },
      });
      const cardSet = response.data.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{}} />

      <View style={styles.cardsContainer}></View>
    </ScrollView>
  );
};
export default TestScreen;

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
