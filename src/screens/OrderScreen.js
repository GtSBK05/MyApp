import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";

const API_URL = "http://192.168.100.65:3000/pesanan";

export default function OrderScreen() {
  const [data, setData] = useState([]);
  const [layanan, setLayanan] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [harga, setHarga] = useState("");
  const [editId, setEditId] = useState(null);

  const loadData = async () => {
    const res = await fetch(API_URL);
    const json = await res.json();
    setData(json);
  };

  const saveData = async () => {
    if (!layanan || !tujuan || !harga) return;

    const body = {
      layanan,
      tujuan,
      harga: parseInt(harga)
    };

    if (editId) {
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
    }

    setLayanan("");
    setTujuan("");
    setHarga("");
    setEditId(null);
    loadData();
  };

  const editData = (item) => {
    setLayanan(item.layanan);
    setTujuan(item.tujuan);
    setHarga(item.harga.toString());
    setEditId(item.id);
  };

  const deleteData = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Pesanan (API)</Text>

      <TextInput placeholder="Layanan" placeholderTextColor="#777" style={styles.input} value={layanan} onChangeText={setLayanan} />
      <TextInput placeholder="Tujuan" placeholderTextColor="#777" style={styles.input} value={tujuan} onChangeText={setTujuan} />
      <TextInput placeholder="Harga" placeholderTextColor="#777" style={styles.input} keyboardType="numeric" value={harga} onChangeText={setHarga} />

      <TouchableOpacity style={styles.button} onPress={saveData}>
        <Text style={styles.buttonText}>{editId ? "Update Pesanan" : "Tambah Pesanan"}</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        style={{ width: "100%" }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.layanan}</Text>
              <Text style={styles.cardText}>{item.tujuan}</Text>
              <Text style={styles.cardPrice}>Rp {item.harga}</Text>
            </View>

            <View style={styles.cardButtons}>
              <TouchableOpacity style={styles.editBtn} onPress={() => editData(item)}>
                <Text style={styles.btnText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteData(item.id)}>
                <Text style={styles.btnText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#101112", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20, textAlign: "center" },
  input: {
    backgroundColor: "#1E1E1E",
    borderColor: "#3A3A3A",
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    color: "#fff",
    marginVertical: 6
  },
  button: {
    backgroundColor: "#00cc88",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  card: {
    backgroundColor: "#1E1E1E",
    borderColor: "#3A3A3A",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    flexDirection: "row"
  },
  cardTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  cardText: { color: "#aaa", marginBottom: 4 },
  cardPrice: { color: "#00cc88", fontWeight: "bold" },
  cardButtons: { justifyContent: "space-between" },
  editBtn: {
    backgroundColor: "#3a7bd5",
    padding: 8,
    borderRadius: 8,
    marginBottom: 5,
    width: 70,
    alignItems: "center"
  },
  deleteBtn: {
    backgroundColor: "#d9534f",
    padding: 8,
    borderRadius: 8,
    width: 70,
    alignItems: "center"
  },
  btnText: { color: "#fff", fontSize: 12 }
});
