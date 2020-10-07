import axios from "axios";
import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from "react-native-paper";
import globalStyles from "../styles/global";

const NuevoCliente = () => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [alerta, setAlerta] = useState(false);

  const guardarCliente = async () => {
    if (nombre === "" || telefono === "" || email === "" || empresa === "") {
      setAlerta(true);
      return;
    }

    const cliente = { nombre, telefono, empresa, email };

    try {
      if (Platform.OS === "ios") {
        await axios.post("http://localhost:3000/clientes", cliente);
      } else {
        await axios.post("http://192.168.0.12:3000/clientes", cliente);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>
      <TextInput
        label="Nombre"
        placeholder="Pedro"
        onChangeText={(texto) => setNombre(texto)}
        style={styles.input}
        value={nombre}
      />

      <TextInput
        label="Teléfono"
        placeholder="123456789"
        onChangeText={(texto) => setTelefono(texto)}
        style={styles.input}
        value={telefono}
      />

      <TextInput
        label="Email"
        placeholder="name@domain.com"
        onChangeText={(texto) => setEmail(texto)}
        style={styles.input}
        value={email}
      />

      <TextInput
        label="Empresa"
        placeholder="Nombre de la empresa"
        onChangeText={(texto) => setEmpresa(texto)}
        style={styles.input}
        value={empresa}
      />

      <Button
        icon="pencil-circle"
        mode="contained"
        onPress={() => guardarCliente()}
      >
        Guardar Cliente
      </Button>

      <Portal>
        <Dialog visible={alerta} onDismiss={() => setAlerta(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAlerta(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: "transparent",
  },
});

export default NuevoCliente;
