import axios from "axios";
import React from "react";
import { View, StyleSheet, Alert, Platform } from "react-native";
import { Headline, Text, Subheading, Button, FAB } from "react-native-paper";
import globalStyles from "../styles/global";

const DetallesCliente = ({ navigation, route }: any) => {
  const { nombre, email, telefono, empresa, id } = route.params.item;
  const { setConsultarAPI } = route.params;
  const mostrarConfirmacion = () => {
    Alert.alert("¿Eliminar cliente?", "Eliminar no se puede deshacer", [
      { text: "Si, eliminar", onPress: () => eliminarContacto() },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const eliminarContacto = async () => {
    try {
      if (Platform.OS === "ios") {
        await axios.delete(`http://localhost:3000/clientes/${id}`);
      } else {
        await axios.delete(`http://192.168.0.12:3000/clientes/${id}`);
      }
    } catch (error) {
      console.log(error);
    }

    navigation.navigate("Inicio");

    setConsultarAPI(true);
  };
  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{nombre}</Headline>
      <Text style={styles.texto}>
        Empresa: <Subheading>{empresa}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Email: <Subheading>{email}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Teléfono: <Subheading>{telefono}</Subheading>
      </Text>

      <Button
        mode="contained"
        icon="cancel"
        style={styles.boton}
        onPress={() => mostrarConfirmacion()}
      >
        Eliminar cliente
      </Button>

      <FAB
        icon="pencil"
        style={globalStyles.fab}
        onPress={() =>
          navigation.navigate("NuevoCliente", {
            cliente: route.params.item,
            setConsultarAPI,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 18,
  },
  boton: {
    marginTop: 100,
    backgroundColor: "red",
  },
});

export default DetallesCliente;
