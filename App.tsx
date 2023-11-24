import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DrawerItems from "./constants/MenuItems";
import { Feather } from "@expo/vector-icons";
import HomeScreen from "./pages/Home";
import WikiDetails from "./pages/nestedPages/WikiDetails";

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// const MainScreen = () => {
//   return (
//     <Drawer.Navigator
//       drawerType="front"
//       initialRouteName="Login Screen"
//       screenOptions={{
//         activeTintColor: "#e91e63",
//         itemStyle: { marginVertical: 10 },
//       }}
//     >
//       {DrawerItems.map((drawer) => (
//         <Drawer.Screen
//           key={drawer.name}
//           name={drawer.name}
//           options={{
//             drawerIcon: ({ focused }) =>
//               drawer.iconType === "Material" ? (
//                 <MaterialCommunityIcons
//                   name={drawer.iconName}
//                   size={24}
//                   color={focused ? "#e91e63" : "black"}
//                 />
//               ) : drawer.iconType === "Feather" ? (
//                 <Feather
//                   name={drawer.iconName}
//                   size={24}
//                   color={focused ? "#e91e63" : "black"}
//                 />
//               ) : (
//                 <></>
//               ),
//           }}
//           component={
//             //drawer.name==='LoginScreen' ? LoginScreen
//             drawer.name === "HomeScreen" ? HomeScreen : HomeScreen
//           }
//         />
//       ))}
//     </Drawer.Navigator>
//   );
// };

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name="Wikipedia" component={HomeScreen} />
          <Stack.Screen name="WikiDetails" component={WikiDetails} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
