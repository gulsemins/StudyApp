import { View, Text, StyleSheet, Pressable, Image } from "react-native";

export default function Streak() {
  return (
    <View style={styles.container}>
      <View style={styles.number}>
        <Text style={styles.days}>2</Text>
        <Image
          source={require("@/assets/images/flame.png")}
          style={{ width: 35, height: 35 }}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>Your Streak</Text>
        <Text style={styles.body}>
          Keep your streak going by studying every day!
        </Text>
        <Pressable onPress={() => {}}>
          <Text style={styles.footer}>View Leaderboard</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff2df",
    width: "auto",
    borderRadius: 20,
  },
  number: {
    flexDirection: "row",
  },
  days: {
    fontSize: 28,
    fontWeight: "500",
  },
  info: {
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  body: {
    fontSize: 16,
  },
  footer: {
    marginVertical: 5,
    color: "#7fccf2",
  },
});
