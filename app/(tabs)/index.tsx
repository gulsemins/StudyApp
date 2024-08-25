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
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function Tab() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchWidth = useRef(new Animated.Value(0)).current;

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
        toValue: 200, // Expand search bar to full width
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Sets</Text>
          <View style={styles.iconsContainer}>
            {isSearchActive && (
              <Animated.View style={[styles.searchBar, { width: searchWidth }]}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search"
                  placeholderTextColor="#888"
                  autoFocus={true}
                />
              </Animated.View>
            )}
            <TouchableOpacity onPress={toggleSearch}>
              <Ionicons
                name="search-outline"
                size={24}
                color="black"
                style={styles.icon}
              />
            </TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={24}
              color="black"
              onPress={() => router.push("./tests")}
            />
          </View>
        </View>
        {/* Rest of your content */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
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
});
