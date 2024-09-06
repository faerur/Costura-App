import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usePedidos } from "../salvarDados/Persistencia";
import Ionicons from "react-native-vector-icons/Ionicons";

import Pedido from "../objeto/Pedido";
import DataModal from "../data/DataModal";
import Cores from "../constantes/Cores";

function InputDados({ visivel, fecharInputModal }) {
  const { adicionarPedido } = usePedidos();
  const [cliente, setNomeCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [preco, setPreco] = useState("");
  const [formatarPlaceHolder, setFormatarPlaceHolder] = useState("DD/MM/AAAA");
  const [dataPedido, setDataPedido] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const navigation = useNavigation();

  function confirmarDados() {
    let id = Math.random();
    let novoPedido = new Pedido(
      id,
      cliente,
      telefone,
      dataPedido,
      observacoes,
      preco
    );
    adicionarPedido(novoPedido);
    fecharInputModal();
  }

  function formatarData(data) {
    setFormatarPlaceHolder(data);
    setDataPedido(data);
  }

  function voltarInicio() {
    fecharInputModal();
  }

  return (
    <Modal visible={visivel} animationType="slide">
      <View style={styles.telaConteiner}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.inputConteiner}>
            <TextInput
              style={styles.textoInput}
              placeholder="Cliente"
              placeholderTextColor="black"
              onChangeText={setNomeCliente}
            />
            <TextInput
              style={styles.textoInput}
              placeholder="Telefone"
              keyboardType="numeric"
              placeholderTextColor="black"
              onChangeText={setTelefone}
            />
            <TextInput
              style={styles.textoInput}
              placeholder="Preço"
              keyboardType="numeric"
              placeholderTextColor="black"
              onChangeText={setPreco}
            />
            <TextInput
              style={[styles.textoInput, styles.observacoes]}
              placeholder="Observações"
              onChangeText={setObservacoes}
              placeholderTextColor="black"
              multiline
              numberOfLines={4}
            />
            <View style={styles.componenteDataExterno}>
              <Text style={styles.tituloData}>Data do Pedido:</Text>
              <View style={styles.componenteDataMeio}>
                <TextInput
                  editable={false}
                  placeholder={formatarPlaceHolder}
                  placeholderTextColor="black"
                  style={styles.componenteDataInterno}
                />
                <DataModal formatarData={formatarData} />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.botoesInferiores}>
          <TouchableOpacity style={styles.botaoCancelar} onPress={voltarInicio}>
            <Ionicons name="close" size={24} color="white" />
            <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoSalvar} onPress={confirmarDados}>
            <Text style={styles.textoBotaoSalvar}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  telaConteiner: {
    flex: 1,
    backgroundColor: "#fff", 
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    flexGrow: 1,
  },
  inputConteiner: {
    marginVertical: 10,
  },
  textoInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
    paddingLeft: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: "#333", 
    backgroundColor: "#f0f0f0", 
    borderRadius: 5,
  },
  observacoes: {
    textAlignVertical: "top",
  },
  componenteDataExterno: {
    marginVertical: 20,
  },
  componenteDataMeio: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  componenteDataInterno: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  botoesInferiores: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  botaoCancelar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#e74c3c", 
    borderRadius: 5,
  },
  textoBotaoCancelar: {
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
  },
  botaoSalvar: {
    backgroundColor: Cores.primary100,
    padding: 10,
    borderRadius: 5,
  },
  textoBotaoSalvar: {
    color: "white",
    fontWeight: "bold",
  },
  tituloData: {
    color: "#333",
    fontSize: 16,
    marginBottom: 10,
  },
});

export default InputDados;
