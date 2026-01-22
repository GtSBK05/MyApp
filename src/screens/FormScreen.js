import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const FormScreen = ({ navigation }) => {
  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");

  const simpanData = async () => {
    if (!nama || !umur) {
      Alert.alert("Peringatan", "Harap isi semua data terlebih dahulu!");
      return;
    }
    try {
      const dataBaru = { nama, umur };
      const dataLama = await AsyncStorage.getItem("listUser");
      let daftar = dataLama ? JSON.parse(dataLama) : [];
      daftar.push(dataBaru);
      await AsyncStorage.setItem("listUser", JSON.stringify(daftar));
      setNama("");
      setUmur("");
      Alert.alert("Berhasil", "Data berhasil disimpan!");
    } catch (error) {
      console.log("Gagal menyimpan data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Input</Text>
      <Text style={styles.subtitle}>Masukkan data pengguna</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Nama"
        placeholderTextColor="#888"
        value={nama}
        onChangeText={setNama}
      />
      <TextInput
        style={styles.input}
        placeholder="Masukkan Umur"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={umur}
        onChangeText={setUmur}
      />
      <TouchableOpacity style={styles.button} onPress={simpanData}>
        <Text style={styles.buttonText}>Simpan Data</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => navigation.navigate("About")}
      >
        <Text style={styles.viewText}>Lihat Semua Data</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Kembali</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F10",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  title: { fontSize: 26, fontWeight: "bold", color: "#FFFFFF", marginBottom: 8 },
  subtitle: { color: "#A1A1A1", fontSize: 14, marginBottom: 25 },
  input: {
    borderWidth: 1,
    borderColor: "#3A3A3A",
    backgroundColor: "#1A1A1A",
    width: "100%",
    borderRadius: 8,
    padding: 12,
    color: "#FFFFFF",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    paddingVertical: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16 },
  viewButton: {
    paddingVertical: 12,
    borderRadius: 8,
  },
  viewText: { color: "#B0B0B0", fontSize: 15 },
  back: { marginTop: 25 },
  backText: { color: "#B0B0B0", fontSize: 15 },
});

export default FormScreen;
