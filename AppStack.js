/* eslint-disable no-return-assign */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// eslint-disable-next-line import/named
import { navigationRef } from "./RootNavigation";

// import the different screens
import Loading from "./components/Loading";
import LoginController from "./components/LoginController";
import Main from "./components/Main";
import NewUserForm from "./components/NewUserForm";
import Success from "./components/newUserForms/Success";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";

// Navbar
import NavBar from "./components/NavBar";

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
      name="Success"
      component={Success}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="UpdateProfile"
      component={UpdateProfile}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="NewUserForm"
      component={NewUserForm}
      options={{ title: "Crear usuario", headerShown: false }}
    />
  </Stack.Navigator>
);

export default function App() {
  const showNavBar = useSelector((state) => state.user.userData);
  const [route, setRoute] = useState("");
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        setRoute(currentRouteName);
      }}
    >
      <AppStack />
      {showNavBar && <NavBar route={route} />}
    </NavigationContainer>
  );
}
