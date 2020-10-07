import React, { useEffect, useState } from "react";
import { Text, Platform, FlatList, View, StyleSheet } from "react-native";
import axios from "axios";
import { List, Headline, Button, FAB } from "react-native-paper";
import globalStyles from "../styles/global";

const Inicio = ({ navigation }: any) => {
  const [clientes, setClientes] = useState([]);
  const [consultarAPI, setConsultarAPI] = useState(true);

  useEffect(() => {
    const getClientesAPI = async () => {
      try {
        let url = "";
        if (Platform.OS === "ios") {
          url = "http://localhost:3000/clientes";
        } else {
          url = "http://192.168.0.13:3000/clientes";
        }

        const res = await axios.get(url);
        setClientes(res.data);
        setConsultarAPI(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (consultarAPI) {
      getClientesAPI();
    }
  }, [consultarAPI]);

  return (
    <View>
      <Button
        icon="account-plus-outline"
        onPress={() => navigation.navigate("NuevoCliente", { setConsultarAPI })}
      >
        Nuevo Cliente
      </Button>
      <Headline style={globalStyles.titulo}>
        {clientes.length > 0 ? "Clientes" : "No hay clientes"}
      </Headline>
      <FlatList
        data={clientes}
        keyExtractor={(cliente) => String(cliente["id"])}
        renderItem={({ item }) => (
          <List.Item
            title={item["nombre"]}
            description={item["empresa"]}
            onPress={() => navigation.navigate("Detalles", { item })}
          />
        )}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("NuevoCliente", { setConsultarAPI })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 10,
    right: 0,
    bottom: 0,
  },
});

export default Inicio;
