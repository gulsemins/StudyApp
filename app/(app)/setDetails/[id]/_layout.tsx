import { FontAwesome } from "@expo/vector-icons";
import Foundation from "@expo/vector-icons/Foundation";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import React from "react";

export default function TabLayout() {
  // TODO: search how to reach from [id] to root e_layout file to change tha stack name

  const { id } = useLocalSearchParams();
  console.log(id);
  return (
    <>
      <Stack.Screen />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#e1575d",
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <AntDesign name="wechat" size={28} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          initialParams={{ id }} // normalde tabler [id] klasöründe değildi setDetails içerisindeydi ama böyle olduğu için {id} useLocalSearchParams kendi olduğu file dışında tanınmıyordu. Bunu çözmek için [id] klasörü açtık ve içerisine koydum tab filesı ama id hala undefined oldu bu expo routerda olan bir issue" tab nested in dynamic routes have wrong paths"-> "https://github.com/expo/expo/issues/27472" bu yüzden id yi _layout sayfasından search sayfasına gönderiyoruz bu da workaround oluyor geçici bir çözüm
          name="search"
          options={{
            title: "flashcard",
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
