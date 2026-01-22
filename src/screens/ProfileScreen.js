import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuLeft}>
      <Ionicons name={icon} size={22} color="#00cc88" />
      <Text style={styles.menuText}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward-outline" size={22} color="#777" />
  </TouchableOpacity>
);

export default function ProfileScreen({ navigation, user, setUser }) {
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={100} color="#444" />
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        <Text style={styles.userEmail}>{user?.npm}</Text>
      </View>

      <View style={styles.menuBox}>
        <Item icon="person-outline" label="Edit Profil" onPress={() => {}} />
        <Item icon="settings-outline" label="Pengaturan" onPress={() => {}} />
        <Item icon="help-circle-outline" label="Pusat Bantuan" onPress={() => {}} />
        <Item icon="information-circle-outline" label="Tentang Kami" onPress={() => {}} />
        <Item icon="folder-outline" label="Form Input" onPress={() => navigation.navigate("Form")} />
        <Item icon="document-text-outline" label="Data + ToDo" onPress={() => navigation.navigate("About")} />
        <Item icon="call-outline" label="Contact" onPress={() => navigation.navigate("Contact")} />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#101112" },
  header: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 30,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: "#3A3A3A"
  },
  userName: { fontSize: 22, fontWeight: "bold", marginTop: 10, color: "#fff" },
  userEmail: { fontSize: 16, color: "#A1A1A1", marginTop: 4 },
  menuBox: {
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3A3A3A"
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a"
  },
  menuLeft: { flexDirection: "row", alignItems: "center" },
  menuText: { fontSize: 16, marginLeft: 15, color: "#fff" },
  logoutButton: {
    backgroundColor: "#d9534f",
    marginTop: 30,
    marginHorizontal: 10,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 40
  },
  logoutText: { fontSize: 16, fontWeight: "bold", color: "#fff" }
});
