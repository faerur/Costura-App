import { View, StyleSheet, FlatList, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

import FichaItem from "../componentes/FichaItem";
import { usePedidos } from "../salvarDados/Persistencia";
import Cores from "../constantes/Cores";
import IconesTelaMenu from "../componentes/Icones/IconesTelaMenu";

function TelaInicial() {
  const navigation = useNavigation();
  const { pedidos, alternarEstadoPedido, removerPedido } = usePedidos();
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth() + 1;
  const anoAtual = dataAtual.getFullYear();
  const mesAnterior = mesAtual === 1 ? 12 : mesAtual - 1;
  const anoAnterior = mesAtual === 1 ? anoAtual - 1 : anoAtual;

  function lerItemLista({ item }) {
    return (
      <FichaItem
        pedido={item}
        funcaoAlternar={() => alternarEstadoPedido(item.id)}
        funcaoRemover={() => removerPedido(item.id)}
      />
    );
  }
  function mudarTelaPedidos() {
    navigation.navigate("TelaPedidos");
  }
  function mudarTelaVendas() {
    navigation.navigate("TelaVendas");
  }

  function contarPedidosMesAnterior(pedidos) {
    const dataAtual = new Date();
    const mesAnterior = dataAtual.getMonth() === 0 ? 12 : dataAtual.getMonth();
    const anoAnterior =
      dataAtual.getMonth() === 0
        ? dataAtual.getFullYear() - 1
        : dataAtual.getFullYear();

    return pedidos.filter((pedido) => {
      const [dia, mes, ano] = pedido.data.split("/").map(Number);
      return (
        mes === mesAnterior && ano === anoAnterior && pedido.finalizado === true
      );
    }).length;
  }

  const pedidosEmAndamento = pedidos.filter((pedido) => !pedido.finalizado);
  const pedidosDoMesAnterior = contarPedidosMesAnterior(pedidos);
  return (
    <>
      <StatusBar color="black" />
      <View style={styles.abaResumo}>
        <View style={styles.conteinerResumo}>
          <Text
            style={[styles.textoMenu, { fontSize: 40 }, { marginLeft: 10 }]}
          >
            {pedidosEmAndamento.length.toString()}
          </Text>
          <Text style={[styles.textoMenu, { fontSize: 16 }, { marginTop: 30 }]}>
            pedido(s) em aberto
          </Text>
        </View>
        <View style={[styles.conteinerResumo]}>
          <Text style={[styles.textoMenu, { fontSize: 50 }]}>
            {pedidosDoMesAnterior}
          </Text>
          <Text style={[styles.textoMenu, { marginTop: 30 }]}>
            pedidos finalizados no último mês
          </Text>
        </View>
      </View>
      <View style={styles.colunaOpcoes}>
        <IconesTelaMenu
          nomeIcone="clipboard-outline"
          tamanho={24}
          cor="black"
          texto="Pedidos"
          apertarBotao={mudarTelaPedidos}
        />
        <IconesTelaMenu
          nomeIcone="card-outline"
          tamanho={24}
          cor="black"
          texto="Vendas"
          apertarBotao={mudarTelaVendas}
        />
      </View>

      <View style={styles.textoView}>
        <Text style={[styles.textoMenu, { fontSize: 20 }]}>
          Pedidos em Aberto
        </Text>
      </View>
      <FlatList
        data={pedidosEmAndamento}
        keyExtractor={(item) => item.id}
        renderItem={lerItemLista}
      />
    </>
  );
}
export default TelaInicial;

const styles = StyleSheet.create({
  abaResumo: {
    margin: 17,
    height: 200,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: Cores.primary100,
  },
  conteinerResumo: {
    flexDirection: "row",
    marginTop: 30,
  },
  textoResumo: {
    color: "white",
    fontWeight: "bold",
  },
  colunaOpcoes: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },

  textoMenu: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 16,
  },
  textoView: {
    marginTop: 30,
    marginLeft: 10,
  },
});
