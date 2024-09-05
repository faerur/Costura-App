import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { usePedidos } from "../salvarDados/Persistencia";

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function TelaVendas() {
  const { pedidos } = usePedidos();
  const [totalMesAtual, setTotalMesAtual] = useState(0);
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth());
  const [maxMesAnterior, setMaxMesAnterior] = useState(
    new Date().getMonth() - 5
  );

  useEffect(() => {
    calcularTotal(mesSelecionado);
  }, [pedidos, mesSelecionado]);

  function calcularTotal(mes) {
    const anoAtual = new Date().getFullYear();
    const total = pedidos.reduce((acc, pedido) => {
      const [dia, mesPedido, anoPedido] = pedido.data.split("/").map(Number);
      const preco = parseFloat(pedido.preco) || 0;
      if (anoPedido === anoAtual && mesPedido - 1 === mes) {
        return acc + preco;
      }
      return acc;
    }, 0);
    setTotalMesAtual(total);
  }
  function handleChangeMonth(offset) {
    const novoMes = (mesSelecionado + offset + 12) % 12;
    if (novoMes >= maxMesAnterior) {
      setMesSelecionado(novoMes);
    }
  }

  const mesAtual = new Date().getMonth();
  const podeIrProximoMes = mesSelecionado !== mesAtual;
  const podeIrMesAnterior = mesSelecionado > maxMesAnterior;

  return (
    <View style={styles.container}>
      <View style={styles.plaqueOuter}>
        <Text style={styles.textoInformativo}>
          Total arrecadado no mês de {meses[mesSelecionado]}/
          {new Date().getFullYear()}
        </Text>
        <View style={styles.plaqueInner}>
          <Text style={styles.valorTotal}>R$ {totalMesAtual.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.navigationContainer}>
        {podeIrMesAnterior && (
          <TouchableOpacity
            onPress={() => handleChangeMonth(-1)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Mês Anterior</Text>
          </TouchableOpacity>
        )}
        {podeIrProximoMes && (
          <TouchableOpacity
            onPress={() => handleChangeMonth(1)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Próximo Mês</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  plaqueOuter: {
    width: "100%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  plaqueInner: {
    width: "80%",
    height: "40%",
    backgroundColor: "#007bff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 10,
  },
  textoInformativo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  valorTotal: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default TelaVendas;
