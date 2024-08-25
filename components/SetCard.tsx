import { SetType } from "@/app/(tabs)";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  subject: SetType;
};

const { width } = Dimensions.get("window");

export default function SetCard(props: Props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("@/assets/images/app.jpg")}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["#ed5657", "#fe8b8a"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradientContent}
      >
        <View style={styles.cardInfo}>
          <Text style={styles.setTitle}>{props.subject.name}</Text>
          <Text style={styles.setDesc}>{props.subject.desc}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    borderRadius: 30,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 120,
  },
  gradientContent: {
    flex: 1,
    padding: 20,
  },
  cardInfo: {
    alignItems: "center",
  },
  setTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10,
  },
  setDesc: {
    color: "white",
    textAlign: "center",
  },
});
