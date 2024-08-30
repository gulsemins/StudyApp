import { FontAwesome } from "@expo/vector-icons";
import Foundation from "@expo/vector-icons/Foundation";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import React from "react";

export default function TabLayout() {
  // TODO: search how to reach from [id] to root e_layout file to change tha stack name

  const { id } = useLocalSearchParams();
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
  const found = sets.find((set) => set.idSet == id);
  return (
    <>
      <Stack.Screen options={{ title: found?.name }} />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#e1575d",
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="[id]"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <AntDesign name="wechat" size={28} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="flashcards"
          options={{
            title: "flashcards",
            tabBarIcon: ({ color }) => (
              <AntDesign name="wechat" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="match"
          options={{
            title: "match",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="quiz" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tests"
          options={{
            title: "tests",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="quiz" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
