/* eslint-disable no-return-assign */
import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
// eslint-disable-next-line import/named
import { navigationRef } from "./RootNavigation";

// import the different screens
import Loading from "./components/Loading";
import LoginController from "./components/LoginController";
import Main from "./components/Main";
import NewUserForm from "./components/NewUserForm";
import UpdateUserForm from "./components/UpdateUserForm";
import Success from "./components/newUserForms/Success";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import Specialties from "./components/Specialties";
import Clinics from "./components/Clinics";
import Doctors from "./components/Doctors";
import DoctorProfile from "./components/DoctorProfile";
import CreateAppointment from "./components/CreateAppointment";
import Appointments from "./components/Appointments";
import DoctorAppointments from "./components/DoctorAppointments";
import ViewAppointment from "./components/ViewAppointment";
import ViewDoctorAppointment from "./components/ViewDoctorAppointment";
import AppointmentHistory from "./components/AppointmentHistory";
import EditAppointment from "./components/EditAppointment";

// Navbar
import NavBar from "./components/NavBar";

const Stack = createStackNavigator();

const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
    <Stack.Screen
      name="Loading"
      component={Loading}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Main"
      component={Main}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="LoginController"
      component={LoginController}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EditAppointment"
      component={EditAppointment}
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
      name="Clinics"
      component={Clinics}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Specialties"
      component={Specialties}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="NewUserForm"
      component={NewUserForm}
      options={{ title: "Crear usuario", headerShown: false }}
    />
    <Stack.Screen
      name="UpdateUserForm"
      component={UpdateUserForm}
      options={{ title: "Actualizar usuario", headerShown: false }}
    />
    <Stack.Screen
      name="Doctors"
      component={Doctors}
      options={{ title: "Actualizar usuario", headerShown: false }}
    />
    <Stack.Screen
      name="DoctorProfile"
      component={DoctorProfile}
      options={{ title: "Actualizar usuario", headerShown: false }}
    />
    <Stack.Screen
      name="CreateAppointment"
      component={CreateAppointment}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Appointments"
      component={Appointments}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="DoctorAppointments"
      component={DoctorAppointments}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ViewAppointment"
      component={ViewAppointment}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ViewDoctorAppointment"
      component={ViewDoctorAppointment}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AppointmentHistory"
      component={AppointmentHistory}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const showNavbarSelector = (state) => {
  const { userData } = state.user;
  const { showMenu } = state.utils;

  return userData && showMenu;
};

export default function App() {
  const showNavBar = useSelector(showNavbarSelector);
  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack />
      {showNavBar && <NavBar />}
    </NavigationContainer>
  );
}
