import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();

  const login = async () => {
    const result = await onLogin!(email, password);
    console.log(result);

    if (result && result.error) {
      alert(result.message);
    } else {
      router.replace("/"); // bunu yapmazsak home page bizi göndermiyor burda güncelleme yapmalıyız çünkü (app)/_layout burda geçerli değil
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/1998/1998767.png",
          }}
        />
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Pressable style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 44,
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
  },
  button: {
    width: "100%",
    height: 44,
    backgroundColor: "#eb5a61",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default Login;
