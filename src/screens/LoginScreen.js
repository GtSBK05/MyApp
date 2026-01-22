import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    const data = await AsyncStorage.getItem("users");
    if (!data) return;

    const users = JSON.parse(data);
    const found = users.find((u) => u.email === email && u.password === password);

    if (!found) {
      setError("Email atau Password salah");
      return;
    }

    await AsyncStorage.setItem("user", JSON.stringify(found));
    setUser(found);
    navigation.replace("MainMenu4", { user: found });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#777"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Masuk</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register4")}>
        <Text style={styles.link}>Belum punya akun? Daftar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101112",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20
  },
  error: {
    color: "#ff6b6b",
    marginBottom: 10,
    fontSize: 14
  },
  input: {
    width: "85%",
    backgroundColor: "#1E1E1E",
    borderColor: "#3A3A3A",
    borderWidth: 1,
    color: "#fff",
    padding: 12,
    marginVertical: 8,
    borderRadius: 10
  },
  button: {
    width: "85%",
    backgroundColor: "#00cc88",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
  link: {
    color: "#00cc88",
    marginTop: 15,
    fontSize: 14
  }
});
