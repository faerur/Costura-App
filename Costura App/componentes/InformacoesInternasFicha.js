import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePedidos } from "../salvarDados/Persistencia";
import EditarFicha from "./EditarFicha";

function InformacoesInternasFicha({ route, navigation }) {
  const { pedido } = route.params;
  const { alternarEstadoPedido, removerPedido, editarPedido } = usePedidos();

  const [ativarEdicao, setAtivarEdicao] = useState(false);
  const [dadosPedido, setDadosPedido] = useState(pedido);

  const fecharTela = () => {
    navigation.goBack();
  };

  function handleAlterarEstadoPedido() {
    alternarEstadoPedido(pedido.id);
    navigation.goBack();
  }

  function abrirModal() {
    setAtivarEdicao(true);
  }

  function handleSalvarAlteracoes(dadosAtualizados) {
    editarPedido(pedido.id, dadosAtualizados);
    setDadosPedido((prevState) => ({ ...prevState, ...dadosAtualizados }));
    setAtivarEdicao(false);
  }

  function handleRemoverPedido() {
    Alert.alert(
      "Confirmar Remoção",
      "Tem certeza que deseja remover este pedido?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          onPress: () => {
            console.log("Remover Pedido:", pedido.id); 
            removerPedido(pedido.id);
            navigation.goBack();
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.header}>
            <TouchableOpacity onPress={fecharTela}>
              <Ionicons name="close" size={30} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.containerTexto}>
            <Text style={styles.modalText}>
              Cliente:{" "}
              <Text style={styles.textoDestaque}>
                {dadosPedido.nomeCliente}
              </Text>
            </Text>
            {dadosPedido.telefone && (
              <Text style={styles.modalText}>
                Telefone:{" "}
                <Text style={styles.textoDestaque}>{dadosPedido.telefone}</Text>
              </Text>
            )}
            <Text style={styles.modalText}>
              Data: <Text style={styles.textoDestaque}>{dadosPedido.data}</Text>
            </Text>
            {dadosPedido.observacoes && (
              <Text style={styles.modalText}>
                Observações:{" "}
                <Text style={styles.textoDestaque}>
                  {dadosPedido.observacoes}
                </Text>
              </Text>
            )}
            <Text style={styles.modalText}>
              Valor:{" "}
              <Text style={styles.textoDestaque}>R${dadosPedido.preco}</Text>
            </Text>
          </View>
        </ScrollView>

        <View style={styles.containerBotoesInferiores}>
          <TouchableOpacity
            style={styles.botaoRemoverPedido}
            onPress={handleRemoverPedido} 
          >
            <Ionicons name="trash-outline" size={24} color="white" />
          </TouchableOpacity>

          {!pedido.finalizado && (
            <TouchableOpacity
              style={styles.botaoFinalizarPedido}
              onPress={handleAlterarEstadoPedido}
            >
              <Text style={styles.textoBotaoFinalizar}>Finalizar</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.botaoEditarPedido}
            onPress={abrirModal}
          >
            <Ionicons name="create-outline" size={24} color="white" />
          </TouchableOpacity>
          <EditarFicha
            modalVisivel={ativarEdicao}
            dadosPedido={dadosPedido}
            fecharModal={() => setAtivarEdicao(false)}
            salvarAlteracoes={handleSalvarAlteracoes}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scrollView: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 15,
  },
  containerTexto: {
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  textoDestaque: {
    fontWeight: "bold",
    color: "#3b5998",
  },
  containerBotoesInferiores: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  botaoRemoverPedido: {
    padding: 12,
    backgroundColor: "#e57373",
    borderRadius: 5,
  },
  botaoEditarPedido: {
    padding: 12,
    backgroundColor: "#64b5f6",
    borderRadius: 5,
  },
  botaoFinalizarPedido: {
    padding: 12,
    backgroundColor: "#4caf50",
    borderRadius: 5,
  },
  textoBotaoFinalizar: {
    color: "white",
    fontWeight: "bold",
  },
});

export default InformacoesInternasFicha;
