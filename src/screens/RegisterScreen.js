import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation, users, setUsers }) {
  const [name, setName] = useState("");
  const [npm, setNpm] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    const exists = users.some((u) => u.email === email);
    if (exists) {
      setError("Email sudah terdaftar");
      return;
    }

    const newUser = { name, npm, email, password };
    const updated = [...users, newUser];

    setUsers(updated);
    await AsyncStorage.setItem("users", JSON.stringify(updated));

    navigation.replace("Login4");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Akun</Text>

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <TextInput
        placeholder="Nama Lengkap"
        placeholderTextColor="#777"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="NPM"
        placeholderTextColor="#777"
        style={styles.input}
        value={npm}
        onChangeText={setNpm}
      />

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

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Daftar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login4")}>
        <Text style={styles.link}>Sudah punya akun? Masuk</Text>
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
