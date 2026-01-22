import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/PRTS.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>PRTS SYSTEM</Text>
      </View>

      <Text style={styles.title}>Navigation Hub</Text>
      <Text style={styles.subtitle}>Choose a screen to explore</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          const stored = await AsyncStorage.getItem("user");

          if (stored) {
            const currentUser = JSON.parse(stored);
            navigation.replace("MainMenu4", { user: currentUser });
          } else {
            navigation.navigate("Login4");
          }
        }}
      >
        <Text style={styles.buttonText}>Layout Order</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Form")}
      >
        <Text style={styles.buttonText}>Form Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Contact")}
      >
        <Text style={styles.buttonText}>Contact Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("About")}
      >
        <Text style={styles.buttonText}>About Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101112",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25
  },
  header: {
    position: "absolute",
    top: 60,
    alignItems: "center"
  },
  logo: {
    width: 80,
    height: 80,
    tintColor: "#fff"
  },
  headerText: {
    color: "#d9d9d9",
    fontSize: 14,
    letterSpacing: 1.5,
    marginTop: 5
  },
  title: {
    fontSize: 26,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 60
  },
  subtitle: {
    color: "#a1a1a1",
    fontSize: 14,
    marginBottom: 25
  },
  button: {
    backgroundColor: "#1E1E1E",
    borderColor: "#3A3A3A",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 60,
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5
  }
});

export default HomeScreen;
