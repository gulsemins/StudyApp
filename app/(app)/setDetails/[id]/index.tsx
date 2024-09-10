import ProgressCard from "@/components/[id]/ProgressCard";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import * as Progress from "react-native-progress";

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
import axios from "axios";
import { uri } from "@/constants/api";
export interface DetailType {
  id: string;
  title: string;
  description: string;
  subject: string;
}
const DetailsPage = () => {
  const { id } = useLocalSearchParams();
  const [details, setDetails] = useState<DetailType | null>(null);
  console.log(id);

  const [isProgressCardVisible, setProgressCardVisible] = useState(false);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${uri}/api/v1/course/${id}`);
      console.log(response.data.data);
      console.log("url:" + uri);
      setDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    if (id) {
      // Make sure id is available before fetching
      fetchServices();
    }
  }, [id]); // Dependency on id for fetching when it changes

  if (!details) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const completed = 28;
  const total = 35;
  const progress = completed / total;
  const score = 85;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.setInfo}>
        <Image
          style={styles.image}
          source={require("@/assets/images/math-book.png")}
          resizeMode="cover"
        />
        <View style={styles.info}>
          <Text style={styles.infoTitle}>{details.title}</Text>
          <Text style={styles.infoDescription}>{details.description}</Text>
        </View>

        <View style={styles.mastered}>
          <Progress.Circle
            size={75}
            progress={score / 100}
            showsText={true}
            formatText={() => `${score}`}
            color="#eb5a61"
            thickness={5}
            unfilledColor="#f2f2f2"
            textStyle={styles.scoreText}
          />
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
    gap: 10,
  },
  info: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  infoDescription: {
    fontSize: 16,
    borderBottomWidth: 1, // Adds a line under the text
    borderBottomColor: "#ccc", // Color of the line
    paddingVertical: 5,
    color: "#999",
  },
  image: {
    width: 60,
    height: 60,
  },
  pressable: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
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

  mastered: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  circleProgressBar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  circleProgressText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
