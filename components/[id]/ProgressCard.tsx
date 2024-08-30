import { Foundation } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import * as Progress from "react-native-progress";

interface DetailType {
  idSet: string;
  name: string;
  desc: string;
}

const ProgressCard = ({ detail }: { detail: DetailType }) => {
  const [isProgressCardVisible, setProgressCardVisible] = useState(false);
  const completed = 28;
  const total = 35;
  const progress = completed / total;
  const score = 85;
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setProgressCardVisible(!isProgressCardVisible);
        }}
        style={styles.cardContainer}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.h1}>Progress of your Study Set</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.subject}>
              <Foundation name="book" size={24} color="black" />
              <Text style={styles.cardTitle}>{detail.name}</Text>
            </View>
            <Progress.Bar progress={0.3} width={null} color="#eb5a61" />
          </View>

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
        </View>
      </Pressable>
    </View>
  );
};

export default ProgressCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
    backgroundColor: "#eb5a61",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  h1: {
    fontSize: 20,
    fontWeight: "500",
  },
  title: {
    fontSize: 20,
  },
  body: {
    flexDirection: "column",
    gap: 10,
  },
  subject: {
    flexDirection: "row",
    gap: 7,
  },
  progressText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  // mastered: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 20,
  //   padding: 10,
  // },
  // scoreText: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  // },
  // circleProgressBar: {
  //   width: 80,
  //   height: 80,
  //   borderRadius: 40,
  //   backgroundColor: "#FF6347",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // circleProgressText: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   color: "white",
  // },
});
