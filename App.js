import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SplashScreen from "./src/screens/SplashScreen";
import HomeScreen from "./src/screens/HomeScreen";
import FormScreen from "./src/screens/FormScreen";
import ContactScreen from "./src/screens/ContactScreen";
import AboutScreen from "./src/screens/AboutScreen";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import MainMenu4 from "./src/navigation/MainMenu4";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const loadData = async () => {
    const savedUsers = await AsyncStorage.getItem("users");

    if (!savedUsers) {
      const defaultUsers = [
        {
          name: "Admin",
          email: "admin@mail.com",
          password: "12345",
          npm: "00000000"
        }
      ];
      await AsyncStorage.setItem("users", JSON.stringify(defaultUsers));
      setUsers(defaultUsers);
    } else {
      setUsers(JSON.parse(savedUsers));
    }

    const session = await AsyncStorage.getItem("user");
    if (session) setUser(JSON.parse(session));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="Splash" component={SplashScreen} />

        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} user={user} />}
        </Stack.Screen>

        <Stack.Screen name="Form" component={FormScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="About" component={AboutScreen} />

        <Stack.Screen name="Login4">
          {(props) => (
            <LoginScreen
              {...props}
              users={users}
              setUser={setUser}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Register4">
          {(props) => (
            <RegisterScreen
              {...props}
              users={users}
              setUsers={setUsers}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="MainMenu4">
          {(props) => (
            <MainMenu4
              {...props}
              user={user}
              setUser={setUser}
            />
          )}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
