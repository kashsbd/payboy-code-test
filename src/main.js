import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CreateUserScreen from "./screen/CreateUserScreen";
import HomeScreen from "./screen/HomeScreen";

const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <Ionicons
                name={focused ? "md-home-sharp" : "md-home-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Create User") {
            return (
              <Ionicons
                name={focused ? "reorder-three-sharp" : "reorder-three-outline"}
                size={35}
                color={color}
              />
            );
          }
        },
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "black",
        tabBarLabel: ({ route }) => null,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create User" component={CreateUserScreen} />
    </Tab.Navigator>
  );
}

export default Main;
