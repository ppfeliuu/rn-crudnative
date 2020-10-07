import React from "react";
import { Text } from "react-native";

const DetallesCliente = ({ route }: any) => {
  console.log(route.params);
  return <Text>Detalles</Text>;
};

export default DetallesCliente;
