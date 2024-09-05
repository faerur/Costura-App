import { TouchableOpacity, Text, StyleSheet } from "react-native";

function FinalizarPedido({ pedido, funcaoAlternar, finalizarPedido }) {
  return (
    <TouchableOpacity
      style={[
        styles.botaoFinalizarPedido,
        { backgroundColor: pedido.finalizado ? "#FF5722" : "#4CAF50" },
      ]}
      onPress={funcaoAlternar}
    >
      <Text style={styles.textoBotaoFinalizar}>
        {pedido.finalizado ? "Reabrir Pedido" : "Finalizar Pedido"}
      </Text>
    </TouchableOpacity>
  );
}

export default FinalizarPedido;

const styles = StyleSheet.create({
  botaoFinalizarPedido: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  botaoRemoverPedido: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#FF0000",
    borderRadius: 5,
  },
  textoBotaoFinalizar: {
    color: "white",
    fontWeight: "bold",
  },
  botaoFechar: {
    marginTop: 10,
    padding: 10,
  },
});
