import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Foundation from "@expo/vector-icons/Foundation";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { uri } from "@/constants/api";
export default function TabLayout() {
  // TODO: search how to reach from [id] to root e_layout file to change tha stack name

  const { id } = useLocalSearchParams();
  const [courseDetails, setCourseDetails] = useState(null);
  console.log(id);

  //TODO: CACHE kullan değişiklik olmazsa aynı datayı kullansın diye. Kendin cache yapmayı öğren bide otamatik react query  kullanarak da yapabilirsin
  //react query server state yönetmek için kullanlıyor

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${uri}/api/v1/course/${id}`);
        setCourseDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  return (
    <>
      <Stack.Screen options={{ title: courseDetails?.title }} />

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
              <FontAwesome name="home" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          initialParams={{ id }} // normalde tabler [id] klasöründe değildi setDetails içerisindeydi ama böyle olduğu için {id} useLocalSearchParams kendi olduğu file dışında tanınmıyordu. Bunu çözmek için [id] klasörü açtık ve içerisine koydum tab filesı ama id hala undefined oldu bu expo routerda olan bir issue" tab nested in dynamic routes have wrong paths"-> "https://github.com/expo/expo/issues/27472" bu yüzden id yi _layout sayfasından search sayfasına gönderiyoruz bu da workaround oluyor geçici bir çözüm
          name="search"
          options={{
            title: "flashcard",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="cards-outline"
                size={24}
                color={color}
              />
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
