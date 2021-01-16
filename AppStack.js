import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import the different screens
import Loading from "./components/Loading";
import LoginController from "./components/LoginController";
import Main from "./components/Main";
import NewUserForm from "./components/NewUserForm";

const Stack = createStackNavigator();

const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerLeft: null,
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#3a6ab1",
      },
      headerTitleStyle: {
        color: "white",
      },
    }}
  >
    <Stack.Screen name="Loading" component={Loading} />
    <Stack.Screen name="Main" component={Main} />
    <Stack.Screen
      name="LoginController"
      component={LoginController}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="NewUserForm"
      component={NewUserForm}
      options={{ title: "Crear usuario" }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
