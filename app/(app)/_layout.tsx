import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import "react-native-reanimated";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
  Button,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function RootLayout() {
  const { authState } = useAuth();

  if (authState?.authenticated == null) {
    return null;
  }

  if (!authState?.authenticated) {
    return <Redirect href="/Login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: true,
          header: ({ navigation, route, options }) => {
            const [isSearchActive, setIsSearchActive] = React.useState(false);
            const searchWidth = React.useRef(new Animated.Value(0)).current;

            const toggleSearch = () => {
              if (isSearchActive) {
                Animated.timing(searchWidth, {
                  toValue: 0,
                  duration: 300,
                  useNativeDriver: false,
                }).start(() => {
                  setIsSearchActive(false);
                });
              } else {
                setIsSearchActive(true);
                Animated.timing(searchWidth, {
                  toValue: 200, // Adjust this value as needed
                  duration: 300,
                  useNativeDriver: false,
                }).start();
              }
            };

            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 20,
                  paddingTop: 50,
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",

                    marginLeft: 5,
                  }}
                >
                  Your Sets
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {isSearchActive && (
                    <Animated.View
                      style={{
                        width: searchWidth,
                        backgroundColor: "#F0F0F0",
                        borderRadius: 20,
                        marginRight: 10,
                      }}
                    >
                      <TextInput
                        style={{ paddingHorizontal: 10, color: "#000" }}
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
                      style={{ marginLeft: 10 }}
                    />
                  </TouchableOpacity>
                  <Ionicons
                    name="notifications-outline"
                    size={24}
                    color="black"
                    onPress={() => router.push("./tests")}
                    style={{ marginLeft: 10 }}
                  />
                  <Image
                    source={require("@/assets/images/racoon.png")}
                    style={{ width: 35, height: 35, marginLeft: 10 }}
                  />
                </View>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="(modals)/set/[id]"
        options={{
          presentation: "modal",
          title: "",
        }}
      />
    </Stack>
  );
}
