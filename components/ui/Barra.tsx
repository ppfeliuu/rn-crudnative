import React from "react";
import { Button } from "react-native-paper";

const Barra = ({ navigation, route }: any) => {
  const handlePress = () => {
    navigation.navigate("Nuevo");
  };
  return (
    <Button
      icon="account-plus-outline"
      color="#fff"
      onPress={() => handlePress()}
    >
      Cliente
    </Button>
  );
};

export default Barra;
