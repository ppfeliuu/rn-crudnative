import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Inicio from "./views/Inicio";
import DetallesCliente from "./views/DetallesCliente";
import NuevoCliente from "./views/NuevoCliente";
import Barra from "./components/ui/Barra";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1774F2",
    accent: "#0655BF",
  },
};

export default function App() {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Inicio"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: theme.colors.surface,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            <Stack.Screen
              name="Inicio"
              component={Inicio}
              options={({ navigation, route }) => ({
                headerLeft: (props) => (
                  <Barra {...props} navigation={navigation} route={route} />
                ),
                headerTitleAlign: "center",
              })}
            />
            <Stack.Screen
              name="Nuevo"
              component={NuevoCliente}
              options={{ title: "Nuevo Cliente" }}
            />
            <Stack.Screen
              name="Detalles"
              component={DetallesCliente}
              options={{ title: "Detalles Cliente" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
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
