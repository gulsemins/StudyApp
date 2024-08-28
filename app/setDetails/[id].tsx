import ProgressCard from "@/components/[id]/ProgressCard";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  Image,
  Pressable,
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

  const [isProgressCardVisible, setProgressCardVisible] = useState(false);
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
      <Text style={styles.title}>Your Study Set Home</Text>
      <View style={styles.setInfo}>
        <Image
          style={styles.image}
          source={require("@/assets/images/calculator.png")}
          resizeMode="cover"
        />
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Untitled Study Set</Text>
          <TextInput
            placeholder="No description"
            style={styles.infoDescription}
          ></TextInput>
        </View>
      </View>
      <Pressable
        onPress={() => {
          setProgressCardVisible(!isProgressCardVisible);
        }}
        style={styles.pressable}
      >
        <ProgressCard detail={details} />
      </Pressable>
      {isProgressCardVisible && (
        <View style={styles.progressContainer}>
          {/* Flashcard Set Progress */}
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Flashcard Sets</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "0%" }]} />
              {/* Example progress */}
            </View>
            <Text style={styles.progressText}>0 / 3</Text>
          </View>

          {/* Match Games Progress */}
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Match Games</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "40%" }]} />
              {/* Example progress */}
            </View>
            <Text style={styles.progressText}>2 / 5</Text>
          </View>
        </View>
      )}
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
  setInfo: {
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  info: {},
  infoTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  infoDescription: {
    fontSize: 16,
    borderBottomWidth: 1, // Adds a line under the text
    borderBottomColor: "#ccc", // Color of the line
    paddingVertical: 5,
  },
  image: {
    width: 90,
    height: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pressable: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,

    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    height: "auto",
  },
  toggleText: {
    fontSize: 16,
    color: "#007BFF",
  },
  progressContainer: {
    marginTop: 10,
  },
  progressItem: {
    marginVertical: 10,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF0000",
  },
  progressText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
});
