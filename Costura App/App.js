import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PedidoProvider } from "./salvarDados/Persistencia";
import InputDados from "./componentes/InputDados";
import Cores from "./constantes/Cores";
import TelaInicial from "./screens/TelaInicial";
import TelaPedidos from "./screens/TelaPedidos";
import TelaVendas from "./screens/TelaVendas";
import TelaHistorico from "./screens/TelaHistorico";
import InformacoesInternasFicha from "./componentes/InformacoesInternasFicha";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PedidoProvider>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Cores.primary500 },
            headerTintColor: Cores.gray700,
            contentStyle: { backgroundColor: Cores.gray700 },
          }}
        >
          <Stack.Screen
            name="TelaInicial"
            component={TelaInicial}
            options={{
              headerShown: true,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="TelaPedidos"
            component={TelaPedidos}
            options={{
              headerShown: true,
              title: "Pedidos",
            }}
          />

          <Stack.Screen
            name="InformacoesInternasFicha"
            component={InformacoesInternasFicha}
            options={{
              headerShown: false,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen name="TelaVendas" component={TelaVendas} />
        </Stack.Navigator>
      </PedidoProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  telaMenu: {
    flex: 1,
  },
  imagemBackground: {
    opacity: 0.15,
  },
});
