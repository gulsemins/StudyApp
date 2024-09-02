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
import SetCard from "@/components/index/SetCard";
import StreakCard from "@/components/index/StreakCard";
import DailyObjects from "@/components/index/DailyObjects";
export interface SetType {
  idSet: string;
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
    <TouchableOpacity
      style={styles.renderCard}
      onPress={() => {
        router.push({
          pathname: `/setDetails/[id]`, // Navigate using the idMeal
          params: { id: item.idSet },
        });
      }}
    >
      <SetCard subject={item} />
    </TouchableOpacity>
  );
  return (
    <ScrollView nestedScrollEnabled={true} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.streakCard}>
          <StreakCard />
        </View>
        <View style={styles.cards}>
          <FlatList
            data={sets}
            renderItem={renderSets}
            nestedScrollEnabled={true}
            scrollEnabled={false} // Disable scrolling on FlatList
            style={{ flexGrow: 1 }} // Allow FlatList to expand within ScrollView
          />
        </View>
        <View>
          <DailyObjects />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
    color: "gray",
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
