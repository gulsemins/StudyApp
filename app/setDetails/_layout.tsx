import { FontAwesome } from "@expo/vector-icons";
import Foundation from "@expo/vector-icons/Foundation";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
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
  );
}
