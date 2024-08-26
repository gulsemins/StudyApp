import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Card, Checkbox } from "react-native-paper";
import * as Progress from "react-native-progress";
export default function Tab() {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Objectives</Text>
          <Text style={styles.link}>View All</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.objectives}>
            <View style={styles.top}>
              <FontAwesome name="edit" size={20} color="black" />
              <Text>Edit a Document using Spark.E AI</Text>
            </View>
            <Progress.Bar progress={0.3} width={250} color="#fe8b8a" />
          </View>
          <View style={styles.objectives}>
            <View style={styles.top}>
              <FontAwesome name="check-square-o" size={20} color="black" />
              <Text>Complete a Test</Text>
            </View>
            <Progress.Bar progress={0.3} width={250} color="#fe8b8a" />
          </View>
          <View style={styles.objectives}>
            <View style={styles.top}>
              <SimpleLineIcons name="graduation" size={20} color="black" />
              <Text>Perfect Score on a Test</Text>
            </View>
            <Progress.Bar progress={0.3} width={250} color="#fe8b8a" />
          </View>
        </View>
        <Text style={styles.resetText}>Resets in 10h 50m</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff9f0",
    borderRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  link: {
    color: "#4ba0cd",
  },
  body: {
    flexDirection: "column",
  },
  objectives: {
    marginVertical: 10,
  },
  top: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  resetText: {
    color: "gray",
  },
});
