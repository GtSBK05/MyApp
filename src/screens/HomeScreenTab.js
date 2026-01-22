import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const services = [
  { id: 1, name: "URide" },
  { id: 2, name: "UCar" },
  { id: 3, name: "UFood" },
  { id: 4, name: "USend" },
  { id: 5, name: "UMart" },
  { id: 6, name: "UPulsa" }
];

export default function HomeScreenTab({ navigation, user }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.header}>Selamat Datang di Ujek</Text>
      </TouchableOpacity>

      <Text style={styles.subText}>{user ? user.name : "Pengguna"}</Text>

      <FlatList
        data={services}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#101112" },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    textAlign: "center"
  },
  subText: {
    fontSize: 14,
    color: "#A1A1A1",
    textAlign: "center",
    marginBottom: 20
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3A3A3A"
  },
  cardText: { fontWeight: "600", fontSize: 13, color: "#fff" }
});
