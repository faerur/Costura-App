import { View, StyleSheet, FlatList } from "react-native";
import { useState } from "react";

import BotaoFixo from "../botoes/BotaoFixo";
import InputDados from "../componentes/InputDados";
import FichaItem from "../componentes/FichaItem";
import { usePedidos } from "../salvarDados/Persistencia";
function TelaPedidos() {
  const { pedidos, alternarEstadoPedido, removerPedido } = usePedidos();
  const [chamarInputModal, setChamarInputModal] = useState(false);

  function abrirInputModal() {
    setChamarInputModal(true);
  }
  function fecharInputModal() {
    setChamarInputModal(false);
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={pedidos}
        renderItem={({ item }) => (
          <FichaItem
            pedido={item}
            funcaoAlternar={() => alternarEstadoPedido(item.id)}
            funcaoRemover={() => removerPedido(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <BotaoFixo onPress={abrirInputModal} />
      <InputDados
        visivel={chamarInputModal}
        fecharInputModal={fecharInputModal}
      />
    </View>
  );
}

export default TelaPedidos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    padding: 10,
  },
});
