import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DataModal from "../data/DataModal";

function EditarFicha({
  modalVisivel,
  dadosPedido,
  fecharModal,
  salvarAlteracoes,
}) {
  const [cliente, setCliente] = useState(dadosPedido.nomeCliente);
  const [telefone, setTelefone] = useState(dadosPedido.telefone);
  const [preco, setPreco] = useState(dadosPedido.preco);
  const [observacoes, setObservacoes] = useState(dadosPedido.observacoes);
  const [dataPedido, setDataPedido] = useState(dadosPedido.data);

  function handleSalvar() {
    // Certifique-se de que você está passando todos os dados atualizados
    salvarAlteracoes({
      nomeCliente: cliente,
      telefone: telefone,
      preco: preco,
      observacoes: observacoes,
      data: dataPedido, // Usando o estado atualizado de dataPedido
    });
    fecharModal();
  }

  function formatarData(data) {
    setDataPedido(data); // Atualiza o estado de dataPedido com a data formatada
  }

  return (
    <Modal visible={modalVisivel} animationType="slide">
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cliente"
          value={cliente}
          onChangeText={setCliente}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          keyboardType="numeric"
          value={telefone}
          onChangeText={setTelefone}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço"
          keyboardType="numeric"
          value={preco}
          onChangeText={setPreco}
        />
        <TextInput
          style={styles.input}
          placeholder="Observações"
          value={observacoes}
          onChangeText={setObservacoes}
          multiline
        />
        <View style={styles.dateContainer}>
          <TextInput
            style={styles.dateInput}
            editable={false}
            placeholder="Data de Admissão"
            value={dataPedido} // Exibe a data formatada
            placeholderTextColor="black"
          />
          <DataModal formatarData={formatarData} />
        </View>
        <View style={styles.botoesContainer}>
          <TouchableOpacity onPress={handleSalvar} style={styles.botaoSalvar}>
            <Text style={styles.textoBotaoSalvar}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={fecharModal} style={styles.botaoCancelar}>
            <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default EditarFicha;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dateInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  botoesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  botaoSalvar: {
    backgroundColor: "#3ab136",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  textoBotaoSalvar: {
    color: "white",
    fontWeight: "bold",
  },
  botaoCancelar: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  textoBotaoCancelar: {
    color: "black",
    fontWeight: "bold",
  },
});
