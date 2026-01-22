import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreenTab from "../screens/HomeScreenTab";
import OrderScreen from "../screens/OrderScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainMenu4({ navigation, user, setUser }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#1E1E1E",
          borderTopColor: "#3A3A3A",
          height: 60
        },
        tabBarLabelStyle: { color: "#fff", fontSize: 12 },
        tabBarIcon: ({ focused, size }) => {
          let icon;
          if (route.name === "HomeTab") icon = focused ? "home" : "home-outline";
          if (route.name === "Orders") icon = focused ? "list" : "list-outline";
          if (route.name === "Profile") icon = focused ? "person" : "person-outline";

          return (
            <Ionicons
              name={icon}
              size={size}
              color={focused ? "#00cc88" : "#aaa"}
            />
          );
        },
        headerShown: false
      })}
    >
      <Tab.Screen name="HomeTab">
        {(props) => <HomeScreenTab {...props} user={user} />}
      </Tab.Screen>

      <Tab.Screen name="Orders" component={OrderScreen} />

      <Tab.Screen name="Profile">
        {(props) => <ProfileScreen {...props} user={user} setUser={setUser} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
