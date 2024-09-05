import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usePedidos } from "../salvarDados/Persistencia";

function FichaItem({ pedido, funcaoRemover }) {
  const { editarPedido } = usePedidos();
  const navigation = useNavigation();

  function abrirTelaInformacoes() {
    navigation.navigate("InformacoesInternasFicha", {
      pedido,
    });
  }

  function confirmarRemocao() {
    Alert.alert(
      "Confirmar Remoção",
      "Tem certeza que deseja apagar este pedido?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Apagar",
          onPress: () => {
            funcaoRemover(pedido.id);
            navigation.goBack();
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <View
      style={[
        styles.ficha,
        { backgroundColor: pedido.finalizado ? "#999" : "#3ab136" },
      ]}
    >
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={styles.botao}
        onPress={abrirTelaInformacoes}
      >
        <View style={styles.informacoesExpostas}>
          <View style={styles.fichaInterior}>
            <Text style={styles.titulo}>{pedido.veiculo}</Text>
          </View>
          <View style={styles.informacoesCanto}>
            <Text style={styles.titulo}>{pedido.dataAdmissao}</Text>
          </View>
          <View style={styles.previsaoContainer}>
            <Text style={styles.previsaoTexto}>
              Cliente: {pedido.nomeCliente}
            </Text>
            <Text style={styles.previsaoTexto}>
              Telefone: {pedido.telefone}
            </Text>
            <Text style={styles.previsaoTexto}>Preço: R${pedido.preco}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  ficha: {
    flex: 1,
    margin: 16,
    height: 180,
    borderRadius: 8,
    elevation: 4,
    padding: 10,
  },
  informacoesExpostas: {
    flex: 1,
    justifyContent: "space-between",
  },
  botao: {
    flex: 1,
  },
  fichaInterior: {
    flex: 1,
  },
  titulo: {
    fontWeight: "700",
    fontSize: 15,
    color: "white",
  },
  informacoesCanto: {
    alignItems: "flex-end",
    right: 5,
  },
  previsaoContainer: {
    marginTop: 10,
  },
  previsaoTexto: {
    color: "white",
    fontSize: 18,
  },
});

export default FichaItem;
