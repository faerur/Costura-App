import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PedidoContext = createContext();

export function usePedidos() {
  return useContext(PedidoContext);
}

export function PedidoProvider({ children }) {
  const [pedidos, setPedidos] = useState([]);
  useEffect(() => {
    async function carregarPedidos() {
      try {
        const pedidosSalvos = await AsyncStorage.getItem("pedidos");
        if (pedidosSalvos !== null) {
          setPedidos(JSON.parse(pedidosSalvos));
        }
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
      }
    }
    carregarPedidos();
  }, []);

  useEffect(() => {
    async function salvarPedidos() {
      try {
        await AsyncStorage.setItem("pedidos", JSON.stringify(pedidos));
      } catch (error) {
        console.error("Erro ao salvar pedidos:", error);
      }
    }
    salvarPedidos();
  }, [pedidos]);

  async function moverParaHistorico(pedidoFinalizado) {
    try {
      const pedidosFinalizados = await AsyncStorage.getItem(
        "pedidosFinalizados"
      );
      const pedidosFinalizadosAtualizados = pedidosFinalizados
        ? [...JSON.parse(pedidosFinalizados), pedidoFinalizado]
        : [pedidoFinalizado];
      await AsyncStorage.setItem(
        "pedidosFinalizados",
        JSON.stringify(pedidosFinalizadosAtualizados)
      );
    } catch (error) {
      console.error("Erro ao mover para histórico:", error);
    }
  }

  function adicionarPedido(novoPedido) {
    setPedidos((prevPedidos) => [...prevPedidos, novoPedido]);
  }

  function removerPedido(id) {
    setPedidos((prevPedidos) => {
      const novosPedidos = prevPedidos.filter((pedido) => pedido.id !== id);
      AsyncStorage.setItem("pedidos", JSON.stringify(novosPedidos));
      return novosPedidos;
    });
  }

  function alternarEstadoPedido(id) {
    setPedidos((prevPedidos) => {
      const pedidoAtualizado = prevPedidos.map((pedido) =>
        pedido.id === id
          ? { ...pedido, finalizado: !pedido.finalizado }
          : pedido
      );

      const pedidoFinalizado = pedidoAtualizado.find(
        (pedido) => pedido.id === id
      );

      if (pedidoFinalizado && pedidoFinalizado.finalizado) {
        moverParaHistorico({ ...pedidoFinalizado, finalizado: true });
      }

      AsyncStorage.setItem("pedidos", JSON.stringify(pedidoAtualizado)); 
      return pedidoAtualizado;
    });
  }

  function editarPedido(id, dadosAtualizados) {
    setPedidos((prevPedidos) => {
      const pedidosAtualizados = prevPedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, ...dadosAtualizados } : pedido
      );
      AsyncStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));
      return pedidosAtualizados;
    });
  }

  return (
    <PedidoContext.Provider
      value={{
        pedidos,
        adicionarPedido,
        removerPedido,
        alternarEstadoPedido,
        editarPedido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}
