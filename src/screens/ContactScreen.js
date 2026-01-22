import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ContactScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact</Text>
      <Text style={styles.subtitle}>Hubungi kami melalui tautan berikut</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL("mailto:info@rhodesisland.com")}
      >
        <Text style={styles.buttonText}>Kirim Email</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL("https://github.com/")}
      >
        <Text style={styles.buttonText}>Kunjungi GitHub</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    color: "#A1A1A1",
    fontSize: 14,
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 8,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    marginTop: 30,
  },
  backText: {
    color: "#B0B0B0",
    fontSize: 15,
  },
});

export default ContactScreen;
