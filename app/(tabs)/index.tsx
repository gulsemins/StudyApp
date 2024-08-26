import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import SetCard from "@/components/SetCard";
import StreakCard from "@/components/StreakCard";
export interface SetType {
  name: string;
  desc: string;
}
export default function Home() {
  const [subjectSets, setSubjectSets] = useState<SetType[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchWidth = useRef(new Animated.Value(0)).current;
  const windowWidth = Dimensions.get("window").width;

  const sets = [
    {
      name: "Mathematics",
      desc: "Explore the world of numbers, equations, and geometric shapes.",
    },
    {
      name: "Physics",
      desc: "Understand the fundamental principles of the universe, including mechanics.",
    },
  ];
  // TODO: telefonu çevirince search bar widthi ekranın %40 oluyor(çevirince boş kalan kısım daha büyük veya küçük olabilir)
  const searchBarWidth = windowWidth * 0.4;
  const toggleSearch = () => {
    if (isSearchActive) {
      Animated.timing(searchWidth, {
        toValue: 0, // Collapse search bar to width 0
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => {
        setIsSearchActive(false); // Set to inactive after animation completes
      });
    } else {
      setIsSearchActive(true);
      Animated.timing(searchWidth, {
        toValue: searchBarWidth, // Expand search bar to full width
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };
  const renderSets = ({ item }: { item: SetType }) => (
    <View style={styles.renderCard}>
      <SetCard subject={item} />
    </View>
  );
  return (
    <ScrollView nestedScrollEnabled={true}>
      <SafeAreaView style={{ flex: 1, height: "100%" }}>
        <View style={styles.container}>
          <View style={styles.streakCard}>
            <StreakCard />
          </View>
          <View style={styles.cards}>
            <FlatList data={sets} renderItem={renderSets} />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height: "100%",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,

    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    marginLeft: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    height: 40,
    marginRight: 10, // Space between search bar and icons
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: "#000",
  },
  streakCard: {
    flex: 1,
  },
  cards: {
    flex: 1,
  },
  renderCard: {},
});
