import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { usePedidos } from "../salvarDados/Persistencia";
const TelaHistorico = () => {
  const { pedidos } = usePedidos(); // Obtém os pedidos do contexto

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Data: {item.data}</Text>
      <Text style={styles.itemText}>Preço: R$ {item.preco}</Text>
      <Text style={styles.itemText}>
        Finalizado: {item.finalizado ? "Sim" : "Não"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Certifique-se de que cada pedido tem uma propriedade única `id`
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});

export default TelaHistorico;
